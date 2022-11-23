const myNoteLink = '/my-note/md'

export default [
  {
    text: 'MyNote',
    collapsible: true,
    collapsed: true,
    items: [{ text: '面试总结', link: '/my-note/' }],
  },
]

export const myNoteNavConfig = [
  { text: '我的总结', link: '/my-note/' },
  { text: '面经好文', link: `${myNoteLink}/good-article` },
]
