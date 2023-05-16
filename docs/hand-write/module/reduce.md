## ✍️ **手写 reduce**

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
