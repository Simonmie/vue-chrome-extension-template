import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'vue-chrome-extension-template',
  description: 'use Vue and Javascript to build a chrome extension',
  lang: 'zh-CN',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '中文文档', link: '/zh-CN/起步' },
    ],
    sidebar: [
      {
        text: '文档',
        items: [
          { text: '起步', link: '/zh-CN/起步' },
          { text: '模板使用', link: '/zh-CN/模板使用' },
          { text: '提示词', link: '/zh-CN/提示词' },
          { text: '侧边栏开发注意事项', link: '/zh-CN/侧边栏开发注意事项' },
        ],
      },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Simonmie/vue-chrome-extension-template' },
    ],
  },
})
