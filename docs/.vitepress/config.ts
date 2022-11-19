import { defineConfig } from 'vitepress'
import { sidebar } from './basicMenuConfig'
import { nav } from './basicMenuConfig'

export default defineConfig({
  title: 'my notebook',
  base: '/notebook',
  description: '第一个vitepress',
  lang: 'zh_CN',
  themeConfig: {
    siteTitle: 'INeedAGodDamnGUN',
    logo: '/imgs/gun.png',
    outlineTitle: '当前页面',
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Jhonson1z' },
      { icon: 'gitee', link: 'https://gitee.com/INeedAGodDamnGun' },
      {
        icon: 'golden',
        link: 'https://juejin.cn/user/2647279732267342/posts',
      },
    ],
    nav,
    sidebar,
  },
  markdown: {
    lineNumbers: true,
  },
})
