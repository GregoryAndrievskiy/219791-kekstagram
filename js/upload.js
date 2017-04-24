'use strict';
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var fileChooser = document.querySelector('.upload input[type=file]');
  var preview = document.querySelector('.filter-image-preview');
  var filterPreview = document.querySelectorAll('.upload-filter-preview');

  function changeFilterPreview(array, file) {
    function filterPreviewImage(element, pic) {
      element.style.backgroundImage = 'url(' + pic.result + ')';
    }
    array.forEach(function (item) {
      filterPreviewImage(item, file);
    });
  }

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        preview.src = reader.result;
        preview.style.width = '586px';
        changeFilterPreview(filterPreview, reader);
      });
      reader.readAsDataURL(file);
    }
  });
})();
