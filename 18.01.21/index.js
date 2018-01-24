const assert = require('assert');

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

// assert.deepEqual(obj1, obj2, '测试不通过')

assert.deepEqual(obj1, obj3)

assert.deepEqual(obj1, obj4)