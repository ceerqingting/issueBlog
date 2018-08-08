(function(modules) {})
    var installedModules = {};

    // The require function
    function __webpack_require__(moduleId) {

      // Check if module is in cache
      if(installedModules[moduleId]) {
        return installedModules[moduleId].exports;
      }
      // Create a new module (and put it into the cache)
      var module = installedModules[moduleId] = {
        i: moduleId,
        l: false,
        exports: {}
      };

      // Execute the module function
      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

      // Flag the module as loaded
      module.l = true;

      // Return the exports of the module
      return module.exports;
    }
	// define __esModule on exports
    __webpack_require__.r = function(exports) {
      if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
      }
      Object.defineProperty(exports, '__esModule', { value: true });
    };
    // define getter function for harmony exports
    __webpack_require__.d = function(exports, name, getter) {
      if(!__webpack_require__.o(exports, name)) {
        Object.defineProperty(exports, name, { enumerable: true, get: getter });
      }
    };
    // Object.prototype.hasOwnProperty.call
     __webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
     
    // Load entry module and return exports
 	    return __webpack_require__(__webpack_require__.s = "./index.js");

({"./add.js": (function(module, __webpack_exports__, __webpack_require__) {
  "use strict";
  __webpack_require__.r(__webpack_exports__);
  __webpack_require__.d(__webpack_exports__, "default", function() { return add; });
  function add(a, b) {
    return a + b
  }
}),

"./index.js": (function(module, __webpack_exports__, __webpack_require__) {})
});