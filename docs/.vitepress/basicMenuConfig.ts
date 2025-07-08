import { DefaultTheme } from 'vitepress'
import jsMenuModule, { jsNavConfig } from './jsMenuConfig'
import VueMenuModule, { vueNavConfig } from './vueMenuConfig'
import HTMLMenuConfig, { htmlNavConfig } from './HTMLMenuConfig'
import mixMenuConfig, { mixNavConfig } from './mixMenuConfig'
import myNoteMenuConfig, { myNoteNavConfig } from './myNoteMenuConfig'
import handWriteConfig, { handWriteNavConfig } from './handWriteConfig'

export const sidebar: DefaultTheme.Sidebar = [
  ...jsMenuModule,
  ...VueMenuModule,
  ...HTMLMenuConfig,
  ...mixMenuConfig,
  ...myNoteMenuConfig,
  ...handWriteConfig
]

export const nav = [
  {
    text: 'JS',
    items: jsNavConfig
  },
  { text: 'Vue', items: vueNavConfig },
  { text: 'HTML', items: htmlNavConfig },
  { text: '八股文+面经', items: mixNavConfig },
  { text: '面试总结', items: myNoteNavConfig },
  { text: '手写', items: handWriteNavConfig }
]
