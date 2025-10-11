import type {
  GithubConfig,
  Link,
  PhotoData,
  PhotosConfig,
  PostConfig,
  Project,
  ProjectConfig,
  Site,
  SkillsShowcaseConfig,
  SocialLink,
  TagsConfig,
} from '~/types'

// 站点信息
export const SITE: Site = {
  title: 'RefactX Project',
  description: '如风般轻盈，如光般纯粹。',
  website: 'https://www.refact.cc/',
  base: '/',
  author: 'Refact',
  ogImage: '/og-image.webp',
}

export const HEADER_LINKS: Link[] = [
  {
    name: '文章',
    url: '/posts',
  },
  {
    name: '项目',
    url: '/projects',
  },
  {
    name: '图库',
    url: '/photos',
  },
]

export const FOOTER_LINKS: Link[] = [
  {
    name: '主页',
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
  {
    name: '图库',
    url: '/photos',
  },
  {
    name: '友链',
    url: '/friends',
  }
]

// get icon https://icon-sets.iconify.design/
export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: 'github',
    url: '/',
    icon: 'icon-[ri--github-fill]',
    count: 1,
  },
  {
    name: 'bilibili',
    url: '/',
    icon: 'icon-[ri--bilibili-fill]',
    count: 77,
  },
]

/**
 * SkillsShowcase 配置接口 / SkillsShowcase configuration type
 * @property {boolean} SKILLS_ENABLED  - 是否启用SkillsShowcase功能 / Whether to enable SkillsShowcase features
 * @property {Object} SKILLS_DATA - 技能展示数据 / Skills showcase data
 * @property {string} SKILLS_DATA.direction - 技能展示方向 / Skills showcase direction
 * @property {Object} SKILLS_DATA.skills - 技能展示数据 / Skills showcase data
 * @property {string} SKILLS_DATA.skills.icon - 技能图标 / Skills icon
 * @property {string} SKILLS_DATA.skills.name - 技能名称 / Skills name
 * get icon https://icon-sets.iconify.design/
 */
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
    {
      direction: 'left',
      skills: [
        {
          name: 'Ubuntu',
          icon: 'icon-[mdi--ubuntu]',
        },
        {
          name: 'Git',
          icon: 'icon-[mdi--git]',
        },
        {
          name: 'MongoDB',
          icon: 'icon-[lineicons--mongodb]',
        },
        {
          name: 'Vercel',
          icon: 'icon-[lineicons--vercel]',
        },
      ],
    },
  ],
}

/**
 * GitHub配置 / GitHub configuration
 *
 * @property {boolean} ENABLED - 是否启用GitHub功能 / Whether to enable GitHub features
 * @property {string} GITHUB_USERNAME - GITHUB用户名 / GitHub username
 * @property {boolean} TOOLTIP_ENABLED - 是否开启Tooltip功能 / Whether to enable Github Tooltip features
 */

export const GITHUB_CONFIG: GithubConfig = {
  ENABLED: true,
  GITHUB_USERNAME: 'Refac7',
  TOOLTIP_ENABLED: true
}

// 文章配置
export const POSTS_CONFIG: PostConfig = {
  title: 'Posts',
  description: '文章',
  introduce: '不定时更新维护文章，可订阅 RSS 获取最新更新状态。',
  author: 'Refact',
  homePageConfig: {
    size: 5,
    type: 'compact'
  },
  postPageConfig: {
    size: 10,
    type: 'image'
  },
  tagsPageConfig: {
    size: 10,
    type: 'time-line'
  },
  defaultHeroImage: '/og-image.webp',
  defaultHeroImageAspectRatio: '16/9',
  postType: 'horizontal',
  imageDarkenInDark: true,
  readMoreText: '阅读全文',
  prevPageText: '上一页',
  nextPageText: '下一页',
  tocText: '目录导航',
  backToPostsText: '返回文章列表',
  nextPostText: '下一篇',
  prevPostText: '上一篇'
}

// 标签配置
export const TAGS_CONFIG: TagsConfig = {
  title: 'Tags',
  description: '所有文章标签',
  introduce: '所有文章标签均在此处，点击即可筛选。'
}

// 项目配置
export const PROJECTS_CONFIG: ProjectConfig = {
  title: 'Projects',
  description: '我的项目案例',
  introduce: '以下是我的项目案例展示。'
}

export const ProjectList: Project[] = [
  {
    name: 'RefactX',
    description: '基于Astro的简洁现代博客',
    githubUrl: 'https://github.com/Refac7/RefactX_Template',
    website: '/',
    type: 'icon',
    icon: 'icon-[ri--xing-fill]',
    star: 1,
    fork: 1
  },
]

// 图库配置
export const PHOTOS_CONFIG: PhotosConfig = {
  title: 'Photos',
  description: '浮光掠影处，皆是生活馈赠的吉光片羽',
  introduce: '方寸镜头间，镌刻着时光走过的痕迹',
}

export const PhotosList: PhotoData[] = [
  {
    title: "长安夜未央·西安",
    icon: {
      type: 'emoji',
      value: '🌠',
    },
    description: '三秦大地的夜色，盛唐气象在霓虹中流转',
    date: '2025-07-11',
    photos: [
      {
        src: '/photos/250711-1.webp',
        width: 1512,
        height: 2016,
        variant: '4x5',
      },
      {
        src: '/photos/250711-2.webp',
        width: 2016,
        height: 1512,
        variant: '4x3',
      },
      {
        src: '/photos/250711-3.webp',
        width: 2016,
        height: 1512,
        variant: '4x3',
      },
      {
        src: '/photos/250711-4.webp',
        width: 2016,
        height: 1512,
        variant: '4x3',
      },
      {
        src: '/photos/250711-5.webp',
        width: 1512,
        height: 2016,
        variant: '4x5',
      },
    ],
  }
]

// 友链列表配置
export const FRIENDS_CONFIG = {
  title: 'Friends',
  description: '我的朋友们都在这里，欢迎互访～',
  introduce: '相隔万里遇见你，真的很幸运！',
}

export const FRIENDS_LIST = [
  {
    name: 'RefactX',
    url: 'https://www.refact.cc',
    author: 'Refactored',
    description: '如风般轻盈，如光般纯粹。',
    avatar: 'https://refact.cc/avatar.png',
  },
]

// 我的友链信息
export const FRIENDS_CONTACT = {
  sitename: 'RefactX Project',
  email: 'refs@aliyun.com',
  author: 'Refactored',
  sitelink: 'https://www.refact.cc',
  siteavatar: 'https://refact.cc/avatar.png',
  description: '形体是简单而纯粹的，它不是完整的群体，每个形体都指向其复杂性，并最终被复杂性联系在一起。', 
}

// Waline 配置
export const WALINE_CONFIG = {
  enableComment: false, // 设置为 false 可禁用评论组件
  serverURL: "", // Waline 服务器地址
};
