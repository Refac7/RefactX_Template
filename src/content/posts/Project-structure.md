---
title: '项目结构说明'
description: 'RefactX主题项目的目录结构解析'
pubDate: 1145-05-04
tags: ['基本教程','笔记']
heroImage: 'Project-structure.webp'
ogImage: 'Project-structure.webp'
---

本文档将帮助您快速理解[RefactX主题](https://github.com/Refac7/RefactX_Template)的项目结构。

## 项目目录结构

以下是项目的完整目录结构及核心文件说明：

```tex
RefactX
├── .git                                  # Git版本控制目录
├── .vscode                               # VS Code工作区配置
│   ├── extensions.json                   # 推荐安装的VSCode扩展
│   ├── launch.json                       # 调试配置
│   ├── RefactX.code-snippets.json          # 自定义代码片段
│   └── settings.json                     # 编辑器设置
├── plugins                               # Markdown扩展插件
├── public                                # 静态资源目录
│   ├── fonts                             # 网页字体
│   ├── hero-images                       # 文章封面图
│   ├── js/                               # 客户端JavaScript
│   ├── og-images                         # 社交媒体预览图
│   ├── projects                          # 项目展示资源
│   ├── rss                               # RSS订阅资源
│   │   └── style.xsl                     # RSS样式表
│   └── favicon.*                         # 网站图标集
├── scripts                               # 构建脚本
│   ├── optimize-images.ts                # 图片优化脚本
│   └── utils.ts                          # 工具函数
├── src                                   # 核心源码目录
│   ├── assets                            # 开发资源
│   │   └── images                        # 图片资源
│   ├── components                        # 可复用组件
│   │   ├── base                          # 基础组件
│   │   ├── posts                         # 文章相关组件
│   │   │   ├── card                      # 文章卡片
│   │   │   ├── layouts                   # 文章布局
│   │   │   ├── toc                       # 目录组件
│   │   │   └── base                      # 文章基础组件
│   │   └── theme                         # 主题组件
│   ├── content                           # 内容管理
│   │   ├── posts                         # 文章Markdown文件
│   │   └── config.ts                     # 内容配置
│   ├── layouts                           # 页面布局
│   │   ├── Footer.astro                  # 页脚组件
│   │   ├── Header.astro                  # 导航组件
│   │   └── Layout.astro                  # 基础布局
│   ├── lib                               # 工具库
│   ├── pages                             # 页面路由
│   │   ├── api                           # API接口
│   │   │   └── github.ts                 # GitHub API
│   │   ├── posts                         # 文章路由
│   │   │   ├── [...page].astro           # 分页列表
│   │   │   └── [...slug].astro           # 文章详情
│   │   ├── projects                      # 项目展示
│   │   │   └── index.astro               # 项目主页
│   │   ├── tags                          # 标签系统
│   │   │   ├── [tag]                     # 标签分类
│   │   │   │   └── [...page].astro       # 标签分页
│   │   │   └── index.astro               # 标签云
│   │   ├── 404.astro                     # 404页面
│   │   ├── index.astro                   # 首页
│   │   └── rss.xml.js                    # RSS生成
│   ├── stores                            # 状态管理
│   │   └── theme.ts                      # 主题状态
│   ├── styles                            # 样式文件
│   │   ├── global.css                    # 全局样式
│   │   ├── picture.css                   # 图片样式
│   │   └── pro.css                       # 增强样式
│   ├── config.ts                         # 应用配置
│   ├── env.d.ts                          # 环境变量类型
│   └── types.ts                          # 类型定义
├── astro.config.mjs                      # Astro配置
├── package.json                          # 项目依赖
├── README.md                             # 项目文档
└── tsconfig.json                         # TypeScript配置
```

## 核心目录说明

1. **public/**  
   存放直接提供给客户端的静态资源，包括：
   - 网站图标(favicon)
   - 文章封面图(hero-images)
   - 社交媒体预览图(og-images)

2. **src/content/posts/**  
   所有文章Markdown文件的存放位置，支持Front Matter配置

3. **src/components/**  
   包含所有可复用组件：
   - 基础UI组件(base/)
   - 文章相关组件(posts/)
   - 主题定制组件(theme/)

4. **src/pages/**  
   定义网站路由结构，包括：
   - 文章列表和详情页(posts/)
   - 项目展示页(projects/)
   - 标签系统(tags/)

5. **src/config.ts**  
   主配置文件，包含：
   - 站点基本信息(SITE)
   - 导航配置(HEADER_LINKS/FOOTER_LINKS)
   - 社交链接(SOCIAL_LINKS)

> [!tip]
> 开发时重点关注`src/content/posts/`目录管理文章内容，`src/config.ts`配置站点信息，`public/hero-images/`存放文章封面图。
