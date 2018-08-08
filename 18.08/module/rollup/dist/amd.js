define(['exports'], function (exports) { 'use strict';

   function add(a, b) {
      return a + b
   }

   let sum = add(1, 2);

   exports.sum = sum;

   Object.defineProperty(exports, '__esModule', { value: true });

});
