'use strict';
window.pictureUpload = function (uploadOverlay) {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];
  var fileChooser = document.querySelector('.upload input[type=file]');
  var preview = document.querySelector('.filter-image-preview');
  var filterPreview = document.querySelectorAll('.upload-filter-preview');

  function filterPreviewImage(element, pic) {
    element.style.backgroundImage = 'url(' + pic.result + ')';
  }

  var checkNLoadFile = function (file) {
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
        filterPreview.forEach(function (item) {
          filterPreviewImage(item, reader);
        });
        uploadOverlay();
      });
      reader.readAsDataURL(file);
    }
  };

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    checkNLoadFile(file);
  });

// загрузка перетаскиванием
  var dropzone;
  dropzone = document.querySelector('.upload-control');
  dropzone.addEventListener('dragenter', dragenter, false);
  dropzone.addEventListener('dragover', dragover, false);
  dropzone.addEventListener('drop', drop, false);

  function dragenter(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function dragover(e) {
    e.stopPropagation();
    e.preventDefault();
  }

  function drop(e) {
    e.stopPropagation();
    e.preventDefault();

    var data = e.dataTransfer;
    var file = data.files[0];
    checkNLoadFile(file);
  }
};
