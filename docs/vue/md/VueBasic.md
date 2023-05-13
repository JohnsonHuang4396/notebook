# ⚙️ VueBasic

## 基础

### 1、指令

（1）v-once 可以控制组件只刷新一次，后续即使有数据更新也不会再刷新

（2）v-bind 也可以绑定动态值：

```html
// html
<div :[arg]="url">百度</div>
// 百度被编译为超链接 // js
<script>
	    data(){
		return{
			arg:'href',
			url:'www.baidu.com'
		}
	}
</script>
```

### 2、方法

当需要获取 DOM 节点，但又想给方法传值时可以这样做：

```html
// html
<div @click="alert($event,'success')">
	<div>// js alert(event,result){ console.log(event)// 打印该DOM节点 }</div>
</div>
```

### 3、computed 计算属性

当需要对数据进行动态处理或者格式处理时，可以在 computed 属性中对数据处理：

```html
// 实例
<button @click="sub">减少</button>
<text>{{num}}</text>
// 等于0则 “ 提示：不能小于0 ” 等于10则 “ 提示：不能大于10 ”
<button @click="add">增加</button>
<div>{{tip}}</div>
```

```js
// vm
computed:{
    tip(){
       const message=this.num==0?'不能小于0':this.num==10?:'不能大于10':''
       if(message) return this.tip+message
    }
},
data(){
    return{
        num:1,
        tip:'提示'
    }
},
methods:{
    add(){
        if(this.num<10) this.num++
    },
    sub(){
        if(this.num>0) this.num--
    }
}
```

computed 中的属性可以直接当作 data 来使用，同时也可以为其定义专属的 getter 和 setter：

```js
data(){
    return{
        error:''
    }
}
computed:{
    tip:{
        get(){
            const message=this.num==0?'不能小于0':this.num==10?:'不能大于10':''
      	    if(message) return this.tip+message
        },
        set(error){
            this.error=error// 当add方法被调用时，error属性的值就会变成 “ 提示 ”
        }
    }
},
methods:{
    add(){
        if(this.num<10) this.num++
        this.tip='提示'// 由于对tip属性的setter进行了重新设置，所以此时并不会直接修改tip的值
    }
}
```

::: tip

-   `计算属性`应保持其只读性，**不允许**在计算方法中使用`异步函数`或`操作DOM`！！

:::

### 4、watch 监听器

watch 属性中的方法有两个形参，newValue 和 oldValue

可以用 watch 监听页面中列表选项的变化，也可以用来监听路由的改变

```js
// 上面的例子可以这样写
data(){
    return{
        num:1,
        tip:''
    }
},
watch:{
    // newValue表示新更改的值
    // oldValue标是修改前的值
    num(newValue,oldValue){
        this.tip=newValue==0?'不能小于0':newValue==10?'不能大于10':''
    }
},
methods:{
    add(){
        if(this.num<10) this.num++
    }
}
```

## 指令

### 1、v-bind 控制样式表

```html
<div :class="{'is-delete':isDelete}"></div>
// 当isDelete变量为true时，is-delete样式才生效 // 由于 ‘ - ’
并不属于JS变量命名规范，因此需要加上 ‘ ’
<div :class="[{'is-delete':isDelete}，‘bg-red’]"></div>
// 可以控制多个css样式
```

```vue
// 也可以搭配JS一起管理CSS
<div :class="classList"></div>
<script>
data(){
    return{
        classList:{
            'is-delete':true,
            'bg-red':true,
        }
    }
}
</script>
```

#### 父组件定义子组件样式

当我们需要从父组件对子组件的样式进行定制时，可以使用 $attrs.class 属性对子组件传递样式

```vue
// 从父组件中向子组件传递样式表
<father-class class="father-css"></father-class>

// 在子组件中获取样式表，并对需要定制的标签赋值
<main></main>
<div :class="$attrs.class"></div>
<section></section>
```

### 2、v-if 和 v-for 合并使用

```html
// 如果需要将内部标签渲染的话就用div之类的标签，如果不需要渲染就用template
<div v-for="item in list" :key="item.index">
	<template v-if="item.name">{{item.name}}</template>
	// 该标签不会被渲染
	<div v-if="item.name">{{item.name}}</div>
	// div被渲染
</div>
```

