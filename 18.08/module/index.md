## 前端模块化

### 1. 为什么模块化 
- 解决命名冲突
- 管理依赖
- 提高代码的可读性
- 代码解耦，提高代码的复用性


### 2. 模块化进程

1. 全局声明

```javascript
  function foo() {
    // ...
  }
  function bar() {
    // ...
  }
```
缺点： 容易造成命名冲突

2. 简单封装，命名空间模式

```javascript
  var MYAPP = {
    foo: function() {},
    bar: function() {}
  }
```
缺点：本质是对象，不安全

3. 匿名闭包：iife（立即调用函数表达式）模式

```javascript
  var Module = (function() {
    var _private = 'private variable'
    var foo = function() {
      console.log(_private)
    }
    return {
      foo: foo
    }
  })()

  Module.foo();
  Module._private; // undefined
```
缺点：没有解决依赖问题

4. 引入依赖

```javascript
  var Module = (function() {
    var _$body = $('body')
    var foo = function() {
      console.log(_$body);
    }
    return {
      foo: foo
    }
  })(jQuery)

  Module.foo();
```

缺点： 封装性解决了，但是没有解决加载的问题

5. 通过script标签，引入各个模块

```html
  <script src="1.js"></script>
  <script src="2.js"></script>
  <script src="3.js"></script>
  <script src="4.js"></script>
  <script src="5.js"></script>  
```

缺点： 
- 一定得根据依赖关系，按顺序引用
- 请求过多
- 依赖模糊，难以维护

我们来看看现代模块化是怎么解决的这些问题的，目前流行的js模块化规范分为如下几种：

#### 1. CommonJS
#### 2. AMD
#### 3. CMD
#### 4. UMD
#### 5. ES6 MODULE


### CommonJS

CommonJS是服务器端模块的规范，Node.js就采用了这个规范。

```javascript
// circle.js
const { PI } = Math;

exports.area = (r) => PI * r ** 2

exports.circumference = (r) => 2 * PI * r

// foo.js
const circle = require('./circle.js');

console.log(`半径为4的圆的面积是${circle.area(4)}`)
```

***模块包装器**

在Node.js模块系统中，每个文件都被视为独立的模块。在执行模块代码之前，Node.js会使用一个如下的函数包装器将其包装

```javascript
// /Users/mjr
(function(exports, require, module, __filename, __dirname) {
  // 模块的代码实际在这里
  console.log(__filename); // /User/mjr/example.js
  console.log(__dirname); // /Usr/mjr
})
```
这样做的好处：
- 保持了顶层变量(用var、const或let定义)作用在模块范围内，而不是全局对象
- 有助于提供一写看似全局的但实际上是模块特定的变量，如：
a. 实现者可以用于从模块中导出值的module和exports对象
b. 包含模块绝对文件名和目录路径的快捷变量__filename和__dirname

**module.exports和exports**

在导出模块时，实际上有两种写法：

1. module.exports
2. exports

export的module.exports的简写，exports只作用于模块范围内，在模块被执行之前，被赋予了module.exports的值。用法上需注意一点：如果exports被赋予一个新值，则失去对module.exports值的引用

```javascript
  function require(/*...*/) {
    const module = {exports: {}}
    ((module, exports) => {
      // 模块代码
      function someFun() {}
      exports = someFunc; // exports不再是module.exports的缩写，并且模块仍将导出空的默认对象

      module.exports = someFunc; // 模块现在将导出someFunc，而不是默认对象

    })(module, module.exports)
    return module.exports;
  }
```
**同步加载**

```javascript
// timeout.js
var EXE_TIME = 2;

(function(second){
  var start = + new Date();
  while(start + second * 1000 > new Date()) {}
})(EXE_TIME)

console.log('2000ms executed')

// main.js
require('./timeout');

console.log('done!');
```

Node.js主要用于服务器的编程，加载的模块文件一般已经存在本地硬盘，所以加载起来比较快，不用考虑异步加载的方式。但是在浏览器端，限于网络原因，更合理的方案是使用异步加载


### AMD(Async Module Definition) 

RequireJS对模块定义的规范化产出

