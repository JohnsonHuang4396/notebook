# HTML

## **页面通信**

- `同源方法`

  1.  `localStorage`:通过添加监听器监听`storage事件`获取通信内容

  ```JS
  window.addEventListener(' message',event=>{
       const data =JSON.parse(event.data)
       ...
  })
  // 存放信息使用setItem即可
  // storage事件只会在存放的值发生变化时才触发，因此存储因加上时间戳
  let time=new Date
  localStorage.setItem('value',JSON.stringify(time))
  ```

  2.  `Cookie`:`Cookie`允许在同源站点间传输

  ```JS
  let myDate = new Date
  myDate.setDate(myDate.getDate() + 10) // 延长cookie有效时间
  // 想要删除cookie只需要把expires的值设为过去的时间即可
  document.cookie=`name${value};expires=${new Date}`
  ```

  3.  `BroadCase Channel`:创建一个广播通道，类似`uni.$on`

  ```JS
  const broadcast = new BroadCaseChannel('myChannel')
  broadcast.onMessage = event =>{
       ...
  }
  broadcast.postMessage(Mydata)
  ```

- `跨域方法`

  1.  `postMessage + iframe` : `postMessage`为`window对象`的跨域解决方法，配合`iframe`自身的跨域请求可实现跨域通信

  ```html
  <!----  a.html  -->
  <iframe src="http://b.demo.com" id="iframe" onload="onload()" />
  <script>
    function onload() {
      const iframe = document.querySelector('#iframe')
      iframe.contentWindow.postMessage('i love u', 'http://b.demo.com')
      window.onmessage = function (event) {
        console.log('b event  :>>', event.data)
      }
    }
  </script>
  ```

  ```js
  // b.html
  window.onmessage = function (event) {
    console.log('a event  :>>', event.data)
    event.postMessage('i love u too', 'http://a.demo.com')
  }
  ```

  2.  `cors` : 服务器设置`Access-Control-Allow-Origin`和后端处理

      > `简单请求`：
      >
      > 1.  使用`get`、`post`和`head`其中一种方法请求的
      > 2.  `http`请求头字段不超出`Accep`、`Accept-Language`、`Content-Language`、`Content-Type`的值仅限于`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`
      >
      > `复杂请求`：
      >
      > 1.  使用`DELETE`、`PUT`等方式请求的
      > 2.  `Content-Type`类型为`application/json`
      >
      > **非简单请求会在正式通信前使用 `options` 发起一个预检请求，询问服务器当前的域名是否在服务器允许的名单之中，以及请求信息是否允许修改等。**

  1.  `JSONP` : 将请求放到`<script>`标签的`src`属性中，然后请求结果作为回调的参数返回

  ```js
  button.addEventListener('click', function(event){
            let script = document.createElement('script');
            let functionName = 'fang' + parsInt(Math.random() *10000,10)
            window[functionName]=function(reqResult) {
                 if (reqResult.status===200) {
                      console.log(reqResult.data)
                 }
            }
       }
       script.src = `http://demo.com:8002/pay?callback${functionName} `
       document.body.appendChild(script)
       script.onload = function(target) {
            target.currentTarget.remove()
            delete window[functionName]
       }
       script.onerror = function(target){
            alert('fail')
            target.currentTarget.remove()
            delete window[functionName]
       }
  )
  ```

## **为什么浏览器有标准模式和怪异模式**

- `标准模式` : 当`DOCTYPE`设置准确的`HTML`版本时触发，浏览器将按照规定的`HTML版本`和`W3C标准`去解析文档

- `怪异模式` : 当没有设置`DOCTYPE`时浏览器为了向下版本兼容而使用自身方式解析

## **标准模式和怪异模式的区别**

1. `盒子宽度` : `标准模式`下，**盒子宽度 =盒子内容宽度** ；`怪异模式`下，**盒子宽度 = 盒子内容宽度 + 水平 border + 水平 padding**

2. `属性继承` : `标准模式`下允许继承`font`属性；`怪异模式`下则不会继承

3. `高度百分比` : `标准模式`下盒子高度设置百分比后高度为**父盒子高度\*百分比**；`怪异模式`下盒子高度设置百分比后为**窗口高度\*百分比**

4. `overflow:visible` : `标准模式`下内容溢出，`盒子宽度不变`；`怪异模式`下内容溢出，`盒子宽度根据内容改变`

## **addEventListener 的使用**

- `method { string }` : 需要监听的方法名

- `callback { function }` : 监听的回调函数

- `options { object }`或`capture { boolean }` : 是否进行事件捕获

  > `options`包括三个属性：
  >
  > 1.  `capture { boolean } = false` : 是否进行事件捕获
  >
  > 2.  `once { boolean } = false` : 是否只执行一次回调函数
  >
  > 3.  `passive { boolean } = false` : 是否`listener`永远无法使用`preventDefault()` ( 但在`Firefox`和`Chrome`中，为了页面滚动的流畅性对`touchstart`和`touchmove`事件的`passive值设置为true`，以防止自定义事件被调用阻塞页面渲染 )

## **浏览器从输入 URL 到页面展示经历了什么**

1. 浏览器输入 URL 后会`查询本地缓存`，如果没有该 URL 的`IP映射缓存`则向`DNS服务器`发送解析请求

2. `DNS服务器`会根据`根域名服务器`、`顶级域名服务器`、`第二层域名`和`子域名服务器`的顺序来进行`IP地址的解析`，然后将得到的 IP 地址返回给浏览器

3. 浏览器拿到 IP 地址后，与`目标IP`建立`TCP连接`

4. `TCP连接`建立后，浏览器将`header请求头`和`body请求体`封装为`TCP包`发送给服务器
5. 服务器接收请求后，将数据封装成`response响应报文`返回给服务器（响应报文包括：`状态码`、`响应头`和`响应报文`）

6. 浏览器接收响应后，首先解析`HTML文件的body标签`并生成`DOM树`（这时当遇到`link标签`时会在解析的同时下载文件，不会影响解析，但如果遇到`不携带defer属性的script标签`时，则会停止解析等待`script`的下载和执行完成才继续解析。遇到`img、video等标签`则在解析的同时进行文件的下载，下载完成后`存储在本地等待渲染完成后展示`）

7. 然后解析`CSS文件和内联样式`生成`CSS树`

8. 最后合并生成`render树`并渲染到页面

# HTTP

## HTTP1、HTTP1.X、HTTP2.0、HTTP3.0 经历了什么变化

### HTTP/1.0

- 在每个请求头中带上协议版本
- 响应中包含状态码
- 引入 HTTP 标头
- 凭借 Content-Type 标头，得以进行除纯文本的 HTML 文档外其他类型文档的能力

### HTTP/1.1

- **带宽优化**

  > HTTP/1.0 在响应时会将整个数据体返回，HTTP/1.1 允许只返回部分数据（206 响应码）

- **响应状态码**

  > HTTP/1.1 增加了 24 个错误状态码

- **Host 头处理**

  > 在 HTTP/1.0 的时代，一台服务器被认为只有一个 IP 指向，因此请求头和响应头都没有 Host 字段。随着虚拟主机发展，一台主机允许多个虚拟主机代理，因此在请求头和响应头中都加上了 Host 字段，当没有该字段时会返回 400 BadRequest 状态码

- **长连接**
  > 在 HTTP/1.0 时，每一个请求都会重新建立一个 TCP 链接。而 HTTP/1.1 允许多个请求和响应发生在**一个 TCP 链接**上，且默认开启`Connection: keep-alive`

### HTTP/1.x && SPDY

> 由 Google 提出的 SPDY 方案，一定程度上解决了 HTTP/1.x 的安全性问题

- **降低延迟**

  > `SPDY`使用多路复用的方法，通过多个`请求stream`公用一个 TCP 连接方法，降低了延迟的同时提高了宽带利用率

- **请求优先级**

  > 在多路复用的前提下，`SPDY`为每个请求设置优先级，确保重要的请求先返回（如首页等）

- **强制基于`HTTPS`的加密协议传输**

- **服务端推送**
  > 允许服务器在客户端缓存中填充数据。当客户端请求了 index.js 时，服务端会将其依赖的 index.css 文件一并返回，客户端下次即可从缓存中取出 index.css 文件

### HTTP/2.0

- **HTTP/2.0 支持明文传输**

- **二进制编码**

  > HTTP/1.x 都是基于文本的，由于文本类型繁多，解析难度大，而 HTTP/2.0 将所有信息拆解成二进制格式进行编码，便捷且更加健壮

  > 并且 HTTP/2.0 将 Header 和 Data 分别拆解成更小的二进制格式帧后，分别插入 Header 帧和 Data 帧中，传输到服务器后由服务器重新组装为 HTTP/1.x 的格式

- **多路复用**

  > HTTP/2.0 允许在一个 TCP 链接上使用多个 stream 进行传输，同时由于将请求拆解成二进制帧，避免了 HTTP/1.x 的队头阻塞问题

- **Header 压缩**

  > `HTTP1.X`的`header`带有大量信息，且每次都重新发送，`HTTP2.0`使用`encode`减少传输的`header`大小，通信双方各持一份`header fields表`，标头的重复字段将不会重复发送，同时加上在 gzip 压缩后发送，大大压缩了标头的大小

- **服务端推送**

## OSI 七层应用模型

> 应用层

> 表示层

> 会话层

> 传输层

> 网络层

> 数据链路层

> 物理层

## TCP/IP 四层应用模型

> 应用层

> 传输层

> 网络层

> 物理层

## **TCP 三次握手**

1. 客户端向服务器发送`SYN = 1; Seq = x`的请求建立连接`TCP报文`
2. 服务器确认接收到报文后，将`SYN = 1; Seq = y; ACK = x+1`的`TCP报文`发送给客户端
3. 客户端确认接收到报文后，将`SYN = 1; ACK = y+1`的`TCP报文`发送给服务器
4. 开始进行通信

## **TCP 四次挥手**

1. 客户端想要中断`TCP连接`，因此发送`FIN; Seq = x+2; ACK = y+1`的`TCP报文`给服务器，并进入`close_wait1`等待关闭状态 1

2. 服务器接收到报文后，返回`ACK = x+3`的`TCP报文`，也进入`close_wait`等待关闭状态

3. 当服务器确认没有信息需要发送给客户端时，发送`FIN; Seq = y+1; ACK = x+3`的`TCP报文`给客户端，并进入`last_ack`最后确认状态

4. 客户端接收到报文后，马上返回`ACK = y+2`的`TCP报文` ，并进入`time_wait`等待状态

5. 服务器接收到报文后，进入`close`关闭状态

6. 客户端等待`2MSL报文最大存活时间`没有收到回复后进入`close`关闭状态

   <img src="https://img-blog.csdn.net/20180314225552827?watermark/2/text/Ly9ibG9nLmNzZG4ubmV0L2NvbnN0YW50aW5f/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" style="zoom:60%;" />

## **状态码**

**100:服务器接受请求，提示客户端继续发送请求**

**101:协议更换**

**200:请求成功服务器返回资源**

> **201:请求成功，服务器成功创建资源**

**202:请求成功，但服务器未修改内容**

**203:未经授权的请求，请求成功**

**204:请求成功，服务器不返回内容**

**205:请求成功，服务器通知客户端修改页面**

**206:请求成功，服务器返回部分内容**

> **304:访问内容未修改**

**305:访问内容需要代理**

**307:重定向**

**400:请求路径无法识别**

**401:客户端发送的请求内容与服务器要求不一致**

> **402:请求需要验证**

**403:服务器拒绝访问**

**404:请求资源不存在**

**500:服务器内部错误**

**501:服务器不存在该功能**

**502:网关错误**

**503:网络请求阻塞，服务器拒绝访问**

**504:网关请求超时**

**505:不支持的 HTTP 协议版本**

## **HTTP 请求体的内容:**

- `Accept`:可接受的响应类型
- `Accept-Encoding`:可接受的编码形式
- `Accept-Charset`:可接受的字符集
- `Accept-Language`:可接受的语言列表
- `Authorization`:用户授权信息
- `Cookie`:用户登录信息
- `Content-Type`:请求体的 MIME 类型

## **Cookie、localStorage 和 sessionStorage 的区别**

- `Cookie`
  1.  存放于客户端，且设置期限之前都有效，即使浏览器关闭也有效
  2.  存放用户的登录信息，用户行为等
  3.  存储大小仅有 4k
- `localStorage`
  1.  存放于客户端，且始终有效，浏览器关闭也有效
  2.  存储大小为 5M
- `sessionStorage`
  1.  存放于客户端，仅在浏览器关闭前有效
  2.  存储大小为 5M

## **Cookie、localStorage 和 sessionStorage 的相同点**

> 都是同源存储，在同源窗口中共享

## **Cookie 和 Session**

> `Session`是保存在服务器中的数据结构，`Cookie`是存放于客户端的字节信息
>
> `Session`需要通过`Cookie`中的`SessionId`认证后获取
>
> `Session`用来跟踪用户的状态，如购物车、订单等，`Cookie`保存用户的登录信息和行为信息以及`SessionId`

## **Cookie 的属性**

- `name`：Cookie 的名字
- `value`：Cookie 的值
- `Domain`：允许携带 Cookie 的域名
- `path`：允许携带 Cookie 的路径
- `Expire`：一个过期时间点
- `Max-Age`：一个过期时间段，单位是秒，从浏览器接收报文开始计算
- `secure`：是否仅在 https 协议下携带 Cookie
- `httpOnly`：是否不允许脚本操作 Cookie，只允许请求头携带 Cookie
- `sameSite`：包含三个属性，`Strict`、`Lax`和`None`
  1.  `Strict`表示浏览器禁止在第三方网站的请求中携带 Cookie
  2.  `Lax`表示只能在`get提交表单`或`a标签发送get请求`情况下才能携带 Cookie
  3.  `None`表示请求自动携带 Cookie

## **强缓存和协议缓存**

- `强缓存`

  > `强缓存`指在请求头中设置`Expires`或`Cache-Control`控制资源的缓存时间。
  >
  > `Expires`为设置的`某个时间点`，服务器第一次返回信息时会携带`Expires`字段，当下次请求`在这个时间点前`则命中强缓存
  >
  > `Cache-Control`为设置的`一段以秒为单位的生命周期`，当服务器的下一次请求`在这个生命周期内`则命中强缓存

- `协议缓存`
  > 当`本地缓存过期`或`客户端向服务器请求的资源过期`时，则进行`协议缓存`
  >
  > `Last-Modified-Since`判断资源在请求期间是否被修改过，浏览器在请求时将`Last-Modified-Since`放置于请求头，由服务器对比存储资源的`Last-Modified`和`Last-Modified-Since`是否相同，如果相同则返回`304`状态码，同时浏览器从缓存取出资源；如果修改过则返回新的`Last-Modified`和新的资源
  >
  > `ETag`判断资源是否被修改过。`ETag`为资源的唯一标识，浏览器在请求时将资源的`ETag`作为`If-None-Match`发送给服务器，，服务器匹配`If-None-Match`是否和当前资源的`ETag`相同，如果相同则返回`304`，不相同则返回新的资源，新的资源中包含新的`ETag`

## **三种刷新对 http 缓存的影响**

- `正常操作(手动输入URL、跳转链接、前进后退等)`：`检查强缓存`，不匹配再进行协议缓存

- `手动刷新(F5、地址回车等)`：`跳过强缓存`直接向服务器检查协议缓存，命中则`返回304`

- `强制刷新(ctrl + f5)`：直接请求新资源

## **HTTP 如何处理表单提交**

> 在 HTTP 中，主要有两种表单提交方式，主要体现在两种不同的`Content-Type`：
>
> - `application/x-www-form-urlencoded` 对于`application/x-www-form-urlencoded`格式的表单内容，有如下特点：
>
>   1.  其中的数据会被编码成以`&`分割的键值对
>
>   2.  字符串以 URL 编码形式编码
>       ```js
>       // 封装过程：{a:1, b:2} => a=1&b=2，如下格式
>       'a%3D1%26b%3D2'
>       ```
>
> - `multiple/form-data`
>
>   1.  请求头中的`Content-Type`包含`boundary`，且`boundary`的值由浏览器默认指定
>
>   2.  数据被分为多个部分，且每个部分都有分隔符分隔，每部分都有`HTTP头部描述子包体`，如`Content-Type`
>
> **一般处理图片使用`multiple/form-data`，避免不必要的 URL 转码**

# 浏览器

## **重排和重绘的区别**

- `重排` : 页面中`字体大小`、`容器大小`、`容器位移`等都会触发浏览器重排，将整个页面重新排布渲染

- `重绘` : 页面中的`容器外观`发生改变会触发浏览器`对该容器进行重绘`，并不会影响整个页面

## **如何触发重排和重绘**

- `删除、添加或更新一个DOM节点` -> 重排和重绘

- `使一个DOM节点脱离文档流` -> 重排和重绘

- `display:none` -> 重排和重绘

- `visibility:hidden` -> 重绘

## **避免重排和重绘**

- 集中改变样式，尽量避免逐条修改样式

- 动画元素采用`position`的`absolute`或`fixed`，需要修改内容时就不会触发重排

- 尽可能只修改`position`为`absolute`或`fixed`的元素，避免影响其他元素

# JS

## **对 JS 的认知**

> `JS`是一门弱类型语言，在创建变量的时候并不需要为变量确认一个`准确的类型`，因此变量可以在后续的使用中被赋值不同类型的数据

## **JS 的数据类型（分`原始类型`和`对象类型`）**

- `原始类型` : `Number`、`String`、`Boolean`、`Undefined`、`Null`、`Symbol`、`Bigint`

- `对象类型` : `Object`

## **ES6 的特性**

- 新增了`let`和`const`

- 可以使用解构方法对`对象`和`数组`进行解构

- 为`Array.prototype`添加了`map`、`reduce`、`filter`、`sort`、`every`等遍历数组的方法

- 新增了`Set`和`Map`数据结构

- 新增了`Promise`对象解决异步问题

- 新增了`import`和`export`解决 JS 模块化的问题

## **var、let 和 const**

- `var` :

  1.  在全局作用域中创建的变量会被提升为`全局变量`

  2.  相同名字的变量被重新声明时不会报错

  3.  允许在声明前使用变量

- `let和const`的相同之处 :

  1.  即使在全局作用域中声明也不会提升为全局变量

  2.  拥有`暂时性死区`无法在声明先使用变量

  3.  当相同名字的变量被重复声明时`报错`

  4.  拥有自己的独立作用域(具体表现为`for结合setTimeout`)

- `let和const`的不同之处 :

  1.  当变量的值为`原始类型`时，`let`允许修改变量的值，`const`不允许

  2.  当变量的值为`对象类型`时，`let`允许修改变量指向，`const`不允许

  3.  声明变量时，`let`允许赋值为空，`const`不允许

## **变量提升和函数提升**

> `函数提升`要优先于`变量提升`，`函数`会在`变量被创建之前`就已经声明

```js
console.log(fnc) // undefined
var fnc = 'im a fnc'
fnc = function () {
  return 'im true fnc'
}
console.log(fnc()) // im true fnc
```

```js
console.log(fnc) // function fnc()
var fnc = 'ima a fnc'
function fnc() {
  return 'im true fnc'
}
console.log(fnc()) // TypeError
```

```js
console.log(fnc) // function fnc()
var fnc = function () {
  console.log('im final fnc')
}
function fnc() {
  return 'im true fnc'
}
fnc = 'im a fnc'
console.log(fnc()) // TypeError
```

## **JS 的类型检测方案**

- `typeof` : 可用于检测`原始类型(Null除外)`，对于`对象类型` 统一标识为`object`。例外的是，`Null`的类型为`object`，`NaN`的类型为`number`

- `instanceof` : 可用于检测`对象类型`，无法检测`原始类型`，对于`数组`和`对象`能够明确区分

- `object.constructor` : 这种方法通过找出`变量的构造函数`来确定类型

- `Object.prototype.toString().call` : 这种方法通过超出`变量的原型`来确定类型

## **如何区分数组类型**

- `array instanceof Array`

- `Array.isArray`

- `object.constructor`

- `Object.prototype.toString().call`

## **将类数组转换为数组**

- `Array.prototype.slice.call(arrayLike)`

- `Array.prototype.slice.call(arrayLike,0)`

- `Array.prototype.concat.call([],arrayLike)`

- `Array.from(arrayLike)`

## **如何区分 Null**

```js
if (myNull === null) console.log('this is a null')