## Vue3

### 1、定义基本类型的响应式数据

如果想要定义一个 number、string 类型的响应式数据，可以直接使用以下方式定义

对于基本类型的数据，vue3 通过 getter 和 setter 完成

对象则通过 reactive 完成

```js
setup(){
    const id=ref('Huang Qihao')  // 将 ‘Huang Qihao’ 加工成引用对象，再赋值给id变量
    const obj=ref({
        name:'hqh' // 到了这一层就不会被遍历加工成响应式数据了
    })
    changeID(){
        id.value='Jiang Xiyu' // vue3只会对数据进行浅遍历，更深层次的属性都不会变成引用对象
        obj.value.name.value='jxy' // 报错，提示并没有更深一层的value属性
        obj.value.name='jxy' // 修改成功
    }
}
```

::: danger 关于`.value`的坑

```js
/*
为什么`ref`定义的普通响应式数据使用`watch`函数监听时，不需要`.value`呢？
下面看看由`ref`生成的普通类型响应式数据的内部结构
*/
const name=ref('hqh')
Object { _shallow: false, dep: undefined, __v_isRef: true, _rawValue: "hqh", _value: "hqh" }
/*
可以看到，其实value中的值就是一个普通的`string`类型，在`watch`中使用`name.vlaue`来作为监听对象的话，就等于将一个基本类型的值作为监听对象，而不是一个`ref`响应式数据
*/
```

```js
/*
那如果使用了`ref`定义对象作为响应式数据的话，要怎么使用`watch`监听呢？
下面看看由`ref`生成的对象类型响应式数据的内部结构
*/
const person=ref({
    name:'hqh',
    age:21
})
Object { _shallow: false, dep: undefined, __v_isRef: true, _rawValue: {…}, _value: Proxy }
/*
这时发现，value中的值变成了一个proxy对象（ref无法处理对象，因此交由reactive处理后储存）。那么就代表此时要监听的是这个value中的proxy对象，而不是响应式数据person本身
*/
//方法一 `.vlaue`方法
watch(person.value, (newValue, oldValue) => {
	console.log(newValue, oldValue);
})
//方法二 `deep`配置项
watch(person,(newValue, oldValue) => {
	console.log(newValue, oldValue);
},{ deep: true })
```

:::

### 2、reactive 的优势

不能使用 reactive 定义基本数据

```js
const id=reactive('hqh') // 报错
const person=reactive({
    id:'hqh',
    age:21
}) // 生成proxy实例对象，实现响应式
changeId(){
    Person.id='jxy' // 可以直接使用对象修改属性值
}
```

reactive 支持使用下标对数组的其中一项进行修改

```js
const arr=reactive(['cf','lol','dota'])
changeName(){
    arr[0]='dnf'
}
```

### 3、Vue3 的 computed 函数

vue3 中将`computed`配置项变成了一个函数，使用时需要外部引入调用

```js
import {computed} from 'vue'

// 可以直接创建一个新的变量作为计算属性
const num=computed(()=>{
    get(){},
    set(){}
})
// 也可以往对象中添加一个新的属性作为计算属性
person.age=computed(()=>{
    get(){},
    set(){}
})
```

### 4、Vue3 的 watch 函数

和`computed`一样，vue3 中的`watch`也是一个函数

```js
import { watch } from "vue";

const person = "hqh",
	student = "jxy";

// 监听一个ref对象时
// watch函数的三个形参分别为 监听对象、处理方法、监听配置
watch(
	person,
	(newValue, oldValue) => {
		console.log(`我的新名字是${newValue}，旧名字是${oldValue}`);
	},
	{ immediate: true, deep: true },
);

//监听多个ref对象时
watch([person, student], (newValue, oldValue) => {
	console.log(
		`同时监听person和student，新的值为${newValue}，旧的值为${oldValue}`,
	);
	// 这里`newValue`和`oldValue`输出的值都是数组
	// newValue == [person的newValue,student的newValue]
	// oldValue == ['hqh','jxy']
});
```

