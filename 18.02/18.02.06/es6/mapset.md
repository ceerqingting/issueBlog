### Set 和 Map 数据结构
#### 1. set

- 类似于数组，但是成员的值都是唯一的。Set 本身是一个构造函数，用来生成Set数据结构

```javascript
const s = new Set();
[2, 3, 5, 4, 5 ,2, 2].forEach(x => s.add(x));
for (let i of s) {
  log(i);
}
// 2 3 5 4
```
- 通过add方法向Set结构加入成员，Set结构不会添加重复值
- Set 函数可接受一个数组（或者具有iterable接口的其他数据结构）作为参数，用来初始化

```javascript
// 数组
const set = new Set([1, 2, 3, 4, 4]);
log([...set])
log(set.size)

// [1, 2, 3, 4]
// 4

// 类数组
function div() {
  return [...document.querySelectorAll('div')];
}
const divSet = new Set(div());
log(divSet.size)
```
- 数组去重的一种方法

```javascript
[...new Set(array)]
```

- 向Set加入值时，不会发生类型转换，所以‘3’和3是两个不同的值，类似于===， 主要区别是NaN等于自身，而全等认为NaN不等于自身

```javascript
let equalSet = new Set(['3', 3]);
let a = NaN;
let b = NaN;
equalSet.add(a);
equalSet.add(b);
log(equalSet);
// Set { '3', 3, NaN }
```
- 两个对象总是不相等

```javascript
let objEqual = new Set();
objEqual.add({});
log(objEqual.size)

objEqual.add({});
log(objEqual.size);
log(objEqual);
//Set { {}, {} }
```

### 2. Set实例的属性和方法

**Set结构实例属性**

Set.prototype.constructor: 构造函数，默认就是Set函数

Set.prototype.size: 返回Set实例的成员总数

**Set实例方法**
1. 操作方法
- add(value): 添加某个值，返回Set结构本身
- delete(value): 删除某个值，返回一个布尔值，表示删除是否成功
- has(vallue): 返回一个布尔值，表示该值是否为Set的成员
- clear(): 清除所有成员，没有返回值

判断是否包含一个键

```javascript
 // 对象写法
const properties = {
  'width': 1,
  'height': 1
}
if (properties['width']) {
  log(true)
}
// Set写法
const propertiesSet = new Set(['width', 'height']);
if (propertiesSet.has('width')) {
  log(true)
}

```
Array.from方法可以将Set结构转为数组，数组去重另一种方法
```javascript
function dedupe(array){
  return Array.from(new Set(array));
}
log(dedupe([1, 1, 2, 3]))
// [1, 2, 3]
 
```
2. 遍历方法
- keys(): 返回键名的遍历器
- values(): 返回键值的遍历器
- entries(): 返回键值对的遍历器
- forEach(): 使用回调函数遍历每个成员
Set的遍历顺序就是插入顺序，比如使用Set保存一个回调函数列表，调用时就能保证按照添加顺序调用

（1）key(), values(), entries()
  由于Set结构没有键名，只有键值（或者键名和键值是同一个值），所以keys()和values()方法行为完全一致

```javascript
var iteratorSet = new Set(['red', 'green', 'blue']);
for(let item of iteratorSet.keys()) {
  log(item);
}
// red
// green
// blue
for(let item of iteratorSet.values()) {
  log(item);
}
// red
// green
// blue
for(let item of iteratorSet.entries()) {
  log(item);
}
// [ 'red', 'red' ]
// [ 'green', 'green' ]
// [ 'blue', 'blue' ]
```
Set结构的实例默认可遍历，它的默认遍历器生成函数就是它的values方法，所以可以直接用for...of循环遍历Set
```javascript
log(Set.prototype[Symbol.iterator] === Set.prototype.values);
// true

for (let x of iteratorSet) {
  log(x);
}
// red
// green
// blue

```
（2）forEach

Set也可以用forEach对每个成员执行某种操作，没有返回值，第三个参数可为集合本身

```javascript
iteratorSet.forEach((value, key) => log(key + ':' + value ));
// red:red
// green:green
// blue:blue
```
（3）遍历的应用

实现交集、并集、差集

```javascript
let set1 = new Set([1, 2, 3]);
set1 = new Set([...set1].map(x => x * 2));
log(set1);
//Set { 2, 4, 6 }

let set2 = new Set([1, 2, 3, 4, 5]);
set2 = new Set([...set].filter(x => x % 2 == 0));
log(set2);
// Set { 2, 4 }

let c = new Set([1, 2, 3]);
let d = new Set([4, 3, 2]);

//并集
let union = new Set([...c, ...d]);

//交集
let intersect = new Set([[...c].filter( x => d.has(x))]);

//差集
let difference = new Set([[...c].filter( x => !d.has(x))])

log(union, intersect, difference);
//Set { 1, 2, 3, 4 } Set { [ 2, 3 ] } Set { [ 1 ] }
```
如果想在遍历操作中个，同步改变原来的Set结构，目前没有直接的方法。两种变通方法，一种是利用原Set结构映射出一个新的结构，然后赋值给原来的Set结构;另一种利用Array.from方法
```javascript
let changeSet1 = new Set([1, 2, 3]);
changeSet1 = new Set([...set].map(val => val * 2));

let changeSet2 = new Set([1, 2, 3]);
changeSet2 = new Set(Array.from(set, val => val * 2));

log(changeSet1, changeSet2);
// Set { 2, 4, 6, 8 } Set { 2, 4, 6, 8 }
```