if (!myNull && typeof myNull !== 'undefined' && myNull !== 0)
  console.log('this is a null')
```

## **如何区分 NaN**

- `isNaN`可以区分`NaN`，但是其他`非Number`类型的变量也会判断为`false`

- `Object.is(myNaN,NaN)`

- `利用NaN不等于自身的特性` :
  ```js
  if (myNaN !== myNaN) console.log('myNaN is NaN')
  ```

## **遍历数组的方法**

- `forin`和`forof`

- `forEach` -> 数组中的`原始类型`变量不可修改，不会返回值

- `map` -> 数组中的每一项都将被`回调函数的返回值`覆盖，返回新数组

- `sort` -> 数组中的每一项都`按照回调函数的返回值`进行排序，`正数则按升序`，`负数则按降序`，直接改变原数组

- `every` -> 如果数组的`每一项`经过回调函数都返回 true，则`返回true`，否则`返回false`

- `some` -> 如果数组的`其中一项`经过回调函数返回 true，则`返回true`，否则`返回false`

- `reduce` -> 使用类似`双指针的形式`遍历数组，如果设置了`pre值`，则最终结果返回`最后的pre值`，否则返回最后一次回调函数的结果

- `filter`->通过回调函数返回的`boolean`值判断是否筛选出该项，返回一个新的数组

## **数组去重**

- `使用Set的唯一值特性` :

  ```js
  let arr = [1, 2, 3, 1, 1, 1, 2]
  arr = [...new Set(arr)]
  ```

- `reduce遍历数组` :

  ```js
  let arr = [1, 2, 3, 1, 1, 1, 2]
  arr.reduce((pre, next) => {
    if (pre.indexOf(next) == -1) pre.push(next)
    return pre
  }, [])
  ```

- `filter筛选` :
  ```js
  let arr = [1, 2, 3, 1, 1, 1, 2]
  arr.filter((item, index) => {
    return arr.indexOf(item) === index
  })
  ```

## **作用域和作用域链**

> JS 的作用域是静态的，当函数和变量被声明时，他们的作用域就已经被确定。
>
> `作用域`规定了当前部分代码对于变量的访问权限，`作用域链`就指代码通过逐层查找可用变量时的层级关系
>
> [作用域文章](https://github.com/mqyqingfeng/Blog/issues/3)
>
> 下面两个例子的返回结果都是`local scope`，说明了 JS 的作用域并不会动态改变

```js
// 例子1
let scope = 'global scope'

