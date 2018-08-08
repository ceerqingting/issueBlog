var num = 3;
var obj = {a: 1}
function add() {
  obj.b = 2
  num++;
}
function getNum() {
  return num;
}
console.log(this)
module.exports = {
  num: num,
  add: add,
  getNum: getNum,
  obj: obj
}