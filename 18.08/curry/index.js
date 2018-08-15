/**
 * 实现如下功能
 *
 */

 function foo(a, b, c) {
   return a + b + c;
 }

 var curriedFoo = curry(foo);

 console.log(curriedFoo(1, 2, 3));
 console.log(curriedFoo(1)(2, 3));
 console.log(curriedFoo(1)(2)(3));
 console.log(curriedFoo(1, 2)(3));

 /**
 * 实现如下功能
 *
 */

 var border = {
   style: 'border',
   generate: function(length, measure, type, color) {
     return [this.style + ':', length + measure, type, color].join(' ') + ';';
   }
 }

 border.curriedGenerate = curry(border.generate)
 console.log(border.curriedGenerate(2)('px')('solid')('#369'))


 function curry(fn) {
   return function curried() {
    const args = [].slice.call(arguments)
    let context = this;
    if (args.length >= fn.length) {
       return fn.apply(context, args)
    } else {
       return function() {
         const rest = [].slice.call(arguments)
         return curried.apply(context, args.concat(rest))
       }
    }
  }
 }