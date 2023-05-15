import type { BasicInfoConfig, ItemConfig } from './index.d'

const vueBasicLink = '/vue/md'

const vueConfig: BasicInfoConfig[] = [
  {
    text: 'Vue',
    collapsible: true,
    collapsed: true,
    items: [
      { text: 'Vue好文', link: '/vue/' },
      { text: 'Vue基础', link: `${vueBasicLink}/VueBasic` }
    ]
  }
]

export const vueNavConfig: ItemConfig[] = [
  { text: 'Vue好文', link: '/vue/' },
  { text: 'Vue基础', link: `${vueBasicLink}/VueBasic` }
]

export default vueConfig