AMD规范采用异步加载方式加载模块，所有依赖这个模块的语句，都定义在一个回调函数中，等加载完成之后，这个回调函数才会运行。

```html
<!-- 现在网页中引入require.js及main.js -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.5/require.js" data-main="main"></script>
```

```javascript
// main.js入口文件
// 首先用config()指定各模块路径和引用名
require.config({
  baseUrl: './',
  path: {
    'lib': 'lib'  // 实际路径为 ./lib.js
  }
})

// 执行基本操作

require(['lib', './add'],  // 传入所有依赖
  function(lib, math){
  console.log(math.add(lib.b)) // 5
  lib.changeNum()
  console.log(lib.b) // 3  由此可以看出，回调函数传入的依赖为值的拷贝，并不是动态引用
})
```

```javascript
// 定义lib.js模块
define(function() {
  var num = 3;
  function changeNum() {
    num++;
  }
  return {
    a: 2,
    b: num, 
    changeNum: changeNum
  }
});
```

```javascript
// 定义add.js模块
define(['lib'], 
  function(lib) {  // 这个回调会在所有依赖都被加载后才执行
  var add = function(b) {
    return lib.a + b
  }
  return {
    add: add 
  }
});
```

打开浏览器观察，发现实际上各个模块都是通过生成一个异步的script标签来加载的

```html
  <script type="text/javascript" charset="utf-8" async="" data-requirecontext="_" data-requiremodule="main" src="./main.js"></script>
```

**async与defer的区别**
默认情况下，浏览器是同步加载JavaScript脚本的，即渲染引擎遇到script标签就会停下来，等到执行完脚本，再继续往下渲染。如果是外部脚本，还必须加入脚本下载的时间。

同步会造成浏览器阻塞，所以浏览器也允许异步加载，有两种方式异步加载：

```html
<script src="js/module.js" defer></script>
<script src="js/module.js" async></script>
```
- defer是“渲染完再执行”，async是“下载完就执行”

defer要等到整个页面在内存中正常渲染结束（DOM结构完全生成，以及其他脚本执行完成），才会执行(会在DOMContentLoaded事件之前执行)；
async 一旦加载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染（在load事件之前执行）；

- 如果有多个defer脚本，会按照它们在页面出现的顺序加载，而多个async脚本是不能保证加载顺序的


require.js的大致流程：

1. require函数检查依赖的模块，根据配置文件，获取js文件的实际路径

2. 根据文件实际路径，在dom中插入script节点，并绑定onload事件来获取该模块加载完成的通知

3. 依赖script全部加载完成后，调用回调函数


### CMD(Common Module Definition)

SeaJS对模块定义的规范化产出

CMD与AMD类似，不同点在于:AMD推崇依赖前置，提前执行；CMD推崇依赖就近，延迟执行

```javascript
// AMD recommended
define(['a', 'b'], function(a, b) {
  a.doSomething(); // 依赖前置，提前执行
  b.doSomething();
})

// CMD recommended
define(function(require, exports, module) {
  var a = require('a');
  a.doSomething();
  var b = require('b');
  b.doSomething(); // 依赖就近，延迟执行
})
```

```html
<!-- 现在网页中引入require.js及主入口模块 -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.5/require.js" data-main="main"></script>
  <script>
     seajs.use('./main.js')  
  </script>
```

```javascript
// main.js
define(function(require, exports, module) {
    console.log('require main')
    var math = require('./add');
    console.log(math.add(1, 2))
    var $ = require('./jquery'); 
    // 输出顺序为：
    // require main
    // require add
    // 3
    // require jquery， 从这里看出，cmd是延迟执行的
});
```

```javascript
// add.js
define(function(require, exports, module) {
  console.log('require add')
  var add = function(x, y) {
    return x + y
  }
  exports.add = add
});
```

```javascript
// jquery
define(function(require, exports, module) {
  console.log('require jquery')
  exports.$ = 'jquery'
});
```

sea.js的大致流程：

1. 通过回调函数Function.toString函数，使用正则表达式捕捉内部的require字段，找到内部依赖的模块

