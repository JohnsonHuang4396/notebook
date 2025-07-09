const myNoteLink = '/my-review/md'

export default [
  {
    text: 'MyNote',
    collapsible: true,
    collapsed: true,
    items: [
      { text: '面试总结', link: '/my-review/' },
      { text: '八股文', link: `${myNoteLink}/boring-basic` },
      { text: '我的笔记', link: `${myNoteLink}/my-note` },
      { text: '面经好文', link: `${myNoteLink}/good-article` },
    ]
  }
]

export const myNoteNavConfig = [
  { text: '我的总结', link: '/my-review/' },
  { text: '八股文', link: `${myNoteLink}/boring-basic` },
  { text: '我的笔记', link: `${myNoteLink}/my-note` },
  { text: '面经好文', link: `${myNoteLink}/good-article` },
]
