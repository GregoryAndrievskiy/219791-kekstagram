'use strict';
(function () {

  var KEY_CODE = {
    ENTER: 13,
    ESCAPE: 27
  };

// сортировка галереи изображений
  var filters = document.querySelector('.filters');
  var pictureContainer = document.querySelector('.pictures');
  var lastTimeout;

// функция задержки сортировки
  var debounce = function (action) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(action, 500);
  };

// сортировка по количеству комментариев
  var getRank = function (array) {
    var rank;
    rank = array.comments.length;
    return rank;
  };

// сортировка по количеству лайков
  var likesComparator = function (left, right) {
    if (left < right) {
      return 1;
    } else if (left > right) {
      return -1;
    } else {
      return 0;
    }
  };

// показать варианты сортировки галереии изображений
  function showFilters() {
    filters.classList.remove('hidden');
  }

// популярные фотографии (исходный массив)
  function popularPictures(array) {
    pictureContainer.innerHTML = '';
    window.picture.renderPictures(array);
    onPictureClick();
  }

// новые фотографии (10 любых из исходного массива)
  function newPictures(array) {
    var newArray = array.slice(0);
    function compareRandom() {
      return Math.random() - 0.5;
    }
    newArray = newArray.sort(compareRandom);
    newArray = newArray.slice(0, 10);
    pictureContainer.innerHTML = '';
    window.picture.renderPictures(newArray);
    onPictureClick();
  }

// фотографии отсортированы по уменьшению количества комментрариев (при их равестве - порядок по уменьшению количества лайков)
  function discussedPictures(array) {
    var newArray = array.slice(0);
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

// при успешной загрузке данных с сервера
  var onLoad = function (data) {
    var photoArray = data;
    window.picture.renderPictures(photoArray);
    window.preview.showDefaultOverlay(photoArray, 5, closeOverlayEsc);
    showFilters();
    window.sort(filters, photoArray, popularPictures, newPictures, discussedPictures, debounce);
    onPictureClick();
  };

// при ошибке загрузке данных с сервера
  var error = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'position: absolute; font: 32px "Open Sans"; z-index: 100; margin: 0 auto; text-align: center; background-color: red; left: 0; right: 0;';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

// показать увеличенную фотографию по клику по элементу галереи
  var onPictureClick = function () {
    var picture = document.querySelectorAll('.picture');
    picture.forEach(function (element) {
      element.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.preview.showOverlay(evt, closeOverlayEsc);
      });
    });
  };

// рендер галереи изображений
  var url = 'https://intensive-javascript-server-kjgvxfepjl.now.sh/kekstagram/data';
  window.load(url, onLoad, error);

// закрытие превью фотографии с клавиатуры
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
