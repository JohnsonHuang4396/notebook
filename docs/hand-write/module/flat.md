## ✍️ **数组扁平化**

```js
function flatArr(arr) {
  return arr.reduce((pre, next) => {
    return pre.concat(next instanceof Array ? flatArr(next) : next)
  }, [])
}
```
