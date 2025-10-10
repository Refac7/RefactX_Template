import { visit } from 'unist-util-visit'
import path from 'node:path'
import { existsSync } from 'node:fs'
import sharp from 'sharp'
import { getPixels } from 'ndarray-pixels'
import quantize from '@lokesh.dhakar/quantize'

/**
 * Convert RGB color to OKLab color space
 * https://github.com/Kalabasa/leanrada.com/blob/7b6739c7c30c66c771fcbc9e1dc8942e628c5024/main/scripts/update/lib/color/convert.mjs
 */

/**
 * RGB到Oklab颜色空间转换
 */
function rgbToOkLab(rgb) {
  const r = gammaInv(rgb.r / 255)
  const g = gammaInv(rgb.g / 255)
  const b = gammaInv(rgb.b / 255)

  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b)
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b)
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b)

  return {
    L: l * +0.2104542553 + m * +0.793617785 + s * -0.0040720468,
    a: l * +1.9779984951 + m * -2.428592205 + s * +0.4505937099,
    b: l * +0.0259040371 + m * +0.7827717662 + s * -0.808675766,
  }
}

function gammaInv(x) {
  return x >= 0.04045 ? Math.pow((x + 0.055) / 1.055, 2.4) : x / 12.92
}

/**
 * Extract dominant colors from images
 * https://github.com/Kalabasa/leanrada.com/blob/7b6739c7c30c66c771fcbc9e1dc8942e628c5024/main/scripts/update/lib/color/thief.mjs
 */
/**
 * 创建像素数组用于颜色量化
 */
function createPixelArray(pixels, pixelCount, quality) {
  const pixelArray = []

  for (let i = 0, offset, r, g, b; i < pixelCount; i += quality) {
    offset = i * 4
    r = pixels[offset]
    g = pixels[offset + 1]
    b = pixels[offset + 2]

    pixelArray.push([r, g, b])
  }

  return pixelArray
}

/**
 * 验证调色板选项
 */
function validateOptions(options) {
  let { colorCount, quality } = options

  if (typeof colorCount === 'undefined' || !Number.isInteger(colorCount)) {
    colorCount = 10
  } else if (colorCount === 1) {
    throw new Error('colorCount应该在2-20之间')
  } else {
    colorCount = Math.max(colorCount, 2)
    colorCount = Math.min(colorCount, 20)
  }

  if (typeof quality === 'undefined' || !Number.isInteger(quality) || quality < 1) {
    quality = 10
  }

  return { colorCount, quality }
}

/**
 * 加载图像数据
 */
async function loadImg(img) {
  return new Promise((resolve, reject) => {
    sharp(img)
      .toBuffer()
      .then((buffer) =>
        sharp(buffer)
          .metadata()
          .then((metadata) => ({ buffer, format: metadata.format }))
      )
      .then(({ buffer, format }) => getPixels(buffer, format))
      .then(resolve)
      .catch(reject)
  })
}

/**
 * 获取调色板
 */
async function getPalette(img, colorCount = 10, quality = 10) {
  const options = validateOptions({ colorCount, quality })

  const imgData = await loadImg(img)
  const pixelCount = imgData.shape[0] * imgData.shape[1]
  const pixelArray = createPixelArray(imgData.data, pixelCount, options.quality)

  const cmap = quantize(pixelArray, options.colorCount)
  const palette = cmap ? cmap.palette() : null

  return palette
}

function remarkLQIP() {
  return async (tree, file) => {
    const imagesToProcess = []

    // 收集所有图像节点
    visit(tree, 'image', (node) => {
      if (node.url && !node.url.match('^([a-z]+:)?//')) {
        imagesToProcess.push(node)
      }
    })

    // 并行处理所有图像
    await Promise.all(
      imagesToProcess.map(async (node) => {
        try {
          await processImageNode(node, file.path)
        } catch (error) {
          console.warn(`LQIP处理失败: ${node.url}`, error.message)
        }
      })
    )
  }
}

/**
 * 处理单个图像节点
 */
async function processImageNode(node, filePath) {
  const imagePath = resolveImagePath(node.url, filePath)

  if (!existsSync(imagePath)) {
    return
  }

  const lqipData = await analyzeImage(imagePath)

  if (!lqipData.opaque) {
    return // 跳过透明图像
  }

  // 编码LQIP数据
  const lqipValue = encodeLQIP(lqipData)

  // 添加data属性用于CSS处理
  node.data = node.data || {}
  node.data.hProperties = node.data.hProperties || {}

  // 设置尺寸属性
  if (lqipData.width && lqipData.height) {
    node.data.hProperties.width = lqipData.width
    node.data.hProperties.height = lqipData.height
  }

  // 设置LQIP样式
  const style = node.data.hProperties.style || ''
  const lqipStyle = `--lqip:${lqipValue}`

  node.data.hProperties.style = style ? `${style};${lqipStyle}` : lqipStyle
}

/**
 * 分析图像并提取LQIP数据
 */
