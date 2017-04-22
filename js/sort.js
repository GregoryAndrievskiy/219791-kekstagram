'use strict';
window.sort = function (clickElement, array, callback1, callback2, callback3) {
  clickElement.addEventListener('click', function (evt) {
    if (evt.target.getElementsByTagName('input')) {
      var checked = evt.target;
      var filterValue = checked.value;
      if (filterValue === 'popular') {
        callback1();
      }
      if (filterValue === 'new') {
        callback2();
      }
      if (filterValue === 'discussed') {
        callback3();
      }
    }
  });
};
