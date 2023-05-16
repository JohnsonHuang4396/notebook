## ✍️ **Compose**

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

## ✍️ **Pipe**

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
