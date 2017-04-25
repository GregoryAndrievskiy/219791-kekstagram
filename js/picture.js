'use strict';

window.picture = function () {
  function renderPictures(array) {
    var pictureTemplate = document.querySelector('#picture-template').content;
    var renderPhoto = function (arrayElement) {
      var photoElement = pictureTemplate.cloneNode(true);
      photoElement.querySelector('img').src = arrayElement.url;
      photoElement.querySelector('.picture-likes').textContent = arrayElement.likes;
      photoElement.querySelector('.picture-comments').textContent = arrayElement.comments.length;
      return photoElement;
    };
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < array.length; i++) {
      fragment.appendChild(renderPhoto(array[i]));
    }
    document.querySelector('.pictures').appendChild(fragment);
  }
  return {
    renderPictures: renderPictures
  };
}();
