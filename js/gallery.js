'use strict';

(function () {
  var photoArray = [];
  var KEY_CODE = {
    ENTER: 13,
    ESCAPE: 27
  };
  var filters = document.querySelector('.filters');
  var pictureContainer = document.querySelector('.pictures');
  var getRank = function (array) {
    var rank;
    rank = array.comments.length;
    return rank;
  };
  var likesComparator = function (left, right) {
    if (left < right) {
      return 1;
    } else if (left > right) {
      return -1;
    } else {
      return 0;
    }
  };
  function showFilters() {
    filters.classList.remove('hidden');
  }
  function popularPictures() {
    var newArray = photoArray.slice(0);
    pictureContainer.innerHTML = '';
    window.picture.renderPictures(newArray);
    onPictureClick();
  }
  function newPictures() {
    var newArray = photoArray.slice(0);
    function compareRandom() {
      return Math.random() - 0.5;
    }
    newArray = newArray.sort(compareRandom);
    newArray = newArray.slice(0, 10);
    pictureContainer.innerHTML = '';
    window.picture.renderPictures(newArray);
    onPictureClick();
  }
  function discussedPictures() {
    var newArray = photoArray.slice(0);
    pictureContainer.innerHTML = '';
    newArray = newArray.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = likesComparator(left.likes, right.likes);
      }
      return rankDiff;
    });
    window.picture.renderPictures(newArray);
    onPictureClick();
  }
  var debouncePopular = window.debounce(popularPictures, 500);
  var debounceNew = window.debounce(newPictures, 500);
  var debounceDiscussed = window.debounce(discussedPictures, 500);
  var onLoad = function (data) {
    photoArray = data;
    window.picture.renderPictures(photoArray);
    window.preview.showDefaultOverlay(photoArray, 5, closeOverlayEsc);
    showFilters();
    window.sort(filters, photoArray, debouncePopular, debounceNew, debounceDiscussed);
    onPictureClick();
  };
  var error = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'position: absolute; font: 32px "Open Sans"; z-index: 100; margin: 0 auto; text-align: center; background-color: red; left: 0; right: 0;';
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
  var url = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';
  window.load(url, onLoad, error);
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
