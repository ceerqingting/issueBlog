> 编写一个Javascript函数uniqueNums, 该函数有一个参数n (一个不大于31的整数)，其返回值是一个数据，该数组内是n个随机且不重复的整数，且整数取值范围是[2,32]








```javascript
    function getRand(a, b) {
      var rand = Math.round(Math.random()*(b-a) + a);
      return rand;
    }

    function checkArrIn(rand, array) {
      if (array.indexOf(rand) > -1) {
        return true;
      }
      return false;
    }
    function fn(n, min, max) {
      debugger;
      var arr = [];
      var isNum = !isNaN(Number(n)); 
      var isRandOk = (n >=min && n<=max && n<= (max-min + 1)) ? true : false;
      if (n && isRandOk && isNum) {
        for (var i = 0; i < n; i++) {
          var rand = getRand(min, max);
          if (checkArrIn(rand, arr)){
            i--
          } else {
            arr.push(rand);
          }
        }
      }
      return arr;
    }

```