::: danger 关于 `watch` 结合`reactive`各种情况和坑

```js
// 监听 ref 响应式数据的情况如上

const person:{
    name:'hqh',
    age:21,
    job:{
        job1:{
            salary:'21k'
        }
    }
}
// 情况3 监听 reactive 响应式数据的 `所有属性`
/*
注意事项：
1、此处无法正确获取oldValue
2、强制开启deep=true，无法关闭
*/
watch(person,(newValue,oldValue)=>{
    console.log(newValue,oldValue)
},{deep:false})// 无效

// 情况4 监听 reactive 响应式数据的 `一个属性`
/*
由于person是`reactive`响应式数据，如果直接使用`person.name`则无法完成监听
*/
watch(()=>person.name,(newValue,oldValue)=>{
    console.log(newValue,oldValue)
    // 能正常展示`newValue`和`oldValue`
})

// 情况5 监听 reactive 响应式数据的 `多个属性`
watch([()=>person.name,()=>person.age],(newValue,oldValue)={
    console.log(newValue,oldValue)
	// 以数组方式展示newValue和oldValue
})

// 特殊情况 监听 reactive 响应式数据中的 `对象属性`
/*
当 reactive 响应式数据中的某一属性是对象时，如果需要监听对象属性中的属性，就需要开启deep配置
*/
watch(person.job,(newValue,oldValue)=>{
    console.log(newValue,oldValue)
},{deep:true})
```

#### 总结：

-   `watch`函数监听多个响应式数据时，使用`[ ]`装载监听对象
-   `watch`函数监听`ref`响应式数据不需要进行其他配置，可以直接监听
-   `watch`函数监听`reactive`响应式数据时，如果只监听`对象本身`，强制开启`deep`配置，且无法正常获取`oldValue`的值
-   `watch`函数监听`reactive`响应式数据时，如果监听其中的`普通属性`，需要使用`()=>value`箭头函数返回监听的属性，以正常运行`watch`函数和获取`oldValue`的值
-   `watch`函数监听`reactive`响应式数据时，如果监听其中的`对象属性`，需要手动开启`deep`配置，以正常运行`watch`函数和获取`newValue`以及`oldValue`的值

:::

### 5、Vue3 的`watchEffect`函数

`watchEffect`函数类似`computed`函数和`watch`函数的结合体，但它不需要传递任何参数，当`watchEffect`函数检测到`callback`中的变量有改动就会自动执行里面的方法

```js
const age=ref(21)
watchEffect(()=>{
    const myAge=age // watchEffect函数已经劫持了响应式变量age，当age发生变化时将执行以下方法
    console.log(`我的年龄发生了变化，现在的年龄为${myAge}`)
}})
```

::: danger

-   `watchEffect`函数强制开启了`immediate`和`deep`配置项，因此会在页面加载时自动使用`callback`以及允许遍历`深层对象`
-   值得注意的是，当在`watchEffect`函数中需要赋值的对象也是`ref`响应式数据时，就需要使用`.value`帮助

```js
const num = ref(0),
	counter = ref(0);
watchEffect(() => {
	setTimeout(() => {
		counter.value = num;
	}, 1000); // 当`age`发生变化时，1秒后`counter`将等于`age`的值
});
```

:::

#### 6、hooks 自定义组合函数

假如现在要给组件写一个输出鼠标点击时位置的功能，且需要功能复用

```html
// 组件
<span>当前鼠标点击的位置为,x:{{position.x}},y:{{position.y}}<</span>

<script>
	import useMousePosition from './hooks/useMousePosition'

	setup(){
	    let position=useMousePosition()
	    return {position}
	}
</script>
```

```js
// useMousePosition.js
import {reactive,onMounted,onBeforeUnmounted} from 'vue'
export default function(){
    let position=reactive({
        x:0,
        y:0
    })

    function saveMousePosition(event){
        position.x=event.pageX
        position.y=event.pageY
    }

    onMounted(){()=>{
        window.addEventListener('click',saveMousePosition)
    }}

    onBeforeUnmounted(()=>{
        window.removeEventListener('click',saveMousePosition)
    })

    return position
}
```

