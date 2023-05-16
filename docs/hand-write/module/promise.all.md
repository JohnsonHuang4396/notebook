# ✍️ **Promise.all**

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
