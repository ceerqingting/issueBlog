var add = require('../add.js');
var expect = require('chai').expect;

describe('加法函数的测试', function(){
  it('1加1应该等于2', function(){
    expect(add(1,1)).to.be.equal(2);
  })
})