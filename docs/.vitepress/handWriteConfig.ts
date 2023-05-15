import type { BasicInfoConfig, ItemConfig } from './index.d'

const handWriteConfig: BasicInfoConfig[] = [
  {
    text: '手写',
    collapsible: true,
    collapsed: false,
    items: [{ text: '手写JS', link: '/hand-write/' }]
  }
]

export const handWriteNavConfig: ItemConfig[] = [
  { text: '手写JS', link: '/hand-write/' }
]

export default handWriteConfig