function showScope() {
  let scope = 'local scope'
  return function show() {
    return scope
  }
  return show()
}
showScope()

// 例子2
let scope = 'global scope'

function showScope() {
  let scope = 'local scope'
  return function show() {
    return scope
  }
  return show
}
showScope()()
```

## **垃圾回收机制**

- `引用计数法` : 当一个值被对象引用时，它的`引用计数 + 1`，而引用减少时，它的`引用计数 - 1`。当它的`引用计数 == 0`时，则表示不再被引用而被系统回收内存

## **闭包**

> 指有权访问另一个函数作用域中变量的函数

## **this 的五种指向情况**

- `全局调用普通函数` : 指向`全局作用域window`

- `对象调用普通函数` : 指向`调用函数的对象`

- `箭头函数` : 固定指向`声明时的作用域`

- `apply、call和bind` : 指向`方法绑定的作用域`

- `构造函数` : 指向创建出来的对象

## **call、apply 和 bind 的使用和区别**

- `call(this,arg1,arg2...)` : `this`为需要指向的作用域，`args`为传入方法的参数，必须是用逗号分开的单一参数

- `apply(this,[...args])` : `this`为需要指向的作用域，`[...args]`为传入方法的参数，必须是数组

## **手写 call、apply 和 bind**

- `call` :

  ```js
  Function.prototype.myCall = function (context, ...args) {
    const _this = context == undefined ? window : Object(context) // 如果有传this就用Object改造为对象
    const key = Symbol() // 防止key值重复
    _this[key] = this // 绑定作用域
    const result = _this[key](...args)
    delete _this[key]
    return result
  }
  ```

- `apply` :

  ```js
  Function.prototype.myApply = function (context, args = []) {
    const _this = context == undefined ? window : Object(context) // 如果有传this就用Object改造为对象
    const key = Symbol() // 防止key值重复
    _this[key] = this // 绑定作用域
    const result = _this[key](...args)
    delete _this[key]
    return result
  }
  ```

- `bind` :
  ```js
  Function.prototype.myBind = function (context, ...args) {
    const _this = this
    function newFnc(...rest) {
      _this.call(context, ...args, ...rest)
    }
    if (_this.prototype) {
      // 防止传入的函数是箭头函数没有原型
      // 假如方法内容涉及原型链，需要绑定原方法的原型
      newFnc.prototype = Object.create(_this.prototype)
    }
    return newFnc
  }
  ```

## **原型和原型链**

- `原型` : JS 的对象都是通过`构造函数`创建的，在创建的过程中会把`构造函数的prototype`作为预设属性赋值给`创造出来的对象`。其中`函数对象`的原型为`prototype`，`数组等对象`的原型为`__proto__`

- `原型链` : 当对象查找一个属性时，首先会`遍历自身的所有key`，如果没有符合的属性就会查找`自身的__proto__`，然后逐层查找，这个查找的层级就是`原型链`

## **new 关键字的执行**

1. 首先会创建出一个`空对象`

2. 根据原型链，将`空对象的__proto__`绑定为`构造函数的prototype`

3. `构造函数的this`指向`空对象`，并将属性赋值到`空对象`

4. 判断对象是否为`引用类型`，是则直接返回，如果是`值类型`则返回值

```js
// 手写new
function myNew(constructor, ...args) {
  // 构造函数类型合法判断
  if (typeof constructor !== 'function') {
    throw new Error('constructor must be a function')
  }
  // 新建空对象实例
  let obj = new Object()
  // 将构造函数的原型绑定到新创的对象实例上
  obj.__proto__ = Object.create(constructor.prototype)
  // 调用构造函数并判断返回值
  let res = constructor.apply(obj, args)
  let isObject = typeof res === 'object' && res !== null
  let isFunction = typeof res === 'function'
  // 如果有返回值且返回值是对象类型，那么就将它作为返回值，否则就返回之前新建的对象
  return isObject || isFunction ? res : obj
}
```

## **delete 关键字**

> 不允许删除使用`在全局作用域使用var定义的变量`，但允许删除`eval('var a=1')形式定义的变量`和`不使用关键字(var、let、const)命名的全局变量`

## **Set 和 Map**

- `Set` : `Set`创造的对象属性都是唯一的`不允许重复`，`add`时会进行隐式转换，也就是说`Set.add(1) Set.add('1')后Set的值只有'1'`，`delete`不会，但`只能存储值`而不是键值对

- `Map` : `Map`创造的对象属性可以是任意类型，而且不会进行隐式转换

- **共同点** : 都能通过迭代器遍历

## **Symbol 的作用**

- `Symbol` :

  1. `Symbol()` : `Symbol()`创建的对象都是唯一的，即使值相同也不会被覆盖，而且存放于`全局Symbol表`中

  ```js
  let symbol1 = Symbol(1)
  let symbol2 = Symbol(1)
  console.log(symbol1 == symbol2) // false
  ```

  2. `Symbol.for(key)` : `Symbol.for(key)`并不会马上创建一个`Symbol对象`，而是先遍历`全局Symbol表`查找是否存在相同`key`的 Symbol 对象，如果有则返回该`Symbol对象`，没有则创建`Symbol(key)`

  > 特别的，`Symbol(1)!==Symbol.for(1)`

## **事件循环(eventLoop)**

> JS 是单线程语言，因此`在一个时间点只能进行一项任务`，但是可以将任务`分为多个队列进行`。执行队列顺序为：`主线` -> `process.nextTick` -> `微任务` -> `宏任务`
>
> `主线` : 在这里执行所有的同步任务，如`渲染`、`同步函数执行`等
>
> `process.nextTick` : 当执行完`所有主线任务`时被调用，时间点早于`微任务队列`
>
> `微任务` : 包括`Promise.then`、`async\await`等，在`eventLoop结束前`执行
>
> `宏任务` : 包括`script(整体代码)`、`setTimeout`、`Ajax`等，在`eventLoop结束后`执行

## **setTimeout、Promise 和 async\await 的区别**

- `setTimeout` : 属于`宏任务队列`，只有当主线任务和微任务都执行完后才会执行(并且执行时也需要等待相应的`delay`)

- `Promise` : `Promise`内部函数属于`同步任务`，`then`回调函数属于`微任务`

- `async\await` : `async\await`是基于`Promise`实现的异步解决方法，属于`微任务`，只有当`await`的返回值为`resolve`时函数才会继续向下执行，并且需要在`async`函数结尾用`catch`捕获错误才能执行函数

## **实现 Promise.all**

> 思路 :
>
> 1. 首先判断传入的参数是否为`可遍历对象`，如果不是则直接`reject`
>
> 2. 判断是否为`空数组`，如果是则直接`resolve([])`
>
> 3. `遍历promises`并将执行结果存进`result`，当`promises`全部`resolve执行`完毕则返回`resolve(result数组)`，当有一个出现错误则直接退出循环返回`reject(错误)`结束`Promise.all`函数

```js
Promise.myAll = function (promises) {
  return new Promise((resolve, reject) => {
    if (typeof promises[Symbol.iterator] !== 'function') {
      reject('promises typeError!')
    }
    if (promises.length == 0) {
      resolve([])
    } else {
      let result = []
      let count = 0
      const length = promises.length
      for (let i = 0; i < length; i++) {
        Promise.resolve(promises[i])
          .then(value => {
            result[i] = value
            if (++count === length) {
              resolve(result)
            }
          })
          .catch(error => {
            reject(error)
          })
      }
    }
  })
}
```

## **防抖和节流**

- `防抖` :

  ```js
  /**
   * @description 防抖的立即执行版本
   */
  function debounce(fnc, delay, immediate) {
    let timer = null
    return function () {
      let args = arguments,
        _this = this
      if (timer) clearTimeout(timer)
      if (immediate) {
        let callNow = !timer // callNew立即执行的时机为timer=null时
        timer = setTimeout(() => {
          timer = null
        }, delay)
        if (callNow) fnc.call(_this, ...args)
      } else {
        timer = setTimeout(() => {
          fnc.call(_this, ...args)
        }, delay)
      }
    }
  }
  ```

- `节流` :
  ```js
  function throttle(fnc, delay) {
    let timer = null
    return function () {
      let _this = this,
        args = arguments
      if (!timer) {
        setTimeout(() => {
          fnc.call(_this, ...args)
          timer = null
        }, delay)
      }
    }
  }
  ```

## **深拷贝**

```js
function deepClone(target) {
  if (typeof target !== 'object') {
    console.log('type must be object')
    return
  }
  let result = target instanceof Array ? [] : {}
  for (const key in target) {
    if (Object.hasOwnProperty.call(target, key)) {
      const element = target[key]
      result[key] = typeof element === 'object' ? deepClone(element) : element
    }
  }
  return result
}
```

## **柯里化**

> 思路 : 当函数`传参不够`时返回`柯里化函数`，`柯里化函数`允许继续传参并将参数存储，`传参足够`时执行函数

```js
function myCurry(fnc, ...args) {
  let argsLength = fnc.length
  args = args || []
  return function (...rest) {
    let _args = [...args, ...rest]
    return _args.length <= argsLength
      ? myCurry(fnc, ..._args)
      : fnc.call(this, ..._args)
  }
}
```

## **Compose**

```js
const compose = function (...args) {
  const init = args.pop()
  return function (...arg) {
    return args.reverse().reduce(function (sequence, func) {
      return sequence.then(function (result) {
        return func.call(null, result)
      })
    }, Promise.resolve(init.apply(null, arg)))
  }
}
```

## **Pipe**

```js
const pipe = function (...args) {
  const init = args.shift()
  return function (...arg) {
    return args.reduce(function (sequence, func) {
      return sequence.then(function (result) {
        return func.call(null, result)
      })
    }, Promise.resolve(init.apply(null, arg)))
  }
}
```

## **手写 reduce**

```js
Array.prototype.myReduce(callback, initData){
     const arr = this
     let total = initData || arr[0]
     for (let index = initData ? 0 : 1; index < arr.length; index++) {
          total =  callback(total, arr[index], arr)
     }
     return total
}
```

## **手写 instanceof**

```js
function myInstanceof(target) {
  if (
    !['object', 'function'].includes(typeof source) ||
    typeof target !== 'function'
  ) {
    return false
  }
  let proto = Object.getPrototypeOf(source)
  const prototype = target.prototype
  while (true) {
    if (proto === null) return false
    if (proto === prototype) return true
    proto = Object.getPrototypeOf(proto)
  }
}
```

## **数组扁平化**

```js
function flatArr(arr) {
  return arr.reduce((pre, next) => {
    return pre.concat(next instanceof Array ? flatArr(next) : next)
  }, [])
}
```

## **冒泡排序**

```js
function bubble(targetArr, sortType = 'bigToSmall') {
  for (let i = 0; i < targetArr.length - 1; i++) {
    for (let j = 0; j < targetArr.length - 1 - i; j++) {
      if (
        sortType == 'bigToSmall'
          ? targetArr[j] < targetArr[j + 1]
          : targetArr[j] > targetArr[j + 1]
      ) {
        let item = targetArr[j]
        targetArr[j] = targetArr[j + 1]
        targetArr[j + 1] = item
      }
    }
  }
}
```

## **斐波那契数列**

```js
1、 递归法
function fibonacciMemorization(index) {
  const memo = [0, 1]
  const fibonacci = n => {
    if (memo[n] !== null) return memo[n]
    const result = fibonacci(n - 1) + fibonacci(n - 2)
    memo[n] = result
    return result
  }
  return fibonacci(index)
}