Vue3 的`自定义hook函数`和 Vue2 的`mixin`类似，都是将配置项整合输出使用，但是 Vue3 中能整合生命周期钩子一起使用

#### 7、惠民的 toRef 和 toRefs 函数

当我们只需要将一个对象中的某些属性暴露，或者不想在 HTML 标签中逐层敲出属性名时，使用`toRef`和`toRefs`是最好的选择

```js
// 有一个person对象，只需要导出其中的name和age属性
const person=reactive({
    name:'hqh',
    age:21,
    school:'gcu',
    sex:'man'
})

return{
    name:toRef(person,'name')
    age:toRef(person,'age') //然后就可以直接在页面中使用name和age了，不再需要person.name或person.age
}
```

```js
// 如果person是一个复杂对象且需要将所有的属性都导出呢？
const person = reactive({
	name: "hqh",
	age: 21,
	school: "gcu",
	sex: "man",
	families: {
		fatherFamily: {
			father: "hrh",
			grandMom: "lmq",
			grandPa: "grandPa-hqh",
		},
	},
});

// 使用toRefs函数帮助导出
return {
	...toRefs(person),
	// 浅层的对象可以直接使用，深层的对象只能通过逐级导出（families.fatherFamily.father）
};
```

::: danger

-   `toRef`和`toRefs`都是将响应式对象中的属性经过加工变成`RefImpl`对象（Ref 对象），且每一个属性都是一个`Proxy`对象，相当于为每一个属性都增加了一层代理，且代理属性和响应式对象中的源属性相对应

:::

### 8、`readonly`和`shallowReadonly`函数

当我们需要限制响应式数据的修改权限时，可以使用`readonly`和`shallowReadonly`函数实现

```js
// 有一个从外部组件引入的响应式数据person，不允许修改
import person from "./person";
/*
const person=reactive({
	name:"hqh",
	age:21,
	family:{
		address:{
			city:'Foshan',
			area:'Chancheng'
		}
	}
})
*/

const person = readonly(person); // person中的所有属性都不允许被修改
const person = shallowReadonly(person);
// person中的所有浅层数据（如name、age）不允许修改，但深层的（如family.address.city）允许被修改
```

### 9、`toRaw`和`markRaw`函数

当在某些场景中，我们可以不需要或者不允许某些数据变成响应式数据，那么就可以使用`toRaw`和`markRaw`操作数据

```js
/*
toRaw：将由`reactive`生成的响应式数据回退成普通数据（ref响应式对象不可用）
markRaw：标记普通数据，当该数据作为属性添加到响应式数据中时，将不会被Proxy代理
*/
// 要将person响应式数据回退成普通数据
const person = reactive({
	name: "hqh",
});
person = toRaw(person);

/*
markRaw的使用场景：
1、有些值不应被设为响应式的，如复杂的第三方组件等
2、当渲染包含不可变数据的大列表时，选择性跳过响应式转换可提高性能
*/
// 有一个第三方库的方法要加到响应式对象中，将其标记为不代理属性
person.axios = markRaw(axios);
```

::: tip

```js
/*
当使用了`toRefs`返回了所有响应式属性之后，又添加了新的属性，该怎么让响应式系统捕获到呢？
*/
const person = reactive({
	name: "hqh",
	age: 21,
});

function addSex() {
	person.sex = "man";
}

return {
	...toRefs(person),
};
/*
 当执行了`addSex`方法后，其实在person对象中确实是新增了sex属性，但是由于setup是不会重复执行的，因此return中的解构并不会重新将person对象结构，那么就直接将person对象返回
*/
// 更改为↓
return {
	person,
	...toRefs(person),
};
// 这样就可以即使用解构，也可以捕获新增加的属性
```

:::

### 10、customRef 函数

在某些情况下，简单地使用`ref`函数可能无法满足我们的需求，为此 Vue3 提供了一个允许自定义地响应式函数`customRef`

```html
<!-- 这是一个输入框和展示内容的组件 -->
<input v-model="keyWord"></input>
<h2>
    {{keyWord}}
</h2>
```

