---
title: '文章配置指南'
description: 'RefactX主题中文章配置的完整指南'
pubDate: 1145-05-01
tags: ['基本教程','笔记']
heroImage: 'MD-Configuration.webp'
ogImage: 'MD-Configuration.webp'
---

本文档提供RefactX主题中文章配置的完整指南，包括Front Matter设置和图片显示选项。

## 创建新文章

新建Markdown文件的步骤：

1. 进入`src/content/posts`目录
2. 创建以`.md`为后缀的新文件

## Front Matter配置

通过Astro内容集合管理Front Matter，确保所有文章结构一致：

```md
---
title: '文章标题'
description: '文章简短描述'
pubDate: 1145-05-01
updatedDate: 1145-05-01
author: 'Dnzzk2'
recommend: false
heroImage: '图片文件名.png'
ogImage: 'OG图片文件名.png'
heroImageLayout: 'left'
heroImageAspectRatio: '16/9'
tags: ['标签1', '标签2']
---
```

### 属性说明

| 属性 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| title | 字符串 | 是 | - | 文章主标题，显示在文章页和列表页 |
| description | 字符串 | 是 | - | 文章摘要，用于SEO和社交媒体预览 |
| pubDate | 日期 | 是 | - | 发布日期，格式YYYY-MM-DD |
| updatedDate | 日期 | 否 | - | 最后修改日期 |
| author | 字符串 | 否 | - | 作者名，未指定时使用站点默认作者 |
| recommend | 布尔值 | 否 | false | 设为推荐文章，显示特殊标识 |
| heroImage | 字符串 | 否 | - | 封面图文件名(存放于`public/hero-images/`)或外部URL |
| ogImage | 字符串 | 否 | - | 社交媒体预览图(存放于`public/og-images/`)或外部URL |
| heroImageLayout | 字符串 | 否 | - | 图片位置('left'或'right')，当文章列表类型为'image'时生效 |
| heroImageAspectRatio | 字符串 | 否 | '16/9' | 图片比例，支持'16/9'或'3/4' |
| tags | 字符串数组 | 否 | [] | 文章分类标签 |

## 图片显示配置

当文章列表类型设为`image`时：

- 未指定`heroImage`时，使用`config.ts`中`POSTS_CONFIG`的`defaultHeroImage`
- 未指定`ogImage`时，使用站点默认OG图片

### 显示样式

> [!IMPORTANT] 2025/07/25
> 新增`Jap`样式，可在Front Matter中配置`postType`使用
>
> 本主题不再根据图片存在与否或比例决定元信息显示样式，而是由您自行定义。可在`config.ts`中配置`postType`决定默认样式，在MD文档的front matter中可通过`postType`指定该MD文件的显示样式。

支持三种图片显示样式：

1. 无封面图：
:::image-figure[无图片]
![](~/assets/images/md-configuration/noImage-dark.webp)(class:img-light)

![](~/assets/images/md-configuration/noImage-light.webp)(class:img-dark)
:::

2. 带封面图(默认16/9比例)：
:::image-figure[16/9]
![](~/assets/images/md-configuration/image-16-9-dark.webp)(class:img-light)

![](~/assets/images/md-configuration/image-16-9-light.webp)(class:img-dark)
:::

3. 带封面图(3/4比例)：
:::image-figure[3/4]
![](~/assets/images/md-configuration/image-3-4-dark.webp)(class:img-light)

![](~/assets/images/md-configuration/image-3-4-light.webp)(class:img-dark)
:::

> [!note]
> 比例'3/4'和'16/9'仅作为方向指示而非严格尺寸要求，但使用接近比例的图片可避免变形

## 图片处理工具

内置图片优化工具帮助提升网站性能：

### 图片优化脚本

```bash
pnpm run optimize -- [选项]
```

#### 常用选项

| 选项 | 别名 | 说明 | 默认值 |
|------|------|------|--------|
| --input | -i | 输入文件/目录路径(必填) | - |
| --quality | -q | 压缩质量(0-100) | 80 |
| --width | -w | 最大宽度(0=不调整) | 0 |
| --format | -f | 输出格式(jpg,png,webp等) | 原始格式 |

#### 示例

1. 基本优化：
```bash
pnpm run optimize -- -i public/images
```

2. 转换为WebP格式：
```bash
pnpm run optimize -- -i public/images -f webp
```

### 推荐工具

- [TinyPNG](https://free.tinypng.site/) - PNG/JPEG压缩
- [Squoosh](https://squoosh.app/) - 在线图片优化
- [ImageOptim](https://imageoptim.com/) - 无损压缩工具

## 代码片段

`.vscode/RefactX.code-snippets`提供三种代码片段快速生成Front Matter：

### 基础模板(无图片)

- **触发词**: `postfm`或`postnoimg`
- **用途**: 创建无图片的文章模板

### 16/9图片模板

- **触发词**: `postfm16`或`post169`
- **用途**: 创建带16:9横版图片的模板

### 3/4图片模板

- **触发词**: `postfm34`或`post34`
- **用途**: 创建带3:4竖版图片的模板

> [!tip]
> 根据图片比例选择合适的模板，可大幅提升写作效率
