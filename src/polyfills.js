/* eslint-disable */

// Array.protptype.find
// https://tc39.github.io/ecma262/#sec-array.prototype.find
if (!Array.prototype.find) {
  Object.defineProperty(Array.prototype, 'find', {
    value: function(predicate) {
     'use strict';
     if (this == null) {
       throw new TypeError('Array.prototype.find called on null or undefined');
     }
     if (typeof predicate !== 'function') {
       throw new TypeError('predicate must be a function');
     }
     var list = Object(this);
     var length = list.length >>> 0;
     var thisArg = arguments[1];
     var value;

     for (var i = 0; i < length; i++) {
       value = list[i];
       if (predicate.call(thisArg, value, i, list)) {
         return value;
       }
     }
     return undefined;
    }
  });
}

// Array.prototype.findIndex
// https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
if (!Array.prototype.findIndex) {
  Object.defineProperty(Array.prototype, 'findIndex', {
    value: function(predicate) {
     // 1. Let O be ? ToObject(this value).
      if (this == null) {
        throw new TypeError('"this" is null or not defined');
      }

      var o = Object(this);

      // 2. Let len be ? ToLength(? Get(O, "length")).
      var len = o.length >>> 0;

      // 3. If IsCallable(predicate) is false, throw a TypeError exception.
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }

      // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
      var thisArg = arguments[1];

      // 5. Let k be 0.
      var k = 0;

      // 6. Repeat, while k < len
      while (k < len) {
        // a. Let Pk be ! ToString(k).
        // b. Let kValue be ? Get(O, Pk).
        // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
        // d. If testResult is true, return k.
        var kValue = o[k];
        if (predicate.call(thisArg, kValue, k, o)) {
          return k;
        }
        // e. Increase k by 1.
        k++;
      }

      // 7. Return -1.
      return -1;
    }
  });
}

// Element.prototype.classList
// Source: https://gist.github.com/k-gun/c2ea7c49edf7b757fe9561ba37cb19ca
// (function() {
//     // helpers
//     var regExp = function(name) {
//         return new RegExp('(^| )'+ name +'( |$)');
//     };
//     var forEach = function(list, fn, scope) {
//         for (var i = 0; i < list.length; i++) {
//             fn.call(scope, list[i]);
//         }
//     };

//     // class list object with basic methods
//     function ClassList(element) {
//         this.element = element;
//     }

//     ClassList.prototype = {
//         add: function() {
//             forEach(arguments, function(name) {
//                 if (!this.contains(name)) {
//                     this.element.className += ' '+ name;
//                 }
//             }, this);
//         },
//         remove: function() {
//             forEach(arguments, function(name) {
//                 this.element.className =
//                     this.element.className.replace(regExp(name), '');
//             }, this);
//         },
//         toggle: function(name) {
//             return this.contains(name)
//                 ? (this.remove(name), false) : (this.add(name), true);
//         },
//         contains: function(name) {
//             return regExp(name).test(this.element.className);
//         },
//         // bonus..
//         replace: function(oldName, newName) {
//             this.remove(oldName), this.add(newName);
//         }
//     };

//     // IE8/9, Safari
//     if (!('classList' in Element.prototype)) {
//         Object.defineProperty(Element.prototype, 'classList', {
//             get: function() {
//                 return new ClassList(this);
//             }
//         });
//     }

//     // replace() support for others
//     if (window.DOMTokenList && DOMTokenList.prototype.replace == null) {
//         DOMTokenList.prototype.replace = ClassList.prototype.replace;
//     }
// })();