2、 循环法
function fibonacciMemorization(n) {
  if (n < 2) {
    return n
  }
  let p = 0
  let q = 0
  let r = 1
  for (let i = 2; i <= n; ++i) {
    p = q
    q = r
    r = p + q
  }
  return r
}
```

# CSS

## **选择器的优先级**

> `!important` > `行内样式` > `id选择器` > `class|属性|伪类选择器` > `标签|伪元素选择器` > `关系|通配符选择器`

## **position 的值和区别**

- `static` : 默认按文档流渲染

- `relative` : 元素按文档流渲染，`top|left|right|bottom`值可以使元素基于当前位置进行偏移，但元素的占位不会改变

- `absolute` : 元素脱离文档流，如果父元素设置了`position:relative`，则`top|left|right|bottom`值基于父元素生效，否则基于当前窗口生效

- `fixed` : 元素脱离文档流，根据当前窗口进行定位，并且不会随着页面滚动改变位置

## **盒子模型**

> `盒模型`由`内容`、`padding`、`border`、`margin`组成
>
> - `标准盒模型` : `盒子宽度 = 内容宽度`
>
> - `怪异盒模型` : `盒子宽度 = 内容宽度 + 水平padding + border宽度`

## **BFC（意义和如何形成）**

> `BFC`是一个独立的元素，其内部元素按照文档流进行渲染，且不会影响外部元素的排布 `BFC`通常用来解决`元素之间margin重合`以及`盒子高度塌陷`问题
>
> - `overflow除了visible之外的属性`
>
> - `父盒子的after伪元素设置清除浮动`
>
> - `position : absolute`

## **圣杯布局**

```html
<div class="container">
  <div class="main"></div>
  <div class="left"></div>
  <div class="right"></div>
