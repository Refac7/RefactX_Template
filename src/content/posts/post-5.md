---
title: 'Waline评论系统的部署与配置'
description: '本文重点指出了在部署 Waline 评论系统时可能遇到的问题。'
pubDate: 2025-09-26
author: 'Refact'
heroImage: 'me.webp'
ogImage: 'me.webp'
heroImageAspectRatio: '16/9'
tags: ['笔记']
---

本文使用的是前后端分离的方式，当然可以使用完全嵌入的方式，不过我没成功。

## 后端配置

推荐使用 vercel 无服务器部署，使用`@waline/vercel` 包进行部署

https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fwalinejs%2Fwaline%2Ftree%2Fmain%2Fexample

点击以上链接跳转到 vercel 进行部署，如果未注册，可使用GitHub账户注册。

### 添加数据库环境变量

除了官方推荐的 Leancloud 之外，也支持 MySQL, PostgreSQL, SQLite 以及 MongoDB。

相关环境变量键值可以在官方文档查看 https://waline.js.org/guide/database.html

> [!warning]
> 官方提示 MySQL, PostgreSQL, SQLite 数据库要提前创建表结构

[waline.sqlite](https://github.com/walinejs/waline/blob/main/assets/waline.sqlite)

### 部署和后续工作

通过 vercel 部署完成后，需要绑定自己的域名使用，因为 vercel.app 在大陆不可访问。你可以直接访问，看到评论窗口，你可以直接发送一个实例评论，然后在数据库查看是否写入键值。

## 前端配置

对于未集成评论系统的静态博客系统，我们一般要先创建一个 泛用组件，然后在博客页模版相应位置引入即可。

下面我给出一个 Astro静态博客的示例组件

```astro
// /src/components/posts/base/Comments.astro
<div id="waline"></div>

<link
  rel="stylesheet"
  href="https://unpkg.com/@waline/client@v3/dist/waline.css"
/>

<style is:global>
  /* 去掉 Waline 所有圆角 */
  #waline .wl-editor,
  #waline .wl-input,
  #waline span.wl-badge,
  #waline .wl-btn,
  #waline .wl-comment,
  #waline .wl-card,
  #waline .wl-panel,
  #waline .wl-header,
  #waline .wl-gif-popup,
  #waline .wl-emoji-popup,
  #waline .wl-footer {
    border-radius: 0 !important;
    font-family: 'ShangguSansSC Variable', system-ui, -apple-system, sans-serif !important;
  }

  .wl-content,
  .wl-content * {
    white-space: normal !important;
    word-break: break-word !important;
    overflow-wrap: anywhere !important;
  }

  /* 浅色模式下的颜色设置 */
  #waline {
    --waline-theme-color: #000000 !important;
    --waline-active-color: #dc2626 !important;
    /* 设置字体 */
    --waline-font-size: 1rem !important;
    --waline-font-family: 'Onest Variable', 'Geist Variable', 'ShangguSansSC Variable', system-ui, -apple-system, sans-serif !important;
  }

  /* 深色模式下的颜色和背景设置 */
  html.dark #waline {
    --waline-theme-color: #ffffff !important;
    --waline-active-color: #dc2626 !important;
  }

  html.dark #waline .wl-panel {
    --waline-bgcolor: #101018 !important;
    background-color: #101018 !important;
  }

  /* 禁用输入框获得焦点时的样式变化 */
  #waline .wl-editor:focus,
  #waline .wl-editor:focus-within,
  #waline .wl-input:focus {
    background-color: var(--waline-bgcolor) !important;
    box-shadow: none !important;
    outline: none !important;
  }
</style>

<script src="https://unpkg.com/@waline/client@v3/dist/waline.umd.js" defer></script>
<script>
function loadWaline() {
  const container = document.querySelector('#waline');
  if (!container) return; // 容器不存在就不初始化

  const w = (window as any).Waline;
  if (!w) return;

  // 如果已有实例，先安全销毁
  const oldInstance = (window as any).__walineInstance;
  if (oldInstance && typeof oldInstance.destroy === 'function') {
    try {
      // 只有当挂载点还在 DOM 中时才销毁
      if (container.contains(container.firstChild) || container.childNodes.length > 0) {
        oldInstance.destroy();
      }
    } catch (e) {
      console.warn('Waline destroy failed:', e);
    }
  }

  // 重新初始化并保存实例
  (window as any).__walineInstance = w.init({
    el: container,
    serverURL: 'https://waline.refact.cc/',
    path: location.pathname.replace(/\/$/, ''),
    lang: 'zh-CN',
    pageview: true,
    dark: 'html.dark',
    requiredMeta: ['nick', 'mail'],
    locale: { placeholder: '写点什么吧…' }
  });
}


  // 首次加载
  window.addEventListener('DOMContentLoaded', loadWaline);

  // PJAX 完成后
  document.addEventListener('pjax:complete', loadWaline);

  // Astro View Transitions 完成后
  document.addEventListener('astro:page-load', loadWaline);
</script>

```

你需要把其中的 serverURL 类改为真实的后端地址，你可以在其中的 css样式树上更改主题色等配置来适应自己的博客系统。

> [!note]
> 这里引用了两个 unpkg 的库，你可以把它下载到本地以获得更高的性能。

最后在 /src/pages/posts/[...slug].astro 的layout标签中引入即可

```astro
import Comments from '~/components/posts/base/Comments.astro';
<!-- 其它导入 -->
<layout>
<!-- 其它代码 -->
    <!-- 评论区 -->
    <div class="px-4 sm:px-6 pb-6 sm:pb-8">
      <Comments />
    </div>
</layout>
```

这样，评论系统的最基本功能就基本成型了。

## 启用邮件通知功能

你可以在后端仓库的 index.cjs 中直接修改来生效，或者创建 .env 文件来配置环境变量。不过我更推荐直接在添加 vercel 环境变量中添加，这样方便后期修改。

#### 你必须添加以下环境变量

1. SMTP服务器，SMTP_SERVICE（一般支持主流的邮箱 https://github.com/nodemailer/nodemailer/blob/master/lib/well-known/services.json）
1. SMTP用户，SMTP_USER（一般是你的邮箱地址）
1. SMTP密码，SMTP_PASS（获取方法请自行百度）
1. 网站名称，SITE_NAME（站点名称，用于通知邮件中的名字显示）
1. 网站地址，SITE_URL（站点链接，用于通知邮件中的超链接）
1. 你执行评论时用的邮箱，AUTHOR_EMAIL（如果是自己发的评论，不会邮件通知）
1. SMTP安全连接，SMTP_SECURE（一般情况下设置为 true 就好）

#### 我推荐设置的可选环境变量

1. 发件人名称和发件人邮箱，SENDER_NAME 和 SENDER_EMAIL（必须同时添加，是邮件中显示的发件人名称和邮箱，邮箱的值必须和自己的邮箱地址保持完全一致）
2. 邮件的样式，MAIL_TEMPLATE 和 MAIL_TEMPLATE_ADMIN（两者可以一致，用Html编写，压缩反义成单行的格式）这一步使用AI工具会快得多

这里展开来讲， waline 和 Twikoo 的变量名不完全一样，如果直接把 Twikoo 的代码直接用于 waline ，大概会出现变量没被替换的情况。

| 变量名   | Waline             | Twikoo            |
| -------- | ------------------ | ----------------- |
| 网站名称 | {{site.name}}      | ${SITE_NAME}      |
| 评论者   | {{parent.nick}}    | ${PARENT_NICK}    |
| 评论内容 | {{parent.comment}} | ${PARENT_COMMENT} |
| 回复者   | {{self.nick}}      | ${NICK}           |
| 回复内容 | {{self.comment}}   | ${COMMENT}        |
| 文章链接 | {{site.postUrl}}   | ${POST_URL}       |

你需要注意以上变量名，防止出现乱码等情况。

我这边再给出一个实例代码

MAIL_TEMPLATE

```html
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;padding:32px 24px;background:#fff;color:#000;line-height:1.6;"><div style="display:flex;align-items:center;margin-bottom:40px;"><img src="https://www.refact.cc/avatar.png" alt="{{site.name}}" style="width:48px;height:48px;object-fit:contain;margin-right:12px;"><span style="font-size:22px;font-weight:700;color:#000;">{{site.name}}</span></div><h1 style="margin:0 0 24px 0;font-size:28px;font-weight:700;color:#000;">Hi <span style="color:#e63946;">{{self.nick}}</span></h1><p style="margin:0 0 32px 0;font-size:16px;color:#333;">您在 <a href="{{site.url}}" style="color:#e63946;text-decoration:none;font-weight:600;">{{site.name}}</a> 的评论收到了作者的回复：</p><div style="margin-bottom:28px;"><h2 style="margin:0 0 8px 0;font-size:18px;font-weight:700;color:#000;">您发表的评论</h2><p style="margin:0;font-size:15px;color:#000;">{{self.comment|safe}}</p></div><div style="margin-bottom:40px;"><h2 style="margin:0 0 8px 0;font-size:18px;font-weight:700;color:#000;">作者的回复</h2><p style="margin:0;font-size:15px;color:#000;">{{parent.comment|safe}}</p></div><a href="{{site.postUrl}}" style="display:inline-block;padding:14px 28px;background:#000;color:#fff;text-decoration:none;font-weight:700;font-size:15px;">查看详情</a><hr style="border:none;border-top:1px solid #000;margin:48px 0 16px 0;" /><p style="font-size:12px;color:#666;margin:0;">此邮件由系统发送，请勿回复。</p></div>
```

MAIL_TEMPLATE_ADMIN

```html
<div style="font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;max-width:640px;margin:0 auto;padding:32px 24px;background:#fff;color:#000;line-height:1.6;"><div style="display:flex;align-items:center;margin-bottom:40px;"><img src="https://www.refact.cc/avatar.png" alt="{{site.name}}" style="width:48px;height:48px;object-fit:contain;margin-right:12px;"><span style="font-size:22px;font-weight:700;color:#000;">{{site.name}}</span></div><h1 style="margin:0 0 24px 0;font-size:28px;font-weight:700;color:#000;">Hi <span style="color:#e63946;">{{parent.nick}}</span></h1><p style="margin:0 0 32px 0;font-size:16px;color:#333;">您的 <a href="{{site.url}}" style="color:#e63946;text-decoration:none;font-weight:600;">{{site.name}}</a> 网站收到一条新评论：</p><div style="margin-bottom:40px;"><h2 style="margin:0 0 8px 0;font-size:18px;font-weight:700;color:#000;">您收到的评论</h2><p style="margin:0;font-size:15px;color:#000;">{{self.comment|safe}}</p></div><a href="{{site.postUrl}}" style="display:inline-block;padding:14px 28px;background:#000;color:#fff;text-decoration:none;font-weight:700;font-size:15px;">查看并回复</a><hr style="border:none;border-top:1px solid #000;margin:48px 0 16px 0;" /><p style="font-size:12px;color:#666;margin:0;">此邮件由系统发送，请勿回复。</p></div>
```

这个模版的效果如下，你必须更改其中的logo链接，或者是直接删除图标。

:::image-figure[评论系统实例图]
![](/assets/comment.png)(style: width:full;)
:::

## 结尾

这样就完成了一个较为专业的评论系统的部署，还有很多细节，本文并未列出。你可以访问官方文档来查询更多细节。

### 参考文献

[Waline 官方文档](https://waline.js.org/guide/get-started/)

[oragekk的博客](https://oragekk.me/blog/waline-mail.html)

**共 1859 词**

2025年9月26日 在macOS Tahoe 26.0 ｜ Typora 编辑
