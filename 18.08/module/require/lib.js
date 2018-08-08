define(function(require, exports, module) {
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