2. 根据配置文件，找到模块的实际路径

3. 根据文件实际路径，在dom中插入script节点，绑定加载完成的事件，使得加载完成后将js文件绑定到rquire模块指定的id上

4. 回调函数内部依赖js全部加载（暂不调用）完成后，调用回调函数

5. 当回调函数调用require('jquery')，即执行绑定在jquery这个id上的js文件

### UMD(Universal Module Defination)

UMD是AMD和CommonJS的糅合，希望解决跨平台的解决方案

```javascript
// add.js
export default function add(a, b) {
   return a + b
}
```
```javascript
// index.js
export let sum = add(1, 2)
```

通过rollup打包工具生成umd格式的打包文件

```
 rollup index.js --file bundle.js --format umd --name getSum
```

```javascript
(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
   typeof define === 'function' && define.amd ? define(['exports'], factory) :
   (factory((global.getSum = {})));
}(this, (function (exports) { 'use strict';

   function add(a, b) {
      return a + b
   }

   let sum = add(1, 2);

   exports.sum = sum;

   Object.defineProperty(exports, '__esModule', { value: true });

})));

```
大致的流程为：

1. 先判断是否支持Node.js的模块，支持则使用Node.js模块模式
2. 再判断是否支持AMD，支持则使用AMD方式加载模块
3. 最后都不支持，只能注册到全局

### ES6 Module
ES6在语言标准的层面上，实现了模块功能，而且实现得相当简单，旨在成为浏览器和服务器通用的模块解决方案。

```javascript
// a.js
var foo = 'foo'
var bar = 'bar'
export { foo, bar};

// b.js
import {foo, bar} from 'a.js'
// 或者
import * as util from 'a.js'

console.log(util.foo, util.bar);
```

前面的例子使用import命令时，用户需要知道所要加载的变量名或者函数名，否则无法加载，export default命令为模块指定了默认输出

```javascript
// a.js
export default function() {
  console.log('foo')
}

// b.js
import customName from 'b.js';
customName() // foo
```

**Node加载**
Node对ES6模块的处理比较麻烦，因为它又自己的CommonJS模块格式，与ES6模块格式是不兼容的。目前的解决方案是，将两者分开，ES6模块和CommonJS采用各自的加载方案。

Node要求ES6模块采用.mjs后缀文件名，这项功能还在试验阶段，安装Node v8.5.0或以上版本，要用 --experimental-modules 参数才能打开该功能

```
 node --experimental-modules my-app.mjs
```

**ES6模块与CommonJS模块的差异**

- CommonJS模块输出的是一个值的拷贝(见上面的举例，一旦输出一个值，模块内部就影响不到这个值)，ES6模块输出的是值的引用。

JS引擎对脚本静态分析的时候，遇到模块加载命令import，就会生成一个只读引用。等脚本真正执行是，再根据这个只读引用，到被加载的哪个模块里面去取值。


```javascript
// main.js
import './x'
import './y'

// x.js
import { c } from './mod'
c.add()

// y.js
import { c } from './mod'

c.show()
```

```javascript
// mod.js
function C() {
  this.sum = 0;
  this.add = function() {
    this.sum += 1;
  }
  this.show = function() {
    console.log(this.sum)
  }
}

export let c = new C()
```

以上输出结果为 1, 说明ES6模块是动态地去被加载的模块取值，并且变量总是绑定其所在的模块。

- CommonJS模块是运行时加载，ES6模块是编译时输出接口

CommonJS加载的是一个对象（即module.exports属性），该对象只有在脚本运行完才会生成。而ES6模块不是对象，它的对外接口只是一种静态定义，在代码静态解析阶段就会生成


参考资料：
[JavaScript 模块化七日谈](https://huangxuan.me/js-module-7day/#/)
[前端模块化：CommonJS,AMD,CMD,ES6](https://juejin.im/post/5aaa37c8f265da23945f365c)
[Module的加载实现](http://es6.ruanyifeng.com/#docs/module-loader)
[LABjs、RequireJS、SeaJS 哪个最好用？为什么？](https://www.zhihu.com/question/20342350/answer/32484869)


