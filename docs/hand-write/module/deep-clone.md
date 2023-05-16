## ✍️ **深拷贝**

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
