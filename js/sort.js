'use strict';

window.sort = function (clickElement, array, popularFitler, newFilter, discussedFilter) {
  clickElement.addEventListener('click', function (evt) {
    if (evt.target.getElementsByTagName('input')) {
      var checked = evt.target;
      var filterValue = checked.value;
      if (filterValue === 'popular') {
        popularFitler();
      }
      if (filterValue === 'new') {
        newFilter();
      }
      if (filterValue === 'discussed') {
        discussedFilter();
      }
    }
  });
};