```js
// 要求不仅要在`h2`标签中实时获取keyWord数据，还要实现防抖功能
import {customRef} from 'vue'

function myRef(value,delay){
    let timer
    return customRef((track,trigger)=>{
        get(){
            console.log(`捕获到读取数据请求，将${value}返回`)
            track() // 通知Vue监听value的变化，提前告知get需要追踪value
            return value
        },
        set(newValue){
            console.log(`捕获到修改数据请求，新数据为${newValue}`)
            clearTimeout(timer)
            timer=setTimeout(()=>{
                value=newValue
                trigger() // 通知Vue需要重新解析模板（值已经被修改，请求重新调用get）
            },delay)
        }
    })
}
const keyWord=myRef('Hello Word!',500)
```

#### 11、`provide`与`inject`函数

当我们需要从祖组件向后代组件传值时，在 Vue2 中需要经过子组件再由子组件传给后代组件，但在 Vue3 中直接使用`provide`和`inject`就可以完成这个操作

```js
/* 
祖组件
需要向后代组件传递`person`变量
*/
const person = reactive({
	name: "hqh",
	age: 21,
});
provide("hqh", person);
```

```js
/*
后代组件内直接`inject()`即可使用
注意：后代组件中包括子组件，但是父子组件传值最好使用props
*/
inject("hqh");
```

#### 12、判断响应式数据类型

-   `isRef `：检查一个值是否为`ref`对象
-   `isReactive` ：检查一个对象是否由`reactive`创建的响应式代理
-   `isReadonly` ：检查一个对象是否由`readonly`创建的只读代理
-   `isProxy` ：检查一个对象是否由`reactive`或者`readonly`方法创建的代理

#### **注意！由`readonly`方法创建的对象，也是`Proxy`代理对象，只是不能被修改值**

#### 13、teleport 组件

当我们的业务组件被嵌套在很深的位置，但是又需要以顶层容器作为标准来定位时（如弹窗需要根据最外层容器位置），可以使用`teltport`组件将业务组件传送到外层

```html
<template>
	<son>
		<grand-son>
			<business>
				<button @click="showBlock">点击弹窗出现</button>
				<teleport to="body">
					<!-- 将包裹的组件传送到<body></body>中 -->
					<!-- 这样组件就可以以body标签为标准进行定位，或者以其他父级标签为标准 -->
					<block><!-- 弹窗的业务代码 --></block>
				</teleport>
			</business>
		</grand-son>
	</son>
</template>
```

除此之外，还可以指定`teleport`组件传送到指定的位置

```html
<!-- index.html中 -->
<div id="app"></div>
<div id="teleport-target"></div>

<!-- HellowWord.vue中 -->
<button @click="showToast" class="btn">打开 toast</button>
<!-- to 属性就是目标位置 -->
<teleport to="#teleport-target">
	<div v-if="visible" class="toast-wrap">
		<div class="toast-msg">我是一个 Toast 文案</div>
	</div>
</teleport>
```

即使使用`teleport`组件将父组件中的子组件传送走了，子组件仍隶属于父组件，仍然能接收从父组件的传值

```html
<!-- App.vue -->
<div id="teleport-to"></div>
<son></son>

<!-- son.vue -->
<div>
	<grand-son :showModal="showModal"></grand-son>
	<div>我是父组件</div>
</div>
... let showModal=ref(true)

<!-- grandSon.vue -->
<teleport to="#teleport-to">
	<div v-if="showModal">我是孙组件</div>
</teleport>
... props:['showModal']
```

#### 14、`suspense`组件以及如何将组件异步引入

当网速较慢时，如果我们使用的是静态的引入`import son from './son`，那么整一个组件就会等待加载最慢的子组件加载完毕后，再整个展示，而这个过程有时候是非常缓慢的。为此，Vue3 提供了`suspense`组件来解决这个问题

```html
<!-- index.html -->
<div>
	这是父组件
	<suspense>
		<template v-slot:default>
			<son>这是子组件</son>
		</template>
	</suspense>
	<suspense>
		<template v-slot:fallback>加载中，请稍后</template>
	</suspense>
</div>
```

