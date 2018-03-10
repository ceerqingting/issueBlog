const assert = require('assert');
/**
 * assert.equal()
 */

assert.equal(1, 1)
assert.equal(1, '1')
// assert.equal(1, 2, '值不相等')
// assert.equal({a: {b: 1}}, {a: {b: 1}}, '对象不相等');

/**
 * assert.deepEqual()
 */
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


/**
 * assert.deepStrictEqual()
 */
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

/**
 * assert.throws()
 */
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

/** 
 * assert.doseNotThrow()
*/
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
