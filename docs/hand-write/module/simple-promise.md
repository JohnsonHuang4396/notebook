# ✍️ **简单 Promise**

```js
class MyPromise {
  constructor(executor) {
    this.initValue()
    this.initBind()
    try {
      executor(this.resolve, this.reject)
    } catch (error) {
      this.reject(error)
    }
  }

  initBind() {
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
  }

  initValue() {
    this.PromiseResult = null
    this.PromiseState = 'pending'
    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []
  }

  resolve(value) {
    if (this.PromiseState !== 'pending') return
    this.PromiseState = 'fulfilled'
    this.PromiseResult = value
    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(this.PromiseResult)
    }
  }

  reject(reason) {
    if (this.PromiseState !== 'pending') return
    this.PromiseState = 'rejected'
    this.PromiseResult = reason
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(this.PromiseResult)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : reason => {
            throw reason
          }

    const thenPromise = new MyPromise((resolve, reject) => {
      const resolvePromise = callback => {
        setTimeout(() => {
          try {
            const result = callback(this.PromiseResult)
            if (result === thenPromise) {
              throw 'Returning then is not allowed'
            }
            if (result instanceof MyPromise) {
              result.then(resolve, reject)
            } else {
              resolve(result)
            }
          } catch (error) {
            reject(error)
            throw new Error(error)
          }
        })
      }

      if (this.PromiseState === 'fulfilled') {
        onFulfilled(this.PromiseResult)
      } else if (this.PromiseState === 'rejected') {
        onRejected(this.PromiseResult)
      } else if (this.PromiseState === 'pending') {
        this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled))
        this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected))
      }
    })

    return thenPromise
  }
}
```
