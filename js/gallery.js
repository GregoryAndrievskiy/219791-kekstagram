'use strict';
(function () {

  var KEY_CODE = {
    ENTER: 13,
    ESCAPE: 27
  };

  var onLoad = function (photoArray) {
    window.picture.renderPictures(photoArray);
    window.preview.showDefaultOverlay(photoArray, 5, closeOverlayEsc);
    onPictureClick();
  };

  var error = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'position: absolute; fontSize: 30px; z-index: 100; margin: 0 auto; text-align: center; background-color: red; left: 0; right: 0;';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var onPictureClick = function () {
    var picture = document.querySelectorAll('.picture');
    picture.forEach(function (element) {
      element.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.preview.showOverlay(evt, closeOverlayEsc);
      });
    });
  };

  window.load(onLoad, error);

  var galleryOverlay = document.querySelector('.gallery-overlay');
  var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');

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
})();
