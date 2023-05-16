## ✍️ **斐波那契数列**

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