</div>

<style>
  .container {
    overflow: hidden;
    background: red;
    padding: 0 200px 0 180px;
  }
  .main,
  .left,
  .right {
    float: left;
  }
  .main {
    background: lightgreen;
  }
  .left {
    width: 180px;
    height: 300px;
    position: relative;
    left: -180px;
    margin-left: -100%;
  }
  .right {
    width: 200px;
    height: 300px;
    position: relative;
    right: -200px;
    margin-left: -200px;
  }
</style>
```

## **双飞翼布局**

```html
<div class="container">
  <div class="main">
    <div>main</div>
  </div>
  <div class="left"></div>
  <div class="right"></div>
</div>

<style>
  .container {
    overflow: hidden;
  }
  .container div {
    float: left;
  }
  .main {
    margin: 0 200px 0 180px;
    background: red;
  }
  .left {
    width: 180px;
    height: 300px;
    margin-left: -100%;
  }
  .right {
    width: 200px;
    height: 300px;
    margin-left: -200px;
  }
</style>
```

## **元素水平垂直居中**

1. `元素宽高不定` :

   ```CSS
   .method1{
     position:absolute;
     top:50%;
     left:50%;
     transform:translate(-50%,-50%)
   }

   .method2{
     display:flex;
     justify-content:center;
     align-items:center;
   }

   .method3{
     .container{
          display:inline-block;
          line-height:600px;
          text-align:center;
     }
     .content{
          display:inline-block;
          vertical-align:middle;
          line-height:initial;
     }
   }

   .method4{
     .container{
          display:table-cell;
          vertical-align:middle;
          text-align:center;
     }
     .content{
          display:inline-block;
     }
   }
   ```

2. `元素定宽高` :
   ```CSS
   .box{
     width:100px;
     height:100px;
   }
   .method1{
     position:absolute;
     top:0;
     left:0;
     right:0;
     bottom:0;
     margin:auto;
   }
   ```

## **0.5px 的线**

```css
.line-half {
  height: 1px;
  transform: scaleY(0.5);
  transform-origin: 50% 100%; // 设置形变开始的位置，这里设为上边的中点
}
```

## **隐藏元素**

- `display:none` : 将元素从文档流中删除

- `visibility:hidden` : 将元素隐藏，不会删除元素，保留元素占位，不能触发点击事件

- `opacity:0` : 将元素透明度设为 0，可以触发点击事件

## **移动端适配**

-`rem` : 设置文档的根`font-size`，然后将`px`换为`rem`

-`postCss` : 将`px`转换为`vw`和`vh`

## **清除浮动**

- `clear:both`
- `overflow除了visible之外的属性`
- `position:absolute`

## **单行文本和多行文本换行省略**

- `单行文本` :
  ```css
  .singleLineOverflowNoWrap {
    width: 100px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  ```
- `多行文本` :
  ```css
  .multipleLineOverflowHidden {
    width: 100px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  ```

## **如何获取 input 中的内容**

```html
<!-- 方法1 getElementById('input') -->
<input id="input" />
<script>
  const input = document.getElementById('input')
  alert(input.value)
</script>

<!-- 方法2 getElementByTagName('input') -->
<input />
<script>
  const input = document.getElementByTagName('input')
  alert(input.value)
</script>

<!-- 方法3 querySelector('#input') -->
<input id="input" />
<script>
  const input = document.querySelector('#input')
  alert(input.value)
</script>

<!-- 方法4 使用form + name获取input -->
<form name="myForm">
  <input name="input" />
</form>
<script>
  const value = myForm.input.value
  alert(value)
</script>
```

# Vue

## **Vue 如何实现响应式**

> `响应式系统`需要经过`Compiler解析指令`、`数据劫持`、`调用Observer监听者`、`创建Watcher订阅者`、`视图层更新`、`订阅队列dep添加`的步骤

1.  以`Vue2`为例，`Compiler`首先从`DOM`中解析出带有`v-bind`属性的 DOM 节点，然后将属性的值交由`数据劫持`处理。
2.  `Vue2`的数据劫持通过`Object.defineProperty`实现，改写对象的`setter`，将这个对象交由`Observer监听者`和`Watcher订阅者`处理。
3.  `Observer监听者`通过修改该属性的`getter`将一个`Watcher订阅者`添加到`dep订阅队列`中，修改`setter`当属性的值有变化时通知`Watcher`更新视图
4.  `Watcher订阅者`接收到来自`Observer`的更新提示后将最新的数据通过`render函数`生成一个`新的虚拟DOM`
5.  然后通过`patch函数`对比`新的虚拟DOM`和`旧的虚拟DOM`，并替换不同的部分
6.  最终得到的结果再交由渲染层渲染

## **简述 MVVM**

> `M` : 代表`Model`数据层
>
> `V` : 代表`View`视图层
>
> `VM` : 代表`ViewModel`中间处理对象，是由开发人员主导的对`M`数据层数据的进一步封装
>
> `MVVM`的`M`数据层和`V`视图层是完全分开的，他们之间的通信靠`VM`进行，且开发人员无法直接操作`V`视图层

## **什么是虚拟 DOM？优点？缺点？**

> 为了减少`直接操作DOM节点`带来的资源消耗，`Vue`选择将页面的 DOM 树虚拟化为`JavaScript对象`，然后通过`patch算法`计算需要替换的 DOM 节点并将其替换，最后通过`render函数`将虚拟 DOM 渲染为真实 DOM
>
> 优点：
>
> 1. `虚拟DOM`可以减少直接操作 DOM 的次数，例如一次性添加大批量数据、修改大批量数据中的部分内容等
>
> 2. `跨平台性`，作为一个 JS 对象，虚拟 DOM 可以兼容任何平台
>
> 缺点：
>
> 1. 需要额外地创建`h()函数`，以及需要打包工具插件支持编译

## **Vue 生命周期(分为 Vue2 和 Vue3)**

- `Vue2`

  1. `beforeCreated`
  2. `created`
  3. `beforeMount`
  4. `mounted`
  5. `beforeUpdate`
  6. `updated`
  7. `beforeDestroy`
  8. `destroyed`
  9. `activated`
  10. `deactivated`
  11. `errorCaptured`

- `Vue3`
  1. `beforeCreated和onCreated`合并为`setup`
  2. `beforeMount`
  3. `mounted`
  4. `beforeUpdate`
  5. `updated`
  6. `beforeUnmount`
  7. `unmounted`
  8. `activated`
  9. `deactivated`
  10. `errorCaptured`

## **未完成：Vue 的初始化过程做了什么(难)**

## **Vue2 和 Vue3 的区别**

1. `Vue2`中的`beforeCreated`和`created`生命周期在`Vue3`中被合并于`setup函数`的执行中
2. `compositionAPI`
3. `Vue3`支持`hook`
4. `Vue3`的`<template>标签`中移除了只允许有一个根标签的规定
5. `Vue3`添加了`suspense`、`teleport`等内置组件
6. `Vue2`在编译的过程中会直接打包**全部的依赖**，而`Vue3`只会打包**模块中被引用的依赖**

## **Vue2 如何实现响应式数组**

> `Vue2`重写了`push`、`map`等数组遍历方法，使数组在使用这些函数进行遍历修改时具有响应式

## **computed 和 watch**

- `computed` : 每当需要`computed`计算的变量被调用时，`computed`函数就会动态地执行一次回调函数并返回结果作为变量的值。但`computed`回调函数应该是同步的，不应涉及异步请求，而且`使用computed计算得出的值`不应该被修改

- `watch` : 当`watch`监听的变量发生改变时，`watch函数`会自动收集变量的`新值`和`旧值`作为回调函数的参数

## **组件中的 data 为什么是函数形式**

> 由于每一个组件都是一个`实例对象`，如果`data`使用的是`对象形式`，则同一个组件的所有 data 都将指向相同的地址，修改其中一个 data 就会牵动其他 data 同步修改。
>
> 使用`函数形式`就能确保每次返回的`data`都指向一个新的地址

## **为什么 v-if 和 v-for 不建议一起使用**

```js
// 案例1
v-for="user in userList" v-if="user.id"
```

> `Vue2`中，`v-for`的优先级大于`v-if`，导致`v-for`先渲染完成一次，然后再遍历一次数组并`v-if`进行判断然后重新渲染，资源消耗很大
>
> `Vue3`中，`v-if`的优先级大于`v-for`，导致在`v-if`执行时该属性还未被初始化而报错
>
> `解决方法` : 使用`computed + filter函数`对剔除不需要渲染的内容

```js
// 案例2
v-for="user in userList" v-if="shouldShowUserList"
```

> `Vue2`中和`案例1`一样，会造成大量资源消耗
>
> `Vue3`中这样使用不会报错，但官方不推荐这样做
>
> `解决方法` : 嵌套一层`<template v-if="shouldShowUserList">`进行判断

## **v-if 和 v-show 的区别**

- `v-if` : 直接操作`虚拟DOM`控制是否允许渲染该 DOM，如果判断为`true`则直接将`DOM节点`从 DOM 树上删除

- `v-show` : 使用`display:none`，如果判断为`true`则将`DOM节点`隐藏

## **如何实现 v-model**

```html
<!-- 使用 -->
<input v-model="userName" />

<!-- 原理 -->
<input :value="userName" @input="userName = $event.target.value" />
```

## **nextTick 的作用**

> `nextTick`被调用于`主线任务`执行完毕后，也就是`渲染`结束后的回调函数，在`onMounted函数中调用nextTick可以操作DOM对象`，属于**异步方法**

## **Vue data 中的某个属性值发生改变时，视图会立即同步更新吗**

> 不会同步更新
>
> 当`Observer`通知被添加到订阅队列的`Watcher`需要更新视图后，`Vue`会先将`需要更新的Watcher`收集到一个队列中，等待下一次`主线任务完成后的nextTick`在进行视图更新

## **key 的作用**

> 帮助`diff算法`能够更准确地定位到需要被替换的`DOM节点`

## **组件通信方式**

- `v-bind` : 单向传递`props`，子组件不允许修改状态

- `v-model` : 单向传递`props`,子组件不允许修改状态，但可以通过`emit('update:value',data)`的形式通知父组件对变量值进行修改

- `provide/inject` : 应用于多层组件的传参方式，不建议应用于正常开发，但开发组件库可以使用

- `$event/$on` : 全局发布订阅模式，`Vue3`中移除

  ```js
  // Vue3 EventBus
  class eventBus {
    static obj
    constructor(event) {
      this.callbackId = 0
      this.init()
    }
    init() {
      if (!eventBus.obj) {
        eventBus.obj = {}
        this.eventObj = eventBus.obj
        return
      }
      this.eventObj = eventBus.obj
    }
    $emit(fncName, callback) {
      if (!this.list[fncName]) {
        this.list[fncName] = []
      }
      this.list[fncName][this.callbackId] = callback
      this.callbackId += 1
      return this.callbackId
    }

    $on(fncName, ...args) {
      this.list[fncName].forEach(fnc => {
        fnc(...args)
      })
    }
    $off(fncName, callbackId) {
      if (this.list[fncName] && !callbackId) {
        delete this.list[fncName]
      } else if (this.list[fncName] && callbackId) {
        delete this.list[fncName][callbackId]
        if (!Object.keys(this.list[fncName]).length) {
          delete this.list[fncName]
        }
      }
    }
  }
  ```

- `Vuex`、`pinia`

- `$attrs`和`$listener`

## **什么是插槽？插槽的分类**

> 插槽允许在组件中留出一个允许插入`DOM元素`的占位，开发者可以在插槽中添加需要的`DOM元素` 分为`默认插槽`、`具名插槽`和`作用域插槽`

## **什么是动态组件？如何缓存动态组件**

> `动态组件`指在多个组件能够在同一个位置进行动态切换，使用`:is`这个`Attribute`实现
>
> 使用`<keep-alive>标签`则可以缓存动态组件
>
> ```html
> <!-- Vue3中不需要注册组件，Vue2中需要 -->
> <keep-alive>
>   <component :is="activeComponentName" />
> </keep-alive>
>
> <script>
>   let myComponent1 = {
>     template: `<div>myComponent1</div>`
>   }
>   let myComponent2 = {
>     template: `<div>myComponent2</div>`
>   }
>   let activeComponentName = 'myComponent1'
> </script>
> ```

## **父组件如何监听子组件的生命周期**

> `Vue2` : 通过`@hook:mounted`监听
>
> `Vue3` : 通过`@vnode-mounted`监听

## **Vuex 的使用和使用场景**

> 当有`全局组件状态`或`token`等状态需要存储时`Vuex`就派上用场
>
> `Vuex`包含了四个属性 :
>
> 1. `state` : 存储的状态
>
> 1. `getter` : 类似`computed`
>
> 1. `action` : 处理异步请求，不进行状态的修改
>
> 1. `mutation` : 所有对状态的修改操作
>
> 1. `modules` : 将其他`Vuex`状态模块合并

## **Vuex 和 localStorage 的区别**

> `Vuex`是存储在`内存`中的对象，在应用被关闭时清空(使用插件可实现`Vuex持久化`，将状态存至`localStorage`或其他本地文件)
>
> `localStorage`是本地的存储文件，即使应用被关闭也不会清空

## **Vuex 模块化**

> 把每个模块文件都定义好后导出，然后引入到`根store文件`中，用`modules属性`将所有模块合并

## **Vuex 外部引入 state、actions 和 mutations**

> 使用`mapSate`、`mapActions`和`mapMutations`获取

## **Vue-router 的模式和守卫**

> `Vue-router`的模式包括 : `hash`和`history`
>
> `hash`切换页面不会触发重新请求，由于`#`在浏览器中属于是`锚点的作用`，虽然改变了 URL 但是并不会被添加进 HTTP 请求中，因此切换页面也只是切换了`锚点的位置`触发了重新渲染
>
> `history`切换页面时会直接修改 URL，浏览器会重新请求页面(这种方法需要后端配合进行)

- `全局守卫` :

  1. `全局守卫 - beforeEach` : 在`每次导航前`触发

  2. `全局解析守卫 - beforeResolve` : 在路由跳转前，所有`组件内守卫`和`异步路由组件`解析后触发，`每次导航都触发`

  3. `全局后置守卫 - afterEach` : 在`每次导航后`触发

- `路由守卫(在路由中配置)` :

  1. `beforeEnter` : 只有在`进入该路由`时触发，触发时机紧随`beforeEach`，且只有进入到`不同路由`时才触发，不包括`query`、`params`或`hash`改变

- `组件守卫`

  1. `beforeRouteEnter` : 只有在进入组件前才调用，在`beforeEach`和`beforeEnter`之后，`beforeResolve`和`afterEach`前触发(但此时还无法直接获得前往组件的`vm实例对象`，可以通过`next(vm)`获得)

  2. `beforeRouteUpdate` : 当前路由改变，但是组件被复用时调用，可以访问组件的`vm实例对象`

  3. `beforeRouteLeave` : 在路由离开当前渲染组件的路由前调用，可以调用组件的`vm实例对象`

## **Vue-router params 和 query 的区别**

- `用法` :

  1. `传参` : `params`和`query`都使用对象传递

  ```js
  // query可以配合path使用
  router.push({ path: '/user', query: { name: 'hqh' } })
  // params只能配合name使用，如果配合path则会使params丢失
  router.push({ name: '/user', query: { name: 'hqh' } })
  ```

  2. `使用` : `params`使用`route.params.name`获取，`query`使用`route.query.name`获取

  3. `query`刷新页面的时候不会清除参数，`params`刷新页面则清除参数

  4. `query`的参数会显示在 URL 中，`params`参数不显示

## **Vue 应用初始化闪屏问题**

1. `v-cloak` : 解决初始化时，变量还未加载而显示的`{{message}}`内容

2. `添加loading`

3. `骨架屏`

4. `Vue3`的`Suspense`异步加载组件

## **Vue 的 diff 语法**

> 执行逻辑：
>
> 1. 当`组件内数据发生变化时`，触发`setter`通过`Notify`通知`Watcher`数据被修改
>
> 2. 然后`Watcher`执行`render函数`生成新的`虚拟DOM`
>
> 3. 通过`patch函数`比较`新旧虚拟DOM`得出最小变化后更新视图

## **关于 patch 的 Vue2 和 Vue3 差别**

1. 事件缓存

   > 在`Vue2`中，每个组件的事件都是在调用时才动态生成的，而`Vue3`使用了缓存机制，当组件的事件被缓存时，优先使用缓存事件处理
   >
   > ```html
   > <button @click="handleClick">按钮</button>
   >
   > <script>
   >   export function render(_ctx, _cache, $props, $setup, $data, $options) {
   >     return (
   >       _openBlock(),
   >       _createElementBlock(
   >         'button',
   >         {
   >           onClick:
   >             _cache[0] ||
   >             (_cache[0] = (...args) =>
   >               _ctx.handleClick && _ctx.handleClick(...args))
   >         },
   >         '按钮'
   >       )
   >     )
   >   }
   > </script>
   > ```

2. 静态标记

   > `Vue3`中使用静态标记来标注一些**静态节点**，以此表示该节点不需要进行`patch`比较
   >
   > ```html
   > <div id="app">
   >   <div>沐华</div>
   >   <p>{{ age }}</p>
   > </div>
   >
   > <script>
   >   const _hoisted_1 = { id: 'app' }
   >   const _hoisted_2 = /*#__PURE__*/ _createElementVNode(
   >     'div',
   >     null,
   >     '沐华',
   >     -1 /* 静态标记 */
   >   )
   >
   >   export function render(_ctx, _cache, $props, $setup, $data, $options) {
   >     return (
   >       _openBlock(),
   >       _createElementBlock('div', _hoisted_1, [
   >         _hoisted_2,
   >         _createElementVNode(
   >           'p',
   >           null,
   >           _toDisplayString(_ctx.age),
   >           1 /* 表明为静态节点 */
   >         )
   >       ])
   >     )
   >   }
   > </script>
   > ```

3. 静态复用

   > `Vue2`在判断节点需要更新时，不会判断元素是否为静态元素，而是进行全量更新。`Vue3`则将静态节点存储起来，在更新中不断复用

4. patchKeyedChildren

   > 在 Vue2 里 updateChildren 会进行

   - 头和头比
   - 尾和尾比
   - 头和尾比
   - 尾和头比
   - 都没有命中的对比
     >

   > 在 Vue3 里 patchKeyedChildren 为

   - 头和头比
   - 尾和尾比
   - 基于最长递增子序列进行移动/添加/删除

## **[Vue 的 250 答](https://juejin.cn/post/6844903876231954446#heading-8)**

# 工程化

## **webpack 原理**

1. 从`webpack.config.js`中收集 webpack 的配置参数

2. 上一步得到`compiler配置对象`，然后注册所有插件并监听`webpack生命周期`
3. 从`entry入口文件`开始查找依赖

4. 根据文件类型和`loader配置`对模块进行转换，同时找出模块的依赖进行相同操作

5. 递归解析完毕后，根据`entry配置生成代码块chunk`

6. 输出所有 chunk 到文件系统

## **loader 和 plugin**

- `loader`用于帮助 Webpack 解析非 JS 文件
- `plugin`用于扩展 Webpack 的功能

## **plugin 原理**

> 本质上是一个类，接收一个`compiler对象`，通过监听`webpack生命周期`，在进行到特定生命周期的时候触发钩子函数
>
> 常用 plugin：
>
> 1.  `HotModuleReplacementPlugin` : 启用模块热替换
>
> 2.  `DllPlugin` : 分离打包
>
> 3.  `HtmlWebpackPlugin` : 创建简单 HTML 文件，便于服务器访问

## **loader 原理**

> 本质上是一个类，包含了各类文件格式的解析方式，通过类中的函数对各类文件进行对应格式的解析
>
> 常用 loader：
>
> 1.  babel-loader : 将 ES6 转换为 ES5
>
> 2.  css-loader : 加载 css
>
> 3.  image-loader : 压缩图片

## **Vite 原理**

1. 搭建本地开发服务器
2. 当浏览器向本地服务器发送请求时，编译请求对应的文件，然后返回

## **Vite 的热更新流程**

[Vite 热更新的主要流程](https://juejin.cn/post/7096103959563075597)

# 微信小程序

## **微信小程序原理**

> 本质是`单页面应用`，也是`MVVM模式`，所有页面更新都`通过对数据修改`实现
>
> 功能分为`webView`和`appService`：
>
> 1. `webView`功能为展示视图
>
> 2. `appService`功能为处理业务逻辑、修改数据和接口调用
>
> `webView`和`appService`在`两个线程`中执行，通过`通信层JSBridge`通信，实现 UI 渲染、事件处理等

## **uni-app 如何兼容多平台**

> 采用了类似 C 语言的`注释标记方式`，通过在代码中针对不同平台的不同注释进行兼容处理
>
> - 以`#ifdef`或 `#ifndef` 加 `%PLATFORM%(客户端类型) `开头，以 `#endif` 结尾。
>
> - `#ifdef`：if defined 仅在某平台存在
>
> - `#ifndef`：if not defined 除了某平台均存在
>
> - `%PLATFORM%`：平台名称
>
> - `#endif`：注释结束
>
> [uni-app 跨平台编译](https://blog.csdn.net/yan_dk/article/details/124570183)

## **uni-app 如何运行在多个平台**

> 通过`package.json`中的不同平台编译命令，`调用执行文件`针对不同平台进行代码编译
>
> [uni-app 多端兼容](https://gengms.blog.csdn.net/article/details/108236335)
