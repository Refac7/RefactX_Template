---
title: 'Markdown扩展语法'
description: 'RefactX主题中增强Markdown功能的完整指南'
pubDate: 1145-04-29
author: 'Dnzzk2, Refact'
heroImage: 'markdown-extension-syntax.webp'
ogImage: 'markdown-extension-syntax.webp'
heroImageAspectRatio: '16/9'
tags: ['基本教程','笔记']
---

本文档基于[markdown-mdx-extended-features](https://astro-antfustyle-theme.vercel.app/blog/markdown-mdx-extended-features/)进行优化调整。特别感谢原作者:link[Stephanie Lin]{#@lin-stephanie}的贡献。

## 提示框

通过:link[rehype-callouts]{id=lin-stephanie/rehype-callouts class='github'}插件实现，配置位于`plugins/index.ts`。

若修改`theme`配置（默认：`'vitepress'`），需同步更新`src/styles/pro.css`中的CSS导入（`@import 'rehype-callouts/theme/yourconfig'`）。

```md
<!-- 提示框类型名称不区分大小写 -->

<!-- 不可折叠提示框 -->
> [!note]
> 普通提示内容

> [!tip]
> 技巧提示内容

> [!important]
> 重要提示内容

> [!warning]
> 警告提示内容

> [!caution]
> 谨慎提示内容

<!-- 可折叠提示框 -->
> [!caution]- 可折叠提示框
> 谨慎提示内容

> [!note]+ 可折叠提示框
> 普通提示内容
```

> [!note]
> 普通提示内容

> [!tip]
> 技巧提示内容

> [!important]
> 重要提示内容

> [!warning]
> 警告提示内容

> [!caution]
> 谨慎提示内容

> [!caution]- 可折叠提示框
> 谨慎提示内容

> [!note]+ 可折叠提示框
> 普通提示内容

## 增强代码块

通过:link[astro-expressive-code]{id=https://github.com/expressive-code/expressive-code/tree/main/packages/astro-expressive-code}实现，配合[@expressive-code/plugin-collapsible-sections](https://expressive-code.com/plugins/collapsible-sections/)和[@expressive-code/plugin-line-numbers](https://expressive-code.com/plugins/line-numbers/)插件提供高级功能。

#### 语法高亮示例

```js title='示例文件.md'
console.log('这段代码会显示语法高亮!')
```

```ansi title='ANSI颜色示例'
ANSI颜色示例：
- 常规色: [31m红[0m [32m绿[0m [33m黄[0m
- 粗体: [1;31m红[0m [1;32m绿[0m
```

##### 代码编辑器框架

```js title="测试文件.js"
// 使用`title="文件名"`添加标题
console.log('带标题的代码块示例')
```

##### 标记代码行

```js {1, 4, 7-8}
// 第1行 - 通过行号标记
// 第4行 - 通过行号标记
// 第7-8行 - 通过范围标记
```

##### 可折叠代码段

```js collapse={1-5, 12-14}
// 这些样板代码会被折叠
import { boilerplate } from '@example/core'

// 默认可见的核心代码
runMainLogic()

// 这些辅助代码会被折叠
cleanupResources()
```

## 图片标注与链接

使用:link[remark-directive-sugar]{#lin-stephanie/remark-directive-sugar .github}的`:::image`指令实现高级图片功能。

### 带标题图片

```md
:::image-figure[图片标题]
![](/assets/sample.jpg)(style: width:600px;)
:::
```

:::image-figure[示例图片]
![](~/assets/images/markdown-extension-syntax/markdown-extension-syntax.png)(style: width:300px;)
:::

### 可点击图片

```md
:::image-a{href="https://example.com"}
![](/assets/sample.jpg)
:::
```

:::image-a{href="https://github.com/Refac7/RefactX_Template"}
![GitHub仓库](~/assets/images/markdown-extension-syntax/markdown-extension-syntax.png)
:::

## 视频嵌入

使用`::video`指令嵌入各平台视频：

```md
::video-youtube{#视频ID}
::video-bilibili[custom title]{id=视频BV号}
```

::video-bilibili{id=BV1GJ411x7h7}

## 样式化链接

使用`:link`指令创建带图标的链接：

```md
:link[Vite]{id=@vitejs}
:link[npm包]{id=package-name}
```

:link[Vite]{id=@vitejs}  
:link[RefactX]{id=Dnzzk2/RefactX}

## 徽章

使用`:badge`指令创建状态标记：

```md
:badge[新功能]{style="background-color: #bef264"}
```

:badge[新功能]{style="background-color: #bef264"}

## 折叠面板

```md
:::details
::summary[点击展开]
- 项目1
- 项目2
:::
```

:::details
::summary[点击展开]
- 项目1
- 项目2
:::

再次感谢:link[Stephanie Lin]{#@lin-stephanie}的开发，使本主题拥有如此优秀的扩展功能 💗。