```js
// index.js
import { defineAsyncComponent } from "vue";
const son = defineAsyncComponent(() => import("./son.vue"));
```

在经过使用`defineAsyncComponent`函数动态引入组件，以及使用`suspense`标签指定`需要异步加载的组件`和`加载时展示的内容`后，即使是网速慢，也不会导致空白页过久了

::: tip

被`suspense`标签包裹，并且被`defineAsyncComponent`函数动态引入的标签，允许将`setup()`变成`async`函数，并且返回的`promise`会被正常解析

:::

```html
<!-- index.html -->
<div>
	<suspense>
		<template v-slot:default>
			<son></son>
		</template>
	</suspense>
	<suspense>
		<template v-slot:fallback>加载中，请稍后</template>
	</suspense>
</div>
```

```js
// index.js
import { defineAsyncComponent } from "vue";
const son = defineAsyncComponent(() => import("./son.vue"));
```

```vue
<!-- son.vue -->
<div> {{son}}</div>
```

```js
async setup(){
	let son=ref('Child')
	let p = new Promise(resolve=>{
		setTimeout(()=>{
			resolve(son)
		})
	})
	return await p
}
```

这样，也能实现只有当数据加载完毕的时候，组件才会被展示

## `Vue3` 添加全局方法

使用`app.config.globalProperties`

```js
// main.js
import { createApp } from "vue";
import App from "./App.vue";
import { myFnc } from "./assets/fnc";

/*
function show() {
	console.log("show");
}
function myLog() {
	console.log(123);
}
export const myFnc = { show, myLog };
*/

const app = createApp(App);
console.log("myFnc  :>>", myFnc);
app.config.globalProperties.myFnc = myFnc;
app.mount("#app");

// xxx.vue
import { getCurrentInstance } from "vue";

export default {
	setup() {
		const { proxy：{myFnc:show} } = getCurrentInstance();
		show();
	},
};
```

## Vue2 与 Vue3 的相应式原理

### 1、vue2 对对象属性的响应式操作

在 vue2 中，直接在对象中添加属性是不会被响应式系统监测到的

```js
// 有一个person对象，需要往其中加入sex属性
person:{
    name:'hqh',
    age:21
}

import Vue from 'vue' // 方法二需要的对象
addSex(){
    this.person.sex='男' // 添加失败，由于并没有通过object.defindproperty来操作
    // 方法一
    this.$set(this.person,'sex','男')
    // 方法二 （需要引入Vue对象）
    Vue.set(this.person,'sex','男')
}
```

同样的，直接删除对象的属性也不会被响应式系统检测到

```js
// 有一个person对象，需要删除age属性
person:{
    name:'hqh',
    age:21
}

import Vue from 'vue' // 方法二需要的对象
addSex(){
    delete this.person.age // 删除失败，由于并没有通过object.defindproperty来操作
    // 方法一
    this.$delete(this.person,'sex','男')
    // 方法二 （需要引入Vue对象）
    Vue.delete(this.person,'sex','男')
}
```

对数组的操作也是相同的，不过由于 vue 框架自身对数组的方法进行了重构，因此使用数组方法修改数组能被响应式系统检测到

```js
// 有一个数组arr，需要将下标为0的数据改为'lol'
arr: ["cf", "dnf"];

// 方法一、二同上
this.$set(this.arr, 0, "lol");
// 方法三
this.arr.splice(0, 1, "lol");
```

### 2、vue2 的响应式原理

```js
// vue2的响应式通过object.defindproperty来实现
// 当拥有一个多属性对象时
let person:{
    sex:'man',
    name:'hqh',
    age:21
}
// 通过遍历对象的key值，给每一个key值加上object.defindproperty，实现简单的响应式
for key of Object.keys(person){
    Object.defindproperty(person,[key],{
        get(){
            console.log(`有人读取了${key}的值`)
    		return person[key]
        },
        set(value){
            console.log(`有人要修改${key}的值`)
            person[key]=value
        }
    })
}
```

但是通过 `Object.defindproperty` 的响应式无法检测增加和删除的操作，因此 vue2 专门提供了`$set()`和`vue.set`来侦测属性增加和删除操作

