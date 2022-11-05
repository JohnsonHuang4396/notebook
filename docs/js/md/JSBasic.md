# ⚙️ JS 基础

## 1、变量

### const 与 let

① 对象和数组的赋值，最好用 const。当 const 被赋值时，如果直接修改数据类型则会报错。

```js
const A = ["uzi", "ming", "xiaohu"];
A = "rng"; //报错
A = {
	rng: "xiaohu,uzi,ming",
}; //报错
```

### 变量提升与函数声明

> `函数提升`等级高于`变量提升`，且不会被`变量声明`覆盖，但会被`变量赋值`覆盖

```js
function a() {}
var a = 1; // error 函数不允许被重新声明

var a;
function a() {}
a = 1; // a的值为1
```

## 2、对象

### symbol

（1）使用 symbol()创建的 symbol 对象，每个都是独立的，即使键值相同

```js
const s1 = Symbol("test");
const s2 = Symbol("test");
console.log(s1 === s2); // false
```

（2）symbol.for()会在全局 symbol 表中注册一个 symbol，当有键值重复时，则两个变量读取同一个 symbol，

反之注册一个新的 symbol

```js
const s1 = Symbol.for("test");
const s2 = Symbol.for("test");
console.log(s1 === s2); // true
```

### symbol 的属性

（1）Symbol.isConcatSpreadable 使数组不可被 concat 方法拆解

```js
const arr1 = [1, 2, 3, 45];
const arr2 = [232, 6, 45];
arr2[Symbol.isConcatSpreadable] = false;
console.log(arr1.concat(arr2)); // [1,2,3,45,Array(3)]
```

（2）Symbol.toStringTag 使创造出来的类具有可读性

```js
class ValidatorClass {
	get [Symbol.toStringTag]() {
		return "Validator";
	}
}
Object.prototype.toString.call(new ValidatorClass()); // "[object Validator]"
```

## 3、数组

### 解构赋值

① 对象和数组都可以使用解析赋值，将值赋给一个新的变量

```js
//数组
const A = ["uzi", "ming", "xiaohu"];
let [uzi, ming, xiaohu] = A;

//对象
const rng = {
	name: "rng",
	members: ["uzi", "ming", "xiaohu"],
	propoganda: () => {
		console.log("we are the best team!");
	},
};
let { name, members, propoganda } = rng;
let { propoganda } = rng; //单独取propoganda赋值
```

### 扩展运算符将伪数组转换为数组

```js
const divs = document.querySelectorAll("div");
const divsArr = [...divs]; // 将DOM节点集合转换为数组
console.log(divsArr);
```

### 迭代器

迭代器 iterator 其实是一个 symbol 属性，他存在于每一个可以遍历的对象中

```js
// 自制迭代器
const arr = {
	name: "rng",
	members: ["xiaoming", "gala", "wei", "xiaohu", "bin"],
	[Symbol.iterator]() {
		let index = 0;
		return {
			next: () => {
				if (index < this.members.length) {
					let result = {
						value: this.members[index],
						done: false,
					};
					index++;
					return result;
				} else {
					let result = { value: undefined, done: true };
					return result;
				}
			},
		};
	},
};
for (const value of arr) {
	console.log(value);
}
```

## 4、函数

### 箭头函数

#### （1）this

箭头函数的 this 是静态的，始终指向箭头函数的作用域

```js
//例子1
let fnc = function () {
	console.log(this.name);
};
let fnc1 = () => {
	console.log(this.name);
};
window.name = "ming";
const rng = {
	name: "uzi",
};
fnc.call(rng); //  uzi
fnc1.call(rng); //  ming

//例子2
const A = {
	Fnc: function () {
		let fnc = () => {
			console.log(this.name); // undefinded
			console.log(this); //  对象A
		};
		fnc();
	},
};
window.name = "name";
A.Fnc();
```

#### （2）箭头函数不能作为构造函数

#### （3）箭头函数不能使用 arguments 变量

### 函数形参赋值与解构的结合使用

```js
function connect({ username, password, host = "192.186.0.1" }) {
	console.log(username);
	console.log(password);
	console.log(host);
}
connect({
	username: "uzi",
	password: "rng123",
});
```

### rest 参数

```js
function data(month, date, ...args) {
	// 存在多个参数时，rest参数必须放在最后
	console.log(month);
	console.log(date);
	console.log(args);
}
data("12月", "29日", 12, 29, 14, 44); // 12月，29日，[12,29,14,44]
```

### 生成器函数

#### 生成器异步操作

```js
// next(pram)的形参作为这个方法的结果传给下一个代码块（下一个yield）
function getUserInfo() {
	setTimeout(() => {
		let data = "用户信息";
		iterator.next(data);
	}, 1000);
}

function getUserOrders() {
	setTimeout(() => {
		let data = "用户订单";
		iterator.next(data);
	}, 1000);
}

function getOrdersInfo() {
	setTimeout(() => {
		let data = "订单信息";
		iterator.next(data);
	}, 1000);
}

function* gen() {
	let userInfo = yield getUserInfo();
	console.log(userInfo); // 用户信息
	let userOrders = yield getUserOrders();
	console.log(userOrders); // 用户订单
	let ordersInfo = yield getOrdersInfo();
	console.log(ordersInfo); // 订单信息
}

let iterator = gen();
iterator.next();
```

## 5、请求

### fetch 异步 io

```js
fetch("/json")
	// 这一步获取的数据必须经过json()方法才能被读取
	//json()不可省略
	.then(res => {
		return res.json();
	})
	.then(data => {
		console.log(data);
	});
```
