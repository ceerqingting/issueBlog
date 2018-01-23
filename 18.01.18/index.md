> 编写一个Javascript函数uniqueNums, 该函数有一个参数n (一个不大于31的整数)，其返回值是一个数据，该数组内是n个随机且不重复的整数，且整数取值范围是[2,32]




```javascript
 function getRand(a, b) {
      return Math.round(Math.random()*(a-b)) + b;
    }
    function isArrIn(arr, n) {
      if (arr.indexOf(n) > -1) {
        return true;
      }
      return false;
    }
    function fn(n, max, min) {
      var arr = [];
      if (n && n <= max-min) {
        for (var i = 0 ;i < n; i ++) {
         var rand = getRand(max, min); 
          if (isArrIn(arr, rand)) {
            i--;
          } else {
            arr.push(rand);
          }
        }
      }
      console.log(arr);
    }
    fn (2, 5, 3);

```