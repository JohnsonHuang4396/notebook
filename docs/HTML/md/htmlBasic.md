# ⚙️ HTML 基础

## 1、什么是 HTML

超文本标记语言

## 2、Doctype 是什么

`Doctype`用于告知浏览器需要使用哪个版本的`HTML标准`来解析文档，如果没有标注浏览器则使用`怪异模式`进行解析

## 3、HTML 语义化理解

1. 直接通过标签即可得知标签的作用，无需查看 css，便于浏览
2. 帮助 seo 进行页面解析
3. 便于团队维护

## 4、src 和 href 的区别

- `src`用于`img`、`vedio`等需要引入外部资源作为内容的标签，指向外部资源的来源地址。当`src`加载时，会停止总线的动作，如`渲染`、`脚本执行`等。
- `href`超连接用于`a`、`link`等标签，指向网络资源。当浏览器执行到`href`时，会进行下载资源操作，但不会停止总线执行。

## 5、title 和 h 标签的区别，b 和 strong 标签的区别，i 和 em 标签的区别

1. `title`是作为当前网页的标题，`h`作为网页内容的标题
2. `strong`为重点标注内容，当使用阅读软件阅读网络时会重读`strong`的内容，`b`则作为强调内容
3. `i`为斜体的简写，`em`为`emphasis`强调文本的简写

## 6、什么是严格模式和怪异模式

- `严格模式`为浏览器遵守最高标准进行解析
- `怪异模式`为浏览器自上而下地按照老版浏览器进行兼容解析

## 7、前端页面由哪几层组成

- `结构层`：由标签、文本、图片等组成
- `表示层`：由 CSS 样式组成
- `行为层`：负责网页与用户的交互

## 8、img 标签的 title 和 alt

- `title`为鼠标放在图片上显示的内容
- `alt`为图片资源失效时显示的替换内容

## 9、H5 和 HTML5 的区别

- `H5`是产品名词，包含`HTML5`、`CSS3`、`ES6`等内容
- `HTML5`指第五代 HTML

## 10、块级元素、行内元素和行内块级元素有哪些？如何区分？

- `块级元素`：div、ul、ol、li、h1-h6、table、dl、dd、dt、p 等
- `行内元素`：span、label、a 等
- `行内块级元素`：img、input、textarea 等 **区别：**

1. `行内元素`无法设置水平和垂直高度的内外边距以及宽高度，内容只能包含其他行内元素和文本，且行内元素会显示在同一行
2. `块级元素`可以设置水平和垂直的内外边距以及宽高，可以包含块级元素、行内元素以及文本
3. `行内块级元素`可以设置水平和垂直的内外边距以及宽高，并且行内块级元素会显示在同一行

## 11、label 的使用

`label`常作为表单的标签使用，最常用的是配合`类型为radio的input`使用，用户可以通过点击 label 更改单选框状态

## 12、浏览器怪异模式和标准模式的区别

1. 盒子宽度组成：`怪异模式`下盒子的宽度由`内容宽度+padding+margin`组成，`标准模式`下由`内容宽度`组成
2. 宽高百分比：`标准模式`下，如果父盒子没有设置百分比宽高，则子盒子的百分比不生效

## 13、HTML5 新增了哪些标签和内容

- 语义化标签：section、main、aside、header、footer 等
- 媒体标签：vedio、audio
- 画布：canvas
- input 表单新类型：date、email、time 等
- `localStorage`本地长期存储，`sessionStorage`仅在浏览器关闭前存储

## 14、a 标签的作用

- url 跳转
- `<a href="tel:110">110</a>`拨打电话，`<a href="sms:110">110</a>`发送短信
- 页面锚点定位
