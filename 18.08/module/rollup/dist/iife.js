var getSum = (function (exports) {
   'use strict';

   function add(a, b) {
      return a + b
   }

   let sum = add(1, 2);

   exports.sum = sum;

   return exports;

}({}));