### 3、vue3 的响应式原理

```js
// vue3 的响应式原理依赖 proxy 和 reflect 来完成
// 源对象
let person={
    name:'hqh',
    sex:'man',
    age:21
}

let p=new Proxy(person,{
    // 这时已经完成了proxy代理步骤，通过代理对象p的增删改查都会作用在person上
    get(target,keyName){ // target 代表当前的源对象， keyName 代表被操作的key值
        console.log(`有人读取了${target}的${keyName}数据`)
        return Reflect.get(target,keyName)
    },
    set(target,keyName,value){
        // set 不仅能修改key的值，同时也能在增加属性时被调用
        console.log(`有人修改或增加了${target}的${keyName}数据`}
        Reflect.set(target,keyName,value)
    },
    deleteProperty(target,keyName){
        console.log(`有人删除了${target}的${keyName}数据`}
        Reflect.delete(target,keyName)
    }
})
```

为什么要使用 `Reflect` 代替 `Object.defindproperty` ？

```js
// 当出现以下情况时
Object.defindproperty(a, b, 1);
Object.defindproperty(a, b, 2);
console.log("good"); // 将会报错，提示 a 被重定义，good 也不会被输出

//当使用Reflect时，Reflect 有返回值，当操作成功返回true，否则返回false
Reflect.set(a, b, 1); // 返回 true
Reflect.set(a, b, 2); // 返回 false
console.log("good"); // 不会报错，正常输出 good ，且 a 中的 b 属性也不会被修改为2
```

`Reflect`遇到错误时的错误处理机制，很好的避免了出现底层错误时，错误难以排查的问题。不需要给每一个响应式对象都加一个 `try catch`。

## `nextTick`函数

由于 Vue 对被方法操作 dom 节点的操作顺序是：方法执行完毕->操作 dom 节点，因此当执行逻辑函数之后立即操作被更改的 dom 节点是不会成功的

```html
<!-- 假如有一个组件，需要在展示后自动获取焦点 -->
<div v-if="show">
	<input :value="text" ref="inputText" />
</div>
<button @click="handlerInput">打开输入框</button>
```

```js
// 逻辑函数
handlerInput(){
    setTimeout(){
        // 经过了复杂的逻辑代码或异步请求后
        show=true
    }
    /*
如果这时直接操作dom节点是不会生效的，此时vue还在继续往下执行方法，只有等方法结束之后，vue才会更新dom节点
因此可以使用`nextTick`函数，等vue更新组件之后再操作dom节点
    */
    this.$nextTick(function(){
        this.$refs.inputText.focus()
	})
}
```

## `:vlaue`和`v-model`

`:vlaue`指的是单向数据流，`v-model`指的是双向数据流

```html
<!-- 单向数据流 -->
<input type="text" :value="name" />
<button @click="changeName">按下按钮name变化</button>
```

```html
<!-- 双向数据流 -->
<input type="text" v-model="name" />
<button @click="changeName">按下按钮name变化</button>
```

```js
let name = ref("hqh");
function changeName() {
	this.name = "jxy";
}
watch(name, (newValue, oldValue) => {
	console.log("name被修改了");
	console.log(newValue);
	console.log(oldValue);
});
```

-   使用单向数据流组件：点击按钮时，触发`watch`函数，但是输入框内容改变时不会触发
-   使用双向数据流插件：不论是点击按钮，还是改变输入框内容，都会触发`watch`函数

## 指定子元素接收 class

```html
<!-- 父组件中 -->
<myComponent :myClass="font-red" />
<!-- 子组件中 -->
<span :class="$attrs.myClass">this is a span</span>
<button>click me</button>
<!-- 渲染成 -->
<span class="font-red">this is a span</span>
```

## Vue 的面试题

1. ### `Vue`的`watch`和`created`哪个先执行？为什么？

> 如果`watch`有`immediate`属性，则`watch`先执行
>
> 否则`created`先执行，`watch`则在`data change`之后才执行

2. ### `Vue`的`mixins`和`extends`有什么区别？

