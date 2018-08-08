(function (global, factory) {
   typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
   typeof define === 'function' && define.amd ? define(['exports'], factory) :
   (factory((global.getSum = {})));
}(this, (function (exports) { 'use strict';

   function add(a, b) {
      return a + b
   }

   let sum = add(1, 2);

   exports.sum = sum;

   Object.defineProperty(exports, '__esModule', { value: true });

})));
