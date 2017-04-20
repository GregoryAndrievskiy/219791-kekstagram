'use strict';
window.sort = function (clickElement, array, callback1, callback2, callback3, callback4) {
  clickElement.addEventListener('click', function (evt) {
    if (evt.target.getElementsByTagName('input')) {
      var checked = evt.target;
      var filterValue = checked.value;
      if (filterValue === 'popular') {
        callback4(function () {
          callback1(array);
        }, 500);
      }
      if (filterValue === 'new') {
        callback4(function () {
          callback2(array);
        }, 500);
      }
      if (filterValue === 'discussed') {
        callback4(function () {
          callback3(array);
        }, 500);
      }
    }
  });
};
