## ✍️ **冒泡排序**

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
