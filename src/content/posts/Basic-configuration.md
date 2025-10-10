---
title: '基础配置'
description: 'RefactX主题的基本设置指南'
pubDate: 1145-05-03
tags: ['基本教程','笔记']
heroImage: 'Basic-configuration.webp'
ogImage: 'Basic-configuration.webp'
---

欢迎阅读RefactX主题配置指南。所有网站基础设置均通过`src/config.ts`文件管理。本指南将详细介绍每个配置模块，助您高效定制网站。

## 核心站点配置

`SITE`对象包含网站基础信息与元数据设置：

```ts title="src/config.ts"
export const SITE: Site = {
  title: 'RefactX',        // 网站标题
  description: 'RefactX是基于Astro.js与Dnzzk2构建的博客主题',  // 网站描述
  website: 'https://Litos.vercel.app/',  // 网站URL
  base: '/',             // 基础路径（若非根目录部署需修改）
  author: 'Dnzzk2',      // 作者名称
  ogImage: '/og-image.jpg'  // 默认社交媒体分享图片
}
```

配置属性详解：

| 属性 | 描述 | 细节 |
|---|---|---|
| **title** | 网站标题 | 显示在浏览器标签页和搜索结果中，对SEO和品牌识别至关重要 |
| **description** | 网站概述 | 出现在搜索结果和社交媒体分享中，应包含SEO关键词 |
| **website** | 生产环境URL | 用于生成规范链接和确保URL正确解析 |
| **base** | 基础路径 | 根目录部署保持'/'，子目录部署需设置（如'/blog/'） |
| **author** | 作者名称 | 用于元标签和署名信息 |
| **ogImage** | 默认社交媒体预览图 | 在社交平台分享时显示的图片（推荐尺寸：1200×630像素） |

## 导航结构

RefactX采用双导航系统增强用户体验。导航分为主导航（`HEADER_LINKS`）和页脚导航（`FOOTER_LINKS`）两部分。

### 主导航

主导航包含最重要的页面链接：

```ts title="src/config.ts"
export const HEADER_LINKS: Link[] = [
  {
    name: '文章',    // 导航显示文本
    url: '/posts',    // 路由路径
  },
  {
    name: '项目',
    url: '/projects',
  },
]
```

### 页脚导航

页脚导航提供完整站点地图：

```ts title="src/config.ts"
export const FOOTER_LINKS: Link[] = [
  {
    name: '首页',
    url: '/',
  },
  {
    name: '文章',
    url: '/posts',
  },
  {
    name: '项目',
    url: '/projects',
  },
  {
    name: '标签',
    url: '/tags',
  },
]
```

### 导航配置指南

导航链接配置详情：

| 属性 | 描述 | 用法 |
|------|------|------|
| **name** | 显示文本 | 导航菜单中显示的文本 |
| **url** | 目标路径 | 必须以'/'开头的页面路径 |

>[!tip]
>
> 1. 主导航：聚焦核心内容板块
> 2. 页脚导航：包含次级页面和站点资源
> 3. 路径设置：所有路径相对于站点根目录
> 4. 链接一致性：保持主导航与页脚导航的链接一致性

## 社交媒体集成

RefactX内置社交媒体集成功能，可在指定区域展示社交账号：

:::image-figure[社交链接]
![](~/assets/images/base-configuration/social-link-dark.jpg)(class:img-light)

![](~/assets/images/base-configuration/social-link-light.jpg)(class:img-dark)
:::

在`src/config.ts`中配置社交链接：

```ts title="src/config.ts"
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'github',    // 平台标识
    url: 'https://github.com/yourname',    // 个人主页URL
    icon: 'icon-[ri--github-fill]',    // Iconify图标类名
    count: 9    // 可选：粉丝数
  },
  {
    name: 'twitter',
    url: 'https://x.com/yourname',
    icon: 'icon-[ri--twitter-x-fill]',
  },
  {
    name: 'bilibili',
    url: 'https://space.bilibili.com/yourSpaceId',
    icon: 'icon-[ri--bilibili-fill]',
  },
]
```

社交链接对象支持以下属性：

