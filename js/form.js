'use strict';
window.form = function () {

  var KEY_CODE = {
    ENTER: 13,
    ESCAPE: 27
  };
  var filters = {
    chrome: {actual: null, default: 1, nameOfClass: 'filter-chrome', names: 'grayscale', units: '', multiplier: 1},
    sepia: {actual: null, default: 1, nameOfClass: 'filter-sepia', names: 'sepia', units: '', multiplier: 1},
    marvin: {actual: null, default: 100, nameOfClass: 'filter-marvin', names: 'invert', units: '%', multiplier: 100},
    phobos: {actual: null, default: 3, nameOfClass: 'filter-phobos', names: 'blur', units: 'px', multiplier: 3},
    heat: {actual: null, default: 3, nameOfClass: 'filter-heat', names: 'brightness', units: '', multiplier: 3},
    none: {nameOfClass: 'filter-none', names: 'none', units: ''}
  };

  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadForm = document.querySelector('#upload-select-image');
  var uploadFile = uploadForm.elements.filename;
  var uploadCancel = uploadOverlay.querySelector('.upload-form-cancel');
  var uploadPreview = uploadOverlay.querySelector('.filter-image-preview');
  uploadForm.classList.remove('invisible');
  uploadOverlay.classList.add('invisible');
  uploadPreview.classList.add('filter-none');

// наложение фильтров
  var uploadControls = uploadOverlay.querySelector('.upload-filter-controls');
  var uploadFilterLevel = uploadOverlay.querySelector('.upload-filter-level');
  var uploadFilterNone = uploadControls.querySelector('#upload-filter-none');
  var uploadLine = uploadOverlay.querySelector('.upload-filter-level-line');
  var uploadPin = uploadOverlay.querySelector('.upload-filter-level-pin');
  var uploadVal = uploadOverlay.querySelector('.upload-filter-level-val');
  var maxPosition = 455;
  var minPosition = 0;
  uploadFilterLevel.classList.add('invisible');
  uploadLine.setAttribute('dropzone', 'move');
  uploadPin.setAttribute('draggabel', 'true');
  uploadVal.style.maxWidth = '100%';
  function setFilterClass(element, filterClass) {
    element.className = '';
    element.classList.add('filter-image-preview');
    element.classList.add(filterClass);
  }
  function applyFilter(element, filterType, filterValue, filterUnits) {
    element.style.filter = filterType + '(' + filterValue + filterUnits + ')';
  }
  var defaultPosition = function () {
    uploadPin.style.left = maxPosition + 'px';
    uploadVal.style.width = maxPosition + 'px';
  };

  window.initializeFilters(uploadControls, uploadFilterLevel, uploadPreview, uploadPin, uploadVal, uploadLine, filters, setFilterClass, applyFilter, minPosition, maxPosition, defaultPosition);

// масштабирование изобраэения
  var defaultScale = 100;
  var scaleStep = 25;
  var minScale = 25;
  var maxScale = 100;
  var uploadResizeControl = uploadOverlay.querySelector('.upload-resize-controls-value');
  var uploadDecrease = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
  var uploadIncrease = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
  uploadResizeControl.setAttribute('min', minScale + '%');
  uploadResizeControl.setAttribute('max', maxScale + '%');
  uploadResizeControl.setAttribute('step', scaleStep + '%');
  function setScale(actualScale) {
    uploadPreview.style.transform = 'scale(' + actualScale / 100 + ')';
    uploadResizeControl.setAttribute('value', actualScale + '%');
  }
  window.initializeScale(defaultScale, uploadIncrease, uploadDecrease, scaleStep, minScale, maxScale, setScale);

// публикация изображения
  var uploadDescription = uploadOverlay.querySelector('.upload-form-description');
  var uploadSubmit = uploadOverlay.querySelector('.upload-form-submit');
  uploadDescription.required = true;
  uploadDescription.setAttribute('minlength', '30');
  uploadDescription.setAttribute('maxlength', '100');
  function submitUpload() {
    var value = uploadDescription.validity;
    if (!value.valid) {
      uploadDescription.style = 'border: 1px solid red';
    }
  }
  function resetDefaults() {
    uploadPreview.className = '';
    uploadPreview.classList.add('filter-image-preview');
  }
  uploadSubmit.addEventListener('click', function () {
    submitUpload();
    resetDefaults();
    setScale(100);
  });

// управление
  var closeUploadOverlayEsc = function (evt) {
    if (evt.keyCode === KEY_CODE.ESCAPE) {
      closeUploadOverlay();
    }
  };

  var openUploadOverlay = function () {
    uploadForm.classList.add('invisible');
    uploadOverlay.classList.remove('invisible');
    document.addEventListener('keydown', closeUploadOverlayEsc);
    setScale(100);
  };

  uploadFile.addEventListener('change', function () {
    openUploadOverlay();
  });

  var closeUploadOverlay = function () {
    uploadForm.classList.remove('invisible');
    uploadOverlay.classList.add('invisible');
    uploadFilterLevel.classList.add('invisible');
    uploadFilterNone.checked = true;
    document.removeEventListener('keydown', closeUploadOverlayEsc);
    uploadPreview.style.filter = 'none';
  };

  uploadCancel.addEventListener('click', function () {
    closeUploadOverlay();
  });

  document.querySelector('.upload-form-description').addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_CODE.ESCAPE) {
      evt.stopPropagation();
    }
  });
}();
