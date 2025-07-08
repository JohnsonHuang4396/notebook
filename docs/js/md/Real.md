# JS 真题解析

## 1. 以下JS程序输出什么
```js
val = 'smtg'
console.log('Value is' + (val === 'smtg') ? 'Something' : 'Nothing')
```

> **输出 `'Something'`**
> `+`的优先级高于`?`，因此先执行`'Value is' + (val === 'smtg')`得到`'Valuesmtg'`

## 2. 以下JS程序输出什么
```js
let method
let obj = {
  go() {
    console.log(this)
  }
}
(obj.go)()
(method = obj.go)()
(obj.go || obj.stop)()
```

> **输出`{go:f}、window、window`**
> (obj.go)(): `this`指向obj.go
> (method = obj.go)(): 先执行`(method = obj.go)`，再执行`method()`，`this`指向全局`window`
> (obj.go || obj.stop)(): `||`将属性访问器转换为不允许访问`this`的普通值，因此指向全局`window`

## 3. 表达式`Function.prototype.__proto__.__proto__  === null`的结果为`true`

> **正确**
> `Function.prototype.__proto___ === Object.prototype`，而`Object.prototype.__proto__`等于`null`

## 4. `1..toString()`的输出结果

> **`'1'`**
> 相当于`1.0.toString()`