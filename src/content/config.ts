import { defineCollection, z } from 'astro:content'

import { POSTS_CONFIG } from '~/config'
import type { HeroImageAspectRatio, HeroImageLayout, PostType } from '~/types'

const posts = defineCollection({
  type: 'content',
  schema: z.object({
    // 文章标题（必需）
    title: z.string(),
    // 文章描述（可选）
    description: z.string(),
    // 发布日期（必需）
    pubDate: z.date(),
    // 更新日期（可选）
    updatedDate: z.date().optional(),
    // 是否推荐文章，默认为 false
    recommend: z.boolean().default(false),
    // 文章作者，默认使用全局配置中的作者
    author: z.string().default(POSTS_CONFIG.author),
    // 文章封面图（可选）
    heroImage: z
      .string()
      .transform((val) => {
        if (!val) return undefined
        return val.startsWith('http') ? val : `/hero-images/${val}`
      })
      .optional(),
    // Open Graph 图片（可选）
    ogImage: z
      .string()
      .transform((val) => {
        if (!val) return undefined
        return val.startsWith('http') ? val : `/og-images/${val}`
      })
      .optional(),
    // 封面图布局方式（可选）
    heroImageLayout: z.custom<HeroImageLayout>().optional(),
    // 封面图宽高比，默认使用全局配置
    heroImageAspectRatio: z.custom<HeroImageAspectRatio>().default(POSTS_CONFIG.defaultHeroImageAspectRatio),
    // 文章标签列表
    tags: z.array(z.string()),
    // 文章类型
    postType: z.custom<PostType>().optional(),
  }),
})

// 导出内容集合配置
export const collections = { posts }
