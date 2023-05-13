# 🚀 JS 手撕

## 浅拷贝

```js
function ShallowCopy(arr) {
	let newArr = [];
	arr.forEach((element, index) => {
		newArr[index] = element;
	});
	return newArr;
}
```

## 深拷贝

```js
function DeepCopy(obj) {
	let res = obj instanceof Array ? [] : {};
	for (const key in obj) {
		if (obj.hasOwnProperty(key)) {
			const element = obj[key];
			res[key] = element instanceof Object ? DeepCopy(element) : element;
		}
	}
	return res;
}
```

## 节流

```js
function throttle(fn, delay, ...param) {
	let timer;
	return function () {
		let args = arguments,
			context = this;
		if (!timer) {
			timer = setTimeout(function () {
				fn.apply(context, args);
				timer = null;
				/*
为什么不使用clearTimeout?
因为这里需要的是在规定时间内只存在一个定时器在工作，而且使用clearTimeout不易判断是否还存在有计时器
clearTimeout后的timer属于是被弃用的定时器对象，但隐式转换仍会返回true
*/
			}, delay);
		}
	};
}
```

## 防抖

```js
/* 
为什么这里不使用null？
根据JS的单线程模式，定时器会被认为是宏任务而被放置到宏任务队列等待被处理。
当timer被赋值为定时器时，在宏任务队列中就被存入了一个定时器任务，因此timer=null也仅是将timer的值指向了堆中新存入的null，而宏任务队列中的计时器仍然存在并且会继续执行，除非被clearTimeout清除
*/
function debounce(fn, delay, immediate) {
	let timer;
	return function () {
		const context = this,
			args = arguments;
		if (timer) clearTimeout(timer);
		if (immediate) {
			let callNow = !timer;
			timer = setTimeout(() => {
				timer = null;
			}, delay);
			if (callNow) fn.apply(context, args);
		} else {
			timer = setTimeout(() => {
				fn.apply(context, args);
			}, delay);
		}
	};
}
```

## 数组扁平化

```js
function flatArr(nums) {
	return nums.reduce((pre, cur) => {
		return pre.concat(Array.isArray(cur) ? flatArr(cur) : cur);
	}, []);
}
```

## 手撕 reduce

```js
Array.prototype.myReduce = function (callBack, initiate) {
	let arr = this;
	let total = initiate || arr[0];
	for (let i = initiate ? 0 : 1; i < arr.length; i++) {
		total = callBack(total, arr[i], i, arr);
	}
	return total;
};
```

## instanceof 方法

```js
function myInstanceof(obj, target) {
	if (typeof obj !== "object" || obj === null) return false;
	if (typeof target !== "function") throw Error("target must be a function");
	let proto = Object.getPrototypeOf(obj);
	while (proto) {
		if (proto === target.prototype) return true;
		proto = Object.getPrototypeOf(proto);
	}
	return false;
}

// 优解
function myInstanceof(obj) {
	if (typeof obj !== "object") return;
	let proto = Object.prototype.toString
		.call(obj)
		.replace(/[\['object (\s.)'\]]/g, "")
		.toLowerCase();
	return proto;
}
```

## 快速排序

```js
function sortFnc(nums) {
	quickSort(0, nums.length - 1, nums);
	return nums;
}

function quickSort(start, end, arr) {
	if (start < end) {
		let middle = sort(start, end, arr);
		quickSort(start, middle - 1, arr);
		quickSort(middle + 1, end, arr);
	}
}

function sort(left, right, arr) {
	let base = arr[left],
		l = left,
		r = right;
	while (l !== r) {
		while (arr[r] >= base && r > l) {
			r--;
		}
		arr[l] = arr[r];
		while (arr[l] <= base && r > l) {
			l++;
		}
		arr[r] = arr[l];
	}
	arr[l] = base;
	return l;
}
```

## 数组去重

```js
function myFilter(arr) {
	return arr.filter((value, index, array) => {
		return array.indexOf(value) == index;
	});
}

// 利用Set不可重复特性
function myFilter2(arr) {
	return [...new Set(arr)];
}
```
