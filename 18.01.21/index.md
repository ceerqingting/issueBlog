### [assert - 断言](http://nodejs.cn/api/assert.html#assert_assert)
#### 1. assert(value[, message])
  assert.ok()的别名

#### 2. assert.equal(actual, expected[,message])
- 使用相等运算符（==）测试actual参数与expected参数是否相等
```javascript
assert.equal(1, 1)
assert.equal(1, '1')
// assert.equal(1, 2, '值不相等')
// assert.equal({a: {b: 1}}, {a: {b: 1}}, '对象不相等');
```
#### 3. assert.deepEqual(actual, expected[,message])
- 只测试可枚举的自身属性，不测试对象原型、连接符、或不可枚举的属性

```javascript
// 不会抛出 AssertionError
assert.deepEqual(/a/gi, new Date());
```
- [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)和[Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)包含的子项也会被测试

- 子对象中可枚举的自身属性也会被测试
- 如果两个值不相等，则抛出一个带有message属性AssertionError, 如果message为undefined, 则赋予默认的错误信息

```javascript
const obj1 = {
  a: {
    b: 1
  }
};

const obj2 = {
  a: {
    b: 2
  }
}

const obj3 = {
  a: {
    b: 1
  }
}

const obj4  = Object.create(obj1);

assert.deepEqual(obj1, obj1)

// assert.deepEqual(obj1, obj2, '子对象属性不相等')

assert.deepEqual(obj1, obj3)

// assert.deepEqual(obj1, obj4, '不测试原型')

```

#### 4. assert.deepStrictEqual(actual, expected[, message])
- 原始值使用全等运算符（===）比较。Set的值和Map的键使用SameValueZero比较
- 对象的原型也使用全等运算符比较
- 对象的[类型标签](https://tc39.github.io/ecma262/#sec-object.prototype.tostring)要求相同
- 比较[对象包装器][]时，其对象和里边的值要求相同

```javascript
assert.deepEqual({ a: 1 }, { a: '1'});
// assert.deepStrictEqual({ a: 1 }, { a: '1'}, '值不全等');

const date = new Date();
const object = {};
const fakeDate = {};

Object.setPrototypeOf(fakeDate, Date.prototype);
assert.deepEqual(object, fakeDate);
// assert.deepStrictEqual(object, fakeDate,'原型不相等')

assert.deepEqual(date, fakeDate);
// assert.deepStrictEqual(date, fakeDate, '对象的类型标签不同');

// assert.deepStrictEqual(new Number(1), new Number(2), '数值对象包装器里面的数值也会被比较');

assert.deepStrictEqual(new String('foo'), Object('foo'))
```

#### 5. assert.throws(block[, error][, meesage])
- 断言block函数会抛出错误
- error参数可以是构造函数、正则表达式、或自定义函数
- 如果指定了message参数，则当block函数不抛出错误时,message参数会作为AssertionError的错误信息

```javascript
// 构造函数
 assert.throws(() => {
  throw new Error('错误信息');
},
  Error
)
// 正则表达式
 assert.throws(
   () => {
     throw new Error('错误信息');
   },
   /错误/
 );
// 自定义函数
assert.throws(
  () => {
    throw new Error('错误信息');
  },
  function(err) {
    if ((err instanceof Error) && /错误/.test(err)) {
       return true;
    }
  },
  '不是期望的错误'
)

```

#### 6. assert.doesNotThrow(block[, error][, message])
- 当抛出错误且错误类型与error参数指定的相同，则抛出AssertionError。如果错误类型不相同，或error参数为undefined，则抛出错误

```javascript
// 错误类型不匹配，抛出错误
assert.doesNotThrow(() => {
  throw new TypeError('错误信息');
  },
  SyntaxError
)

// 抛出AssertionError的message
assert.doesNotThrow(() => {
  throw new TypeError('错误信息');
  },
  TypeError,
  '抛出错误'
)
```


