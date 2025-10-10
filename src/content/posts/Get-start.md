---
title: '快速入门'
pubDate: 1145-05-05
description: 'RefactX主题的完整入门指南'
tags: ['基本教程','笔记']
heroImage: 'Getting-Started.webp'
ogImage: 'Getting-Started.webp'
---

欢迎使用 **[RefactX主题](https://github.com/Refac7/RefactX_Template)**！本指南将带您完成基于Astro.js构建的现代化博客主题RefactX的安装与配置流程。

## 环境准备

开始前请确保开发环境中已安装以下工具：

- :link[Node.js]{id=https://nodejs.org/en/download} - 运行开发环境必需
- :link[pnpm]{id=https://pnpm.io/installation} - 推荐的包管理工具
- :link[Git]{id=https://git-scm.com/} - 版本控制工具
- :link[VS Code]{id=https://code.visualstudio.com/} - 推荐代码编辑器

> [!tip]
> 虽然推荐VS Code，但您可以使用任何支持Web开发的编辑器。

## 项目初始化

### 创建项目

通过Fork仓库开始您的RefactX项目：

1. 访问[RefactX主题仓库](https://github.com/Refac7/RefactX_Template)
2. 点击"Fork"按钮创建您的副本
3. 本地克隆仓库：

```bash
git clone https://github.com/[您的用户名]/[仓库名].git
cd [仓库名]
```

### 安装依赖

克隆完成后安装项目依赖：

```bash
# 安装所有依赖
pnpm install

# 启动开发服务器
pnpm dev
```

## 项目配置

自定义站点前请先熟悉[项目结构](/posts/project-structure)，主要配置集中在三个区域：

1. **基础站点配置**
   - 文件：`src/config.ts`
   - 功能：配置站点元数据、导航和核心设置
   - 详情：[基础配置指南](/posts/basic-configuration)

2. **代码块样式**
   - 文件：`ec.config.mjs`
   - 功能：自定义代码块外观和行为
   - 详情：[ExpressiveCode配置](/posts/expressivecode-configuration)

3. **Markdown扩展**
   - 文件：`/plugins/index.ts`
   - 功能：配置Markdown插件和扩展
   - 详情：[Markdown扩展语法](/posts/markdown-extension-syntax)

## 内容创作

RefactX支持标准Markdown和增强语法：

- [基础Markdown语法](/posts/markdown-syntax-guide) - 核心格式化语法
- [扩展Markdown功能](/posts/markdown-extension-syntax) - 高级格式化选项

文章元数据配置请参考[文章配置指南](/posts/md-configuration)。

> [!tip]
> 建议先完成基础配置，确定站点品牌风格和导航结构后再开始内容创作。
