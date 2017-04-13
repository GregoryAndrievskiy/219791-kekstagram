'use strict';

(function () {

  var KEY_CODE = {
    ENTER: 13,
    ESCAPE: 27
  };

  var filters = {

    chrome: {
      default: 1,
      nameOfClass: 'filter-chrome',
      names: 'grayscale',
      units: '',
      multiplier: 1
    },

    sepia: {
      default: 1,
      nameOfClass: 'filter-sepia',
      names: 'sepia',
      units: '',
      multiplier: 1
    },

    marvin: {
      default: 100,
      nameOfClass: 'filter-marvin',
      names: 'invert',
      units: '%',
      multiplier: 100
    },
    phobos: {
      default: 3,
      nameOfClass: 'filter-phobos',
      names: 'blur',
      units: 'px',
      multiplier: 3
    },

    heat: {
      default: 3,
      nameOfClass: 'filter-heat',
      names: 'brightness',
      units: '',
      multiplier: 3
    },

    none: {
      nameOfClass: 'filter-none',
      names: 'none',
      units: ''
    }
  };

  var maxPosition = 455;
  var minPosition = 0;

  var uploadOverlay = document.querySelector('.upload-overlay');
  var uploadForm = document.querySelector('#upload-select-image');
  var uploadFile = uploadForm.elements.filename;
  var uploadDescription = uploadOverlay.querySelector('.upload-form-description');
  var uploadResizeControl = uploadOverlay.querySelector('.upload-resize-controls-value');
  var uploadCancel = uploadOverlay.querySelector('.upload-form-cancel');
  var uploadSubmit = uploadOverlay.querySelector('.upload-form-submit');
  var uploadPreview = uploadOverlay.querySelector('.filter-image-preview');
  var uploadControls = uploadOverlay.querySelector('.upload-filter-controls');
  var uploadResize = uploadOverlay.querySelector('.upload-resize-controls-value');
  var uploadDecrease = uploadOverlay.querySelector('.upload-resize-controls-button-dec');
  var uploadIncrease = uploadOverlay.querySelector('.upload-resize-controls-button-inc');
  var uploadFilterLevel = uploadOverlay.querySelector('.upload-filter-level');
  var uploadFilterNone = uploadControls.querySelector('#upload-filter-none');
  var uploadLine = uploadOverlay.querySelector('.upload-filter-level-line');
  var uploadPin = uploadOverlay.querySelector('.upload-filter-level-pin');
  var uploadVal = uploadOverlay.querySelector('.upload-filter-level-val');

  uploadFilterLevel.classList.add('invisible');
  uploadForm.classList.remove('invisible');
  uploadOverlay.classList.add('invisible');
  uploadPreview.classList.add('filter-none');
  uploadLine.setAttribute('dropzone', 'move');
  uploadPin.setAttribute('draggabel', 'true');
  uploadVal.style.maxWidth = '100%';
  uploadDescription.required = true;
  uploadDescription.setAttribute('minlength', '30');
  uploadDescription.setAttribute('maxlength', '100');
  uploadResizeControl.setAttribute('min', '25%');
  uploadResizeControl.setAttribute('max', '100%');
  uploadResizeControl.setAttribute('step', '25%');

  var defaultLevel = function () {
    uploadPin.style.left = maxPosition + 'px';
    uploadVal.style.width = maxPosition + 'px';
  };

  var closeUploadOverlayEsc = function (evt) {
    if (evt.keyCode === KEY_CODE.ESCAPE) {
      closeUploadOverlay();
    }
  };

  var openUploadOverlay = function () {
    uploadForm.classList.add('invisible');
    uploadOverlay.classList.remove('invisible');
    document.addEventListener('keydown', closeUploadOverlayEsc);
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
    uploadControls.removeEventListener('click', applyFilter);
    applyDefaultFilter();
  };

  uploadCancel.addEventListener('click', function () {
    closeUploadOverlay();
  });

  document.querySelector('.upload-form-description').addEventListener('keydown',
      function (evt) {
        if (evt.keyCode === KEY_CODE.ESCAPE) {
          evt.stopPropagation();
        }
      }
  );

  var applyFilter = function (evt) {
    if (evt.target.getElementsByTagName('input')) {
      var checked = evt.target;
      var value = checked.value;
      if (value === 'none') {
        uploadFilterLevel.classList.add('invisible');
        uploadPreview.style.filter = 'none';
      } else {
        uploadFilterLevel.classList.remove('invisible');
      }
      if (checked.checked) {
        var filter = filters[value];
        var filterValue = 'filter-' + value;
        var filterType = filter.names;
        var filterStock = filter.default;
        var filterUnits = filter.units;
        uploadPreview.className = '';
        uploadPreview.style.filter = filterType + '(' + filterStock + filterUnits + ')';
        uploadPreview.classList.add('filter-image-preview');
        uploadPreview.classList.add(filterValue);
        defaultLevel();
      }
    }
  };

  var applyDefaultFilter = function () {
    var filterValue = 'filter-' + 'none';
    uploadPreview.className = '';
    uploadPreview.style.filter = 'none';
    uploadPreview.classList.add('filter-image-preview');
    uploadPreview.classList.add(filterValue);
    defaultLevel();
  };

  var filterName;
  var setFilter = function (name, levelPosition) {
    uploadPreview.style.filter = filterName.names + '(' + levelPosition * name.multiplier / maxPosition + name.units + ')';
  };

  var onMouseClick = function (clickEvt) {
    clickEvt.preventDefault();
    var position = clickEvt.clientX - uploadLine.getBoundingClientRect().left;
    uploadPin.style.left = position + 'px';
    uploadVal.style.width = position + 'px';
    var checkedFilter = uploadOverlay.querySelector('input[type="radio"]:checked');
    filterName = filters[checkedFilter.getAttribute('value')];
    setFilter(filterName, position);
  };

  uploadControls.addEventListener('click', applyFilter);
  uploadPin.addEventListener('mousedown', adjustFilter);
  uploadLine.addEventListener('click', onMouseClick);

  function adjustFilter(evt) {
    evt.preventDefault();

    var checkedFilter = uploadOverlay.querySelector('input[type="radio"]:checked');
    filterName = filters[checkedFilter.getAttribute('value')];

    var position;
    var x = evt.clientX;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shiftX = x - moveEvt.clientX;
      x = moveEvt.clientX;
      position = uploadPin.offsetLeft - shiftX;
      if (position < minPosition) {
        position = 0;
      }
      if (position > maxPosition) {
        position = 455;
      }
      uploadPin.style.left = position + 'px';
      uploadVal.style.width = position + 'px';
      setFilter(filterName, position);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      uploadOverlay.removeEventListener('mousemove', onMouseMove);
      uploadOverlay.removeEventListener('mouseup', onMouseUp);
    };
    evt.preventDefault();
    uploadOverlay.addEventListener('mousemove', onMouseMove);
    uploadOverlay.addEventListener('mouseup', onMouseUp);
  }

  var scalePic = 100;
  var displayScale = scalePic + '%';
  uploadResize.setAttribute('value', displayScale);

  function decreaseScale() {
    if (scalePic === 25) {
      return scalePic;
    }
    scalePic -= 25;
    displayScale = scalePic + '%';
    uploadResize.setAttribute('value', displayScale);
    uploadPreview.style.transform = 'scale(' + scalePic / 100 + ')';
    return scalePic;
  }

  function increaseScale() {
    if (scalePic === 100) {
      return scalePic;
    }
    scalePic += 25;
    displayScale = scalePic + '%';
    uploadResize.setAttribute('value', displayScale);
    uploadPreview.style.transform = 'scale(' + scalePic / 100 + ')';
    return scalePic;
  }

  function submitUpload() {
    var value = uploadDescription.validity;
    if (!value.valid) {
      uploadDescription.style = 'border: 1px solid red';
    }
  }

  function resetDefaults() {
    scalePic = 100;
    uploadPreview.className = '';
    uploadPreview.classList.add('filter-image-preview');
  }

  uploadIncrease.addEventListener('click', increaseScale);
  uploadDecrease.addEventListener('click', decreaseScale);
  uploadSubmit.addEventListener('click', function () {
    submitUpload();
    resetDefaults();
  });
})();

