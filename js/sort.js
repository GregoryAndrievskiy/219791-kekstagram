'use strict';

window.sortPics = function () {
  function applySort(clickElement, popularFitler, newFilter, discussedFilter) {
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
  }
  return {
    applySort: applySort
  };
}();
