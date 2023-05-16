## ✍️ **手写 instanceof**

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