| 属性 | 描述 | 细节 |
|------|------|------|
| **name** | 平台标识 | 用于内部引用和无障碍访问 |
| **url** | 个人主页URL | 平台个人主页的直接链接 |
| **icon** | 图标类名 | 来自[Iconify](https://icon-sets.iconify.design/)的图标类，可通过Tailwind CSS自定义 |
| **count** (可选) | 粉丝数 | 可选，显示粉丝数；启用GitHub集成时可自动更新GitHub粉丝数 |

> [!TIP]
>
> 1. 从[Iconify](https://icon-sets.iconify.design/)选择社交图标
> 2. 保持所有社交链接的图标风格一致
> 3. 启用GitHub集成实现粉丝数自动更新
> 4. 测试浅色/深色主题下的社交链接可见性

## GitHub配置

:::image-figure[聚光灯]
![](~/assets/images/base-configuration/spotlight-dark.jpg)(class:img-light)

![](~/assets/images/base-configuration/spotlight-light.jpg)(class:img-dark)
:::

访问首页时可见GitHub数据展示区（聚光灯），通过以下配置启用该功能。

### 配置详情

在`src/config.ts`中配置GitHub相关功能：

```ts title="src/config.ts"
export const GITHUB_CONFIG: GithubConfig = {
  ENABLED: true,
  GITHUB_USERNAME: 'Dnzzk2',
  TOOLTIP_ENABLED: true,
}
```

配置选项说明：

| 属性 | 描述 | 细节 |
|---|---|---|
| **ENABLED** | 启用GitHub功能 | 类型：布尔值，默认：true。启用后显示聚光灯并自动更新社交链接中的GitHub粉丝数 |
| **GITHUB_USERNAME** | GitHub用户名 | 类型：字符串，用于获取数据的用户名 |
| **TOOLTIP_ENABLED** | 是否启用工具提示 | 类型：布尔值，默认：true。鼠标悬停时显示具体贡献值 |

> [!TIP]
> 此功能已从构建请求改为客户端请求，使用:link[github-contributions-api]{id=https://github.com/grubersjoe/github-contributions-api}提供的API。特别感谢他们的开源贡献。

## 技能配置

:::image-figure[技能]
![](~/assets/images/base-configuration/skills-dark.png)(class:img-light)

![](~/assets/images/base-configuration/skills-light.png)(class:img-dark)
:::

技能模块通过`SKILLSSHOWCASE_CONFIG`配置：

```ts title="src/config.ts"

export const SKILLSSHOWCASE_CONFIG: SkillsShowcaseConfig = {
  SKILLS_ENABLED: true,
  SKILLS_DATA: [
    {
      direction: 'left',
      skills: [
        {
          name: 'JavaScript',
          icon: 'icon-[mdi--language-javascript]',
        },
        {
          name: 'CSS',
          icon: 'icon-[mdi--language-css3]',
        },
        {
          name: 'HTML',
          icon: 'icon-[mdi--language-html5]',
        },
        {
          name: 'TypeScript',
          icon: 'icon-[mdi--language-typescript]',
        },
      ],
    },
    {
      direction: 'right',
      skills: [
        {
          name: 'Astro',
          icon: 'icon-[lineicons--astro]',
        },
        {
          name: 'Node.js',
          icon: 'icon-[mdi--nodejs]',
        },
        {
          name: 'React',
          icon: 'icon-[mdi--react]',
        },
        {
          name: 'Next.js',
          icon: 'icon-[devicon--nextjs]',
        },
        {
          name: 'Tailwind CSS',
          icon: 'icon-[mdi--tailwind]',
        },
        {
          name: 'Iconify',
          icon: 'icon-[line-md--iconify2-static]',
        },
      ],
    },
  ],
}
```

`SKILLSSHOWCASE_CONFIG`配置对象属性详解：

| 属性 | 描述 | 细节 |
|---|---|---|
| **SKILLS_ENABLED** | 是否启用技能展示功能 | 设为`true`启用，`false`禁用 |
| **SKILLS_DATA** | 技能展示数据数组 | 包含多个技能组，每组可设置不同方向和技能列表 |
| &nbsp;&nbsp;direction | 技能组展示方向 | 可选值：`left`或`right`，决定技能组在页面上的动画方向 |
| &nbsp;&nbsp;skills | 技能列表 | 该方向组下的所有技能项 |
| &nbsp;&nbsp;&nbsp;&nbsp;name | 技能名称 | 显示在页面上的技能名称 |
| &nbsp;&nbsp;&nbsp;&nbsp;icon | 技能图标 | Iconify格式图标，可从[Iconify图标集](https://icon-sets.iconify.design/)获取 |

技能展示模块允许您在个人主页展示技术栈。通过`direction`属性可创建交替方向的技能组，增强页面动态视觉效果。每个技能项包含名称和图标，图标使用Iconify集成，提供数千种可选图标。

## 文章配置

RefactX通过`src/config.ts`中的`POSTS_CONFIG`对象提供全面的文章配置选项，包括文章显示设置、分页和布局选项。

```ts title="src/config.ts"
export const POSTS_CONFIG: PostConfig = {
  title: '文章',
  description: 'Dnzzk2的文章',
  introduce: '这里将分享本主题的使用说明，助您快速上手。',
  author: 'Dnzzk2',
  homePageConfig: {
    size: 5,
    type: 'compact',
  },
  postPageConfig: {
    size: 10,
    type: 'image',
  },
  tagsPageConfig: {
    size: 10,
    type: 'time-line',
  },
  defaultHeroImage: '/og-image.jpg',
  defaultHeroImageAspectRatio: '16/9', // '16/9' || '3/4'
  postType: 'horizontal',
  imageDarkenInDark: true,
  readMoreText: '阅读更多',
  prevPageText: '上一页',
  nextPageText: '下一页',
  tocText: '目录',
  backToPostsText: '返回文章列表',
  nextPostText: '下一篇',
  prevPostText: '上一篇',
}
```

`POSTS_CONFIG`配置对象属性详解：

| 属性 | 描述 | 细节 |
|---|---|---|
| **title** | 文章页面标题 | 显示在浏览器标签页和搜索结果中 |
| **description** | 文章页面描述 | 用于SEO优化 |
| **introduce** | 文章页面介绍 | 标题下方的介绍文字 |
| **author** | 文章作者 | 用于元标签和署名信息 |
| **homePageConfig** | 首页文章显示设置 | 配置首页文章显示方式 |
| &nbsp;&nbsp;size | 每页文章数量 | 显示文章的上限数量 |
| &nbsp;&nbsp;type | 文章显示类型 | 文章列表中的卡片类型：`compact`、`image`、`time-line` |
| &nbsp;&nbsp;heroImageLayout | 图片位置 | 卡片中图片的位置：`left`、`right`。当类型为image时可用。默认为左右交替，可通过此属性强制修改，但优先级低于MD文件中的**frontmatter** |
| **postPageConfig** | 单篇文章显示设置 | 配置单篇文章的显示方式 |
| &nbsp;&nbsp;size | 每页文章数量 | 分页时的每页文章数 |
| &nbsp;&nbsp;type | 文章显示类型 | 文章列表中的卡片类型：`compact`、`image`、`time-line` |
| **tagsPageConfig** | 标签页面显示设置 | 配置按标签显示文章的方式 |
| &nbsp;&nbsp;size | 每页文章数量 | 分页时的每页文章数 |
| &nbsp;&nbsp;type | 文章显示类型 | 文章列表中的卡片类型：`compact`、`image`、`time-line` |
| **defaultHeroImage** | 默认封面图 | 文章列表在image模式下显示的默认封面图 |
| **defaultHeroImageAspectRatio** | 默认封面图宽高比 | 默认封面图的宽高比例 |
| **postType** | 文章顶部元数据的默认样式 | 自定义文章顶部元信息的显示样式 |
| **imageDarkenInDark** | 深色模式下加深封面图 | 是否在深色模式下加深封面图 |
| **readMoreText** | "阅读更多"文本 | 图片卡片下方"阅读更多"的文本内容 |
| **prevPageText** | "上一页"文本 | 上一页按钮显示的文本 |
| **nextPageText** | "下一页"文本 | 下一页按钮显示的文本 |
| **tocText** | "目录"文本 | 目录中显示的文本 |
| **backToPostsText** | "返回文章列表"文本 | 返回文章列表按钮显示的文本 |
| **nextPostText** | "下一篇"文本 | 下一篇按钮显示的文本 |
| **prevPostText** | "上一篇"文本 | 上一篇按钮显示的文本 |

本主题有三处显示文章列表的位置，因此使用三个属性分别配置：`homePageConfig`、`postPageConfig`和`tagsPageConfig`，分别对应首页、文章页和详细标签页。

为保持页面风格丰富性，为type属性设置了三个值，对应三种文章卡片：`compact`、`image`、`time-line`。

:::image-figure[紧凑型]
![](~/assets/images/base-configuration/compact-dark.jpg)(class:img-light,style:width:80%)

![](~/assets/images/base-configuration/compact-light.jpg)(class:img-dark,style:width:80%)
:::

:::image-figure[图片型]
![](~/assets/images/base-configuration/image-dark.jpg)(class:img-light,style:width:80%)

![](~/assets/images/base-configuration/image-light.jpg)(class:img-dark,style:width:80%)
:::

:::image-figure[时间线型]
![](~/assets/images/base-configuration/time-line-dark.jpg)(class:img-light,style:width:80%)

![](~/assets/images/base-configuration/time-line-light.jpg)(class:img-dark,style:width:80%)
:::

您可以为三个页面配置适合的样式，也可通过在`src/components/posts/card`中创建自定义卡片文件，并在同目录下的`List.astro`中导入配置，实现个性化卡片样式。

## 标签配置

标签配置仅提供两个基础属性：

```ts title="src/config.ts"
export const TAGS_CONFIG: TagsConfig = {
  title: '标签',
  description: 'Dnzzk2的标签',
  introduce: '所有文章标签都在这里，您可以点击筛选。',
}
```

| 属性 | 描述 | 细节 |
|---|---|---|
| **title** | 标签页面标题 | 显示在浏览器标签页和搜索结果中 |
| **description** | 标签页面描述 | 用于SEO优化 |
| **introduce** | 标签页面介绍 | 标题下方的介绍文字 |

## 项目配置

项目配置提供两个基础设置：

```ts title="src/config.ts"
export const PROJECTS_CONFIG: ProjectsConfig = {
  title: '项目',
  description: 'Dnzzk2的项目',
  introduce: '我的项目示例。',
}
```

此外还提供项目列表配置：

```ts title="src/config.ts"
export const ProjectList: Project[] = [
  {
    name: 'RefactX',
    description: '基于Astro.js与Dnzzk2构建的博客主题',
    githubUrl: 'https://github.com/Refac7/RefactX_Template',
    website: 'https://RefactX.vercel.app/',
    type: 'icon',
    icon: 'icon-[ri--github-fill]',
    star: 1,
  },
  {
    name: 'RefactX',
    description: '基于Astro.js与Dnzzk2构建的博客主题',
    githubUrl: 'https://github.com/Refac7/RefactX_Template',
    website: 'https://RefactX.vercel.app/',
    type: 'image',
    icon: '/projects/logo.png',
    star: 1,
  },
]
```

| 属性 | 描述 | 细节 |
|---|---|---|
| **name** | 项目名称 | 项目名称 |
| **description** | 项目描述 | 项目描述 |
| **introduce** | 项目页面介绍 | 标题下方的介绍文字 |
| **githubUrl** (可选) | 项目GitHub地址 | 项目GitHub链接 |
| **website** (可选)| 项目网站地址 | 项目URL链接 |
| **type** | 项目类型 | 用于显示项目类型：`icon`、`image` |
| **icon** | 项目图标 | 当类型为icon时使用iconify显示图标；为image时用作图片地址。图片需放在`public/projects`目录 |
| **imageClass** (可选) | 项目图片类 | 当类型为image时用于修改图片样式 |
| **star** (可选) | 项目星标数 | GitHub星标数 |
| **fork** (可选) | 项目复刻数 | GitHub复刻数 |
