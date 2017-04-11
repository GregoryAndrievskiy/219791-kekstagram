'use strict';
(function () {

  var KEY_CODE = {
    ENTER: 13,
    ESCAPE: 27
  };

  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');
  var photoAlbum = window.data.photoAlbum;

  window.picture.renderPictures(photoAlbum);

  var pictures = document.querySelectorAll('.picture');

  document.querySelector('.upload-overlay').classList.add('invisible');

  var closeOverlay = function () {
    galleryOverlay.classList.add('invisible');
    document.removeEventListener('keydown', closeOverlayEsc);
  };

  var closeOverlayEsc = function (evt) {
    if (evt.keyCode === KEY_CODE.ESCAPE) {
      galleryOverlay.classList.add('invisible');
    }
  };

  galleryOverlayClose.addEventListener('click', function () {
    closeOverlay();
  });

  galleryOverlayClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === KEY_CODE.ENTER) {
      closeOverlay();
    }
  });

  window.preview.showDefaultOverlay(photoAlbum, 0, closeOverlayEsc);

  pictures.forEach(function (element) {
    element.addEventListener('click', function (evt) {
      evt.preventDefault();
      window.preview.showOverlay(evt, closeOverlayEsc);
      galleryOverlay.classList.remove('invisible');
    });
  });

})();
