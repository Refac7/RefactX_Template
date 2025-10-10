---
title: 'ExpressiveCode 配置指南'
description: 'RefactX主题中代码块配置与自定义的完整指南'
pubDate: 1145-05-02
tags: ['基本教程','笔记']
heroImage: 'ExpressiveCode-Configuration.webp'
ogImage: 'ExpressiveCode-Configuration.webp'
---

在Markdown文档中，我们使用代码块展示代码片段等内容。本文档将介绍如何自定义代码块配置。

本主题的代码块通过[ExpressiveCode](https://expressive-code.com/)实现，所有配置选项均在`ec.config.mjs`文件中定义。以下是主要配置项的详细说明：

## 基础配置

```ts title="ec.config.mjs"
export default defineEcConfig({
  defaultLocale: 'zh',         // 默认语言设置
  defaultProps: {              // 默认属性配置
    wrap: false,               // 启用/禁用自动换行
    collapseStyle: 'collapsible-auto',  // 折叠样式：'collapsible-auto'|'collapsible-hidden'|'collapsible-visible'
    showLineNumbers: false,    // 显示/隐藏行号
    preserveIndent: true,      // 保留代码缩进
  },
  minSyntaxHighlightingColorContrast: 0,  // 语法高亮的最小对比度
})
```

## 样式配置

通过`styleOverrides`自定义代码块样式：

```ts title="ec.config.mjs"
styleOverrides: {
  // 字体设置
  uiFontFamily: "'DM Mono','Input Mono','Fira Code','霞鹜尚智黑', '等宽字体'",  // UI字体栈
  uiFontSize: '1em',           // UI字体大小
  codeFontFamily: "'DM Mono','Input Mono','Fira Code','霞鹜尚智黑','等宽字体'",  // 代码字体栈
  codeFontSize: '14px',        // 代码字体大小
  codeLineHeight: '1.4',       // 代码行高

  // 边框和内边距
  borderRadius: '0',           // 边框圆角
  codePaddingBlock: '0.8571429em',   // 上下内边距
  codePaddingInline: '1.1428571em',  // 左右内边距
  borderColor: ({ theme }) => (theme.type === 'dark' ? '#24273a' : '#e6e9ef'),  // 边框颜色

  // 框架样式
  frames: {
    frameBoxShadowCssValue: false,  // 启用/禁用阴影
    inlineButtonBackgroundActiveOpacity: '0.2',    // 按钮激活状态不透明度
    inlineButtonBackgroundHoverOrFocusOpacity: '0.1',  // 按钮悬停状态不透明度
  },

  // 文本标记样式
  textMarkers: {
    backgroundOpacity: '0.2',   // 背景不透明度
    borderOpacity: '0.4',       // 边框不透明度
  },
}
```

## 插件配置

主题内置两个核心插件：

1. `pluginCollapsibleSections`：添加可折叠代码段功能
   - `defaultCollapsed`：控制初始折叠状态
   - `collapseButton`：自定义折叠按钮样式
   ```ts
   pluginCollapsibleSections({
     defaultCollapsed: false,     // 初始展开状态
     collapseButton: {
       position: 'right',         // 按钮位置：'left'左侧 | 'right'右侧
       label: '切换代码',         // 按钮显示文本
     }
   })
   ```

2. `pluginLineNumbers`：为代码块添加行号
   - 支持自定义样式和格式
   ```ts
   pluginLineNumbers({
     className: 'custom-line-numbers',  // 自定义CSS类名
     format: (n) => `${n}.`,           // 自定义行号格式
     style: { opacity: 0.5 }           // 自定义样式
   })
   ```

## 主题配置

主题采用Catppuccin配色方案，支持深度自定义：

```ts title="ec.config.mjs"
themes: ['catppuccin-macchiato', 'catppuccin-latte'],  // 暗色和亮色主题
themeCssSelector: (theme) =>
  (theme.name === 'catppuccin-macchiato' ? '.dark' : ':root:not(.dark)'),  // 主题选择器
useDarkModeMediaQuery: false,   // 是否跟随系统暗色模式
useStyleReset: false,          // 是否重置默认样式

// 高级主题自定义
themeCustomizations: {
  'catppuccin-macchiato': {
    colors: {
      primary: '#8aadf4',      // 主色调
      secondary: '#f5a97f',    // 辅助色调
      syntax: {                // 语法高亮颜色
        string: '#a6da95',     // 字符串颜色
        keyword: '#ed8796',    // 关键字颜色
        function: '#8aadf4',   // 函数颜色
        comment: '#5b6078'     // 注释颜色
      }
    }
  }
}
```

如需了解更多配置细节，可参考官方文档：[Expressive Code 配置参考](https://expressive-code.com/reference/configuration/)。
