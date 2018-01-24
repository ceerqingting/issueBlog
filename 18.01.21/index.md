### assert - 断言
#### 1. assert(value[, message])
  assert.ok()的别名

#### 2. assert.deepEqual(actual, expected[,message])
- 只测试可枚举的自身属性，不测试对象原型、连接符、或不可枚举的属性

```javascript
// 不会抛出 AssertionError
assert.deepEqual(/a/gi, new Date());
```
- (Map)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map]和(Set)[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set]包含的子项也会被测试

- 子对象中可枚举的自身属性也会被测试
- 如果两个值不相等，则抛出一个带有message属性AssertionError, 如果message为undefined, 则赋予默认的错误信息

#### 3. assert.equal(actual, expected[,message])
- 使用相等运算符（==）测试actual参数与expected参数是否相等


