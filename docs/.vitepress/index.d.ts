export interface ItemConfig {
  text: string
  link: string
}

export interface BasicInfoConfig {
  text: string
  collapsible: boolean
  collapsed: boolean
  items: Array<ItemConfig>
}
