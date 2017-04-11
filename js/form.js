'use strict';

(function () {

  var KEY_CODE = {
    ENTER: 13,
    ESCAPE: 27
  };

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

  uploadForm.classList.remove('invisible');
  uploadOverlay.classList.add('invisible');

  uploadDescription.required = true;
  uploadDescription.setAttribute('minlength', '30');
  uploadDescription.setAttribute('maxlength', '100');
  uploadResizeControl.setAttribute('min', '25%');
  uploadResizeControl.setAttribute('max', '100%');
  uploadResizeControl.setAttribute('step', '25%');

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
    document.removeEventListener('keydown', closeUploadOverlayEsc);
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

  function applyFilter(value) {
    var filterName = 'filter-' + value;
    uploadPreview.className = '';
    uploadPreview.classList.add('filter-image-preview');
    uploadPreview.classList.add(filterName);
  }

  var onFilterClick = function (evt) {
    if (evt.target.getElementsByTagName('input')) {
      var filter = evt.target;
      if (filter.checked) {
        var value = filter.value;
        applyFilter(value);
      }
    }
  };

  var scalePic = 100;
  var displayScale = scalePic + '%';
  uploadControls.addEventListener('click', onFilterClick);
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

