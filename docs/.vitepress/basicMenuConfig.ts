import { DefaultTheme } from 'vitepress'
import jsMenuModule from './jsMenuConfig'
import VueMenuModule from './vueMenuConfig'
import HTMLMenuConfig from './HTMLMenuConfig'
import mixMenuConfig from './mixMenuConfig'
import myNoteMenuConfig from './myNoteMenuConfig'

const sidebar: DefaultTheme.Sidebar = [
  ...jsMenuModule,
  ...VueMenuModule,
  ...HTMLMenuConfig,
  ...mixMenuConfig,
  ...myNoteMenuConfig,
]

export default sidebar