async function analyzeImage(imagePath) {
  const theSharp = sharp(imagePath)
  const [metadata, stats] = await Promise.all([theSharp.metadata(), theSharp.stats()])

  const { width, height } = getNormalSize(metadata)

  if (!stats.isOpaque) {
    return { width, height, opaque: false }
  }

  // 并行处理：生成3x2预览图 & 提取主色调
  const [previewBuffer, dominantColor] = await Promise.all([
    theSharp.resize(3, 2, { fit: 'fill' }).sharpen({ sigma: 1 }).removeAlpha().toFormat('raw', { bitdepth: 8 }).toBuffer(),
    getPalette(imagePath, 4, 10).then((palette) => palette[0]),
  ])

  // 转换主色调到Oklab空间
  const baseColor = rgbToOkLab({
    r: dominantColor[0],
    g: dominantColor[1],
    b: dominantColor[2],
  })

  // 量化基础颜色
  const { ll, aaa, bbb } = findOklabBits(baseColor.L, baseColor.a, baseColor.b)
  const { L: baseL } = bitsToLab(ll, aaa, bbb)

  // 提取6个网格单元的亮度值
  const values = Array.from({ length: 6 }, (_, i) => {
    const offset = i * 3
    const r = previewBuffer.readUint8(offset)
    const g = previewBuffer.readUint8(offset + 1)
    const b = previewBuffer.readUint8(offset + 2)
    const { L } = rgbToOkLab({ r, g, b })
    return clamp(0.5 + L - baseL, 0, 1)
  })

  return {
    width,
    height,
    opaque: true,
    ll,
    aaa,
    bbb,
    values,
  }
}

/**
 * 编码LQIP数据为单个整数
 * 使用20位编码：6个亮度分量(12位) + 基础颜色(8位)
 */
function encodeLQIP({ ll, aaa, bbb, values }) {
  const ca = Math.round(values[0] * 0b11)
  const cb = Math.round(values[1] * 0b11)
  const cc = Math.round(values[2] * 0b11)
  const cd = Math.round(values[3] * 0b11)
  const ce = Math.round(values[4] * 0b11)
  const cf = Math.round(values[5] * 0b11)

  const lqip =
    -(2 ** 19) +
    ((ca & 0b11) << 18) +
    ((cb & 0b11) << 16) +
    ((cc & 0b11) << 14) +
    ((cd & 0b11) << 12) +
    ((ce & 0b11) << 10) +
    ((cf & 0b11) << 8) +
    ((ll & 0b11) << 6) +
    ((aaa & 0b111) << 3) +
    (bbb & 0b111)

  // CSS整数范围检查
  if (lqip < -999_999 || lqip > 999_999) {
    throw new Error(`LQIP值超出CSS范围: ${lqip}`)
  }

  return lqip
}

/**
 * 寻找最佳的Oklab位配置
 */
function findOklabBits(targetL, targetA, targetB) {
  const targetChroma = Math.hypot(targetA, targetB)
  const scaledTargetA = scaleComponentForDiff(targetA, targetChroma)
  const scaledTargetB = scaleComponentForDiff(targetB, targetChroma)

  let bestBits = [0, 0, 0]
  let bestDifference = Infinity

  for (let lli = 0; lli <= 0b11; lli++) {
    for (let aaai = 0; aaai <= 0b111; aaai++) {
      for (let bbbi = 0; bbbi <= 0b111; bbbi++) {
        const { L, a, b } = bitsToLab(lli, aaai, bbbi)
        const chroma = Math.hypot(a, b)
        const scaledA = scaleComponentForDiff(a, chroma)
        const scaledB = scaleComponentForDiff(b, chroma)

        const difference = Math.hypot(L - targetL, scaledA - scaledTargetA, scaledB - scaledTargetB)

        if (difference < bestDifference) {
          bestDifference = difference
          bestBits = [lli, aaai, bbbi]
        }
      }
    }
  }

  return { ll: bestBits[0], aaa: bestBits[1], bbb: bestBits[2] }
}

/**
 * 将位数转换回Lab颜色
 */
function bitsToLab(ll, aaa, bbb) {
  return {
    L: (ll / 0b11) * 0.6 + 0.2,
    a: (aaa / 0b1000) * 0.7 - 0.35,
    b: ((bbb + 1) / 0b1000) * 0.7 - 0.35,
  }
}

/**
 * 缩放色度分量以避免欧几里得距离偏向中心
 */
function scaleComponentForDiff(component, chroma) {
  return component / (1e-6 + Math.pow(chroma, 0.5))
}

/**
 * 获取正确的图像尺寸（考虑EXIF方向）
 */
function getNormalSize({ width, height, orientation }) {
  return (orientation || 0) >= 5 ? { width: height, height: width } : { width, height }
}

/**
 * 解析图像路径
 */
function resolveImagePath(imageUrl, filePath) {
  if (path.isAbsolute(imageUrl)) {
    return imageUrl
  }

  // 处理 Astro 的 ~ 路径别名
  if (imageUrl.startsWith('~/')) {
    // 从 content/posts 目录向上找到 src 目录
    const contentDir = path.dirname(filePath) // .../src/content/posts
    const srcDir = path.dirname(path.dirname(contentDir)) // .../src
    return path.resolve(srcDir, imageUrl.slice(2)) // 去掉 ~/
  }

  const fileDir = path.dirname(filePath || '')
  return path.resolve(fileDir, imageUrl)
}

/**
 * 数值约束函数
 */
function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export default remarkLQIP
