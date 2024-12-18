## ✍️ **柯里化**

> 思路 : 当函数`传参不够`时返回`柯里化函数`，`柯里化函数`允许继续传参并将参数存储，`传参足够`时执行函数

```js
function myCurry(fnc, ...args) {
  let argsLength = fnc.length
  args = args || []
  return function (...rest) {
    let _args = [...args, ...rest]
    return _args.length < argsLength
      ? myCurry(fnc, ..._args)
      : fnc.call(this, ..._args)
  }
}
```
