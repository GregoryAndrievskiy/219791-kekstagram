'use strict';

window.bounce = function () {
  function debounce(func, delay) {
    var timeout;
    return function () {
      var later = function () {
        timeout = null;
        func();
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, delay);
    };
  }
  return {
    debounce: debounce
  };
}();
