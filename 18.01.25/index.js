var num1 = "843529812342341234";
var num2 = "236124361425345435";

function add(a, b) {
  var numA = a.split('').reverse();
  var numB = b.split('').reverse();
  var len = Math.max(numA.length, numB.length);
  var isNeed = 0;
  var newNum = [];
  for(var i = 0; i < len; i++) {
    var addNum = Number(numA[i]||0) + Number(numB[i]||0) + isNeed;
    if (addNum >= 10) {
       isNeed = 1;
    } else {
       isNeed = 0;
    }
    addNum -= 10;
    newNum.unshift(addNum);
  }
  return newNum.join('');
}
console.log(add(num1, num2));