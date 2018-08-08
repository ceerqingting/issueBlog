console.log('add')

define(function(require, exports, module) {
  console.log('require add')
  var add = function(x, y) {
    return x + y
  }
  exports.add = add
});