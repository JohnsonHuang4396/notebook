## ✍️ **防抖和节流**

- `防抖` :

  ```js
  /**
   * @description 防抖的立即执行版本
   */
  function debounce(fnc, delay, immediate) {
    let timer = null
    return function () {
      let args = arguments,
        _this = this
      if (timer) clearTimeout(timer)
      if (immediate) {
        let callNow = !timer // callNew立即执行的时机为timer=null时
        timer = setTimeout(() => {
          timer = null
        }, delay)
        if (callNow) fnc.call(_this, ...args)
      } else {
        timer = setTimeout(() => {
          fnc.call(_this, ...args)
        }, delay)
      }
    }
  }
  ```

- `节流` :
  ```js
  function throttle(fnc, delay) {
    let timer = null
    return function () {
      let _this = this,
        args = arguments
      if (!timer) {
        setTimeout(() => {
          fnc.call(_this, ...args)
          timer = null
        }, delay)
      }
    }
  }
  ```
