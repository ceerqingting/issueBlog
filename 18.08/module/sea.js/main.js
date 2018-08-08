// seajs.config({
//   base: './',
//   alias: {
//     'jquery': 'jquery'
//   }
// })

define(function(require, exports, module) {
    console.log('require main')
    var math = require('./add');
    console.log(math.add(1, 2))
    var $ = require('./jquery');
    console.log($)
});