> `mixins`是将组件导出的`变量`和`方法`以混入的形式导入文件中
>
> `extends`是将一个也是将组件导出的对象混入，但是`只能导出一个对象`，如果导出多个则不执行
>
> 执行顺序：`extends`>`mixins`>组件

3. ### `Vue`怎么批量导入组件

    > 主要思路：使用`require.context`获取目录下的所有组件名，然后使用`requireComponent(filename)`获取组件的配置。最后如果是`全局引入`则使用`Vue.component`导入组件；`局部引入`则添加到一个数组中并在`components`注册，然后用
    >
    > `<component :is='组件名' />`调用组件
    >
    > 具体实现：[Vue 如何批量导入组件？](https://github.com/haizlin/fe-interview/issues/2084)

4. ### `Vue`的`v-model`原理

`v-model`是`input`的语法糖，该方法默认触发`input`事件并传递名为`modelValue`的参数

```vue
<div v-model="name"></div>
<!-- 等同于 -->
<div :modelValue="name" @input="name = $event.target.modelValue"></div>
```

## `Vue`解决`v-html`中不能使用过滤器

```js
    // 定义方法
    function htmlFilter(str){
        return str.replace(/\s./g,'')
    }
    // 使用
    v-html='htmlFilter(str)'
```

### 7、`Vue`为什么要用`key`来帮助节点更新

> `Vue`解析引擎如果遇到`没有key`时删除数组其中一项的情况会怎么做？
>
> 假如现在有一个数组`[1,2,3]`，需要删除第二项，按照`人类`的思维，应该结果是`[1,3]`，但是不然，`Vue`解析引擎会将触发更新的数据逐个对比：`1==1`没有变化、`2还存在`、`3变成了undefined`，因此最后判断是`3`被删除了

`key`能帮助`Vue`的`diff语法`更加高效的运作：快速地找到对应的`节点`，逐层比较`节点类型`，如果`第一层`就不一样直接干掉，否则逐层对比，最后找到需要替换的内容`重新设置节点属性`

`key`还有一个功能是避免`复用dom`。当没有为`dom`设定`唯一且不变值`时，`Vue`解析引擎会最大程度复用`dom`节点，而如果添加了`key`，则能保证即使数据改变也能重新渲染出新的`dom`。详情看：[key 管理可复用组件](https://cloud.tencent.com/developer/article/1534737)

## `Vue`如何重置`data`

```js
Object.assign(this.$data, this.$options.data());
/*
this.$data 组件当前的data值
this.$options.data() 组件初始的data值
*/
```

## `Vue3`使用`Vuex`

```js
// 引入
import { createstore } from 'vuex'
export default createstore{
    state(){},
    getters(){},
    mutations(){
        changeValue(state,newValue){}
    },
    actions(){
        asyncChangeValue(context,newValue)
    }
}

// 使用
import $store from '...'
$store.commit('...',value)
$store.dispatch('...',value)
```

## 作用域插槽

> 当需要为父组件提供更加灵活的处理数据方式时，可以使用作用域插槽
>
> 作用域插槽的作用就是将子组件的数据暴露给父组件，父组件在`<template>`中接住数据就可以自定义样式

```html
<!-- 子组件 -->
<div class="item">
	<i>
		<slot name="icon"></slot>
	</i>
	<div class="details">
		<h3>
			<slot name="heading" text="str" count="1"></slot>
		</h3>
		<slot></slot>
	</div>
</div>

<!-- 父组件 -->
<template #heading="scoped">{{ scoped.text }}{{ scoped.count }}</template>
```

> 当需要将循环的内容暴露出来时，也可以使用作用域插槽

```html
<!-- 子组件 -->
<ul>
	<li v-for="item in items">
		<slot name="item" v-bind="item"></slot>
	</li>
</ul>
```

## Vue Router

### 1. 路由定向到新页面

```js
let newUrl = this.$router.resolve({
	path: "/path1/",
});
let newUrl = this.$router.resolve({
	path: "/path2/", // 必须要/path/（两个'/'）才能重置path，否则将出现/path1/path2/重叠的情况
});
window.open(newUrl.href, "_blank");
```
