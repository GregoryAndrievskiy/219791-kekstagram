'use strict';

window.preview = function () {
  var galleryOverlay = document.querySelector('.gallery-overlay');
  var overlayImage = galleryOverlay.querySelector('.gallery-overlay-image');
  var overlayLikes = galleryOverlay.querySelector('.likes-count');
  var overlayComments = galleryOverlay.querySelector('.comments-count');
  function showDefaultOverlay(array, i, action) {
    overlayImage.src = array[i].url;
    overlayLikes.textContent = array[i].likes;
    overlayComments.textContent = array[i].comments.length;
    galleryOverlay.classList.remove('invisible');
    document.addEventListener('keydown', action);
  }
  var showOverlay = function (evt, action) {
    overlayImage.src = evt.currentTarget.querySelector('img').src;
    overlayLikes.textContent = evt.currentTarget.querySelector('.picture-likes').textContent;
    overlayComments.textContent = evt.currentTarget.querySelector('.picture-comments').textContent;
    galleryOverlay.classList.remove('invisible');
    document.addEventListener('keydown', action);
  };
  return {
    showDefaultOverlay: showDefaultOverlay,
    showOverlay: showOverlay
  };
}();
