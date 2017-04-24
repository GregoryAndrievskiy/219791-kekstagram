'use strict';

window.debounce = function (func, delay) {
  var timeout;
  return function () {
    var later = function () {
      timeout = null;
      func();
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  };
};
