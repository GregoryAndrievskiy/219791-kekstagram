'use strict';
window.initializeFilters = function (clickElement, HideElement, previewElement, dragElement, barElement, clickBar, filtersObj, setClass, setFilter, minPosition, maxPosition, defaultPosition) {
// выбор фильтра
  clickElement.addEventListener('click', function (evt) {
    if (evt.target.getElementsByTagName('input')) {
      var checked = evt.target;
      var filterName = checked.value;
      var filterNameValue = 'filter-' + filterName;
      if (filterName === 'none') {
        HideElement.classList.add('invisible');
        setClass(previewElement, filterNameValue);
        previewElement.style = '';
      } else {
        HideElement.classList.remove('invisible');
      }
      if (checked.checked) {
        var filter = filtersObj[filterName];
        var filterType = filter.names;
        var filterValue = filter.default;
        var filterUnits = filter.units;
        setClass(previewElement, filterNameValue);
        setFilter(previewElement, filterType, filterValue, filterUnits);
        previewElement.classList.add(filterNameValue);
        defaultPosition();
      }
    }
  });
// настройка фильтра
// по передвижению пина
  dragElement.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var checkedFilter = clickElement.querySelector('input[type="radio"]:checked');
    var filterName = checkedFilter.getAttribute('value');
    var filter = filtersObj[filterName];
    var filterType = filter.names;
    var filterUnits = filter.units;
    var position;
    var x = evt.clientX;
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftX = x - moveEvt.clientX;
      x = moveEvt.clientX;
      position = dragElement.offsetLeft - shiftX;
      if (position < minPosition) {
        position = minPosition;
      }
      if (position > maxPosition) {
        position = maxPosition;
      }
      dragElement.style.left = position + 'px';
      barElement.style.width = position + 'px';
      var filterValue = position * filter.multiplier / maxPosition;
      setFilter(previewElement, filterType, filterValue, filterUnits);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      HideElement.removeEventListener('mousemove', onMouseMove);
      HideElement.removeEventListener('mouseup', onMouseUp);
    };
    evt.preventDefault();
    HideElement.addEventListener('mousemove', onMouseMove);
    HideElement.addEventListener('mouseup', onMouseUp);
  });
// по клику на шкалу
  clickBar.addEventListener('click', function (clickEvt) {
    clickEvt.preventDefault();
    var position = clickEvt.clientX - clickBar.getBoundingClientRect().left;
    dragElement.style.left = position + 'px';
    barElement.style.width = position + 'px';
    var checkedFilter = clickElement.querySelector('input[type="radio"]:checked');
    var filterName = checkedFilter.getAttribute('value');
    var filter = filtersObj[filterName];
    var filterType = filter.names;
    var filterUnits = filter.units;
    var filterValue = position * filter.multiplier / maxPosition;
    setFilter(previewElement, filterType, filterValue, filterUnits);
  });
};
