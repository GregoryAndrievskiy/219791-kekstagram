'use strict';

var lines = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!'
];

function getSingleComment() {

  var randomComment = [];

  function getIndex() {
    var setupIndex = Math.floor(Math.random() * lines.length);
    var punchIndex = Math.floor(Math.random() * lines.length);
    randomComment = [lines[setupIndex], lines[punchIndex]];
    return randomComment;
  }
  if (randomComment[0] === randomComment[1]) {
    getIndex();
  }
  var doubleCommentChance = 0.5;
  if (Math.random() < doubleCommentChance) {
    return randomComment[0];
  } else {
    return randomComment[0] + '' + randomComment[1];
  }
}

function getComments() {
  var photoCommentArr = [];
  var maxCount = 10;
  var count = Math.floor(Math.random() * maxCount);
  for (var m = 1; m < count; m++) {
    photoCommentArr.push(getSingleComment());
  }
  return photoCommentArr;
}

function getUrl(i) {
  return 'photos/' + i + '.jpg';
}

function getLikes() {
  var maxLikes = 200;
  var minLikes = 15;
  return Math.floor(Math.random() * (maxLikes + 1 - minLikes) + minLikes);
}

var photoAlbum = [];

for (var i = 0; i < 25; i++) {
  var photoCard = {
    url: getUrl(i + 1),
    likes: getLikes(),
    comments: getComments()
  };
  photoAlbum.push(photoCard);
}

document.querySelector('.upload-overlay').classList.add('invisible');

var pictureTemplate = document.querySelector('#picture-template').content;

var renderPhoto = function (card) {
  var photoElement = pictureTemplate.cloneNode(true);
  photoElement.querySelector('img').src = card.url;
  photoElement.querySelector('.picture-likes').textContent = card.likes;
  photoElement.querySelector('.picture-comments').textContent = card.comments.length;
  return photoElement;
};

var fragment = document.createDocumentFragment();

for (var pic = 0; pic < photoAlbum.length; pic++) {
  fragment.appendChild(renderPhoto(photoAlbum[pic]));
}

var galleryOverlay = document.querySelector('.gallery-overlay');
var galleryOverlayClose = galleryOverlay.querySelector('.gallery-overlay-close');
var overlayImage = galleryOverlay.querySelector('.gallery-overlay-image');
var overlayLikes = galleryOverlay.querySelector('.likes-count');
var overlayComments = galleryOverlay.querySelector('.comments-count');

document.querySelector('.pictures').appendChild(fragment);

function showDefaultOverlay(picNum) {
  overlayImage.src = photoAlbum[picNum].url;
  overlayLikes.textContent = photoAlbum[picNum].likes;
  overlayComments.textContent = photoAlbum[picNum].comments.length;
  galleryOverlay.classList.remove('invisible');
}

showDefaultOverlay(0);

var pictures = document.querySelectorAll('.picture');

var showOverlay = function (evt) {
  overlayImage.src = evt.currentTarget.querySelector('img').src;
  overlayLikes.textContent = evt.currentTarget.querySelector('.picture-likes').textContent;
  overlayComments.textContent = evt.currentTarget.querySelector('.picture-comments').textContent;
};

for (var p = 0; p < photoAlbum.length; p++) {
  pictures[p].addEventListener('click', function (evt) {
    evt.preventDefault();
    showOverlay(evt);
    galleryOverlay.classList.remove('invisible');
  }
  );
}

var closeOverlayEsc = function (evt) {
  if (evt.keyCode === 27) {
    galleryOverlay.classList.add('invisible');
  }
};

document.addEventListener('keydown', closeOverlayEsc);

var closeOverlay = function () {
  galleryOverlay.classList.add('invisible');
  document.removeEventListener('keydown', closeOverlayEsc);
};

galleryOverlayClose.addEventListener('click', function () {
  closeOverlay();
});

galleryOverlayClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    closeOverlay();
  }
});

var uploadOverlay = document.querySelector('.upload-overlay');
var uploadForm = document.querySelector('#upload-select-image');
var uploadFile = uploadForm.elements.filename;
var uploadCancel = uploadOverlay.querySelector('.upload-form-cancel');
var uploadSubmit = uploadOverlay.querySelector('.upload-form-submit');

uploadForm.classList.remove('invisible');
uploadOverlay.classList.add('invisible');

var openUploadOverlay = function () {
  uploadForm.classList.add('invisible');
  uploadOverlay.classList.remove('invisible');
  document.addEventListener('keydown', closeUploadOverlayEsc);
};

uploadFile.addEventListener('change', function () {
  openUploadOverlay();
});

var closeUploadOverlayEsc = function (evt) {
  if (evt.keyCode === 27) {
    closeUploadOverlay();
  }
};

var closeUploadOverlay = function () {
  uploadForm.classList.remove('invisible');
  uploadOverlay.classList.add('invisible');
  document.removeEventListener('keydown', closeUploadOverlayEsc);
};

uploadCancel.addEventListener('click', function () {
  closeUploadOverlay();
});

uploadSubmit.addEventListener('click', function () {
  closeUploadOverlay();
});

document.querySelector('.upload-form-description').addEventListener('keydown',
    function (evt) {
      if (evt.keyCode === 27) {
        evt.stopPropagation();
      }
    }
);
