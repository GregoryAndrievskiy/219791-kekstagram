'use strict';

var lines = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце-концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как-будто их избивают. Как можно было поймать такой неудачный момент?!',
];

function getLikes() {
  return Math.floor(Math.random() * (201 - 15) + 15);
}

function getComments() {

  var randomComment = [];

  function getIndex() {
    var setupIndex = Math.floor(Math.random() * 6);
    var punchIndex = Math.floor(Math.random() * 6);
    randomComment = [lines[setupIndex], lines[punchIndex]];
    return randomComment;
  }
  if (randomComment[0] === randomComment[1]) {
    getIndex();
  }
  var second = Math.floor(Math.random() + 0.5);
  if (second === 0) {
    return randomComment[0];
  } else {
    return randomComment[0] + '' + randomComment[1];
  }
}

function getUrl(i) {
  return 'photos/' + i + '.jpg';
}

var photoAlbum = [];

for (var i = 1; i < 26; i++) {
  var photoCard = {
    url: getUrl(i),
    likes: getLikes(),
    comment: getComments()
  };
  photoAlbum.push(photoCard);
}

document.querySelector('.upload-overlay').classList.add('invisible');

var pictureTemplate = document.querySelector('#picture-template').content;
var renderPhoto = function (card) {
  var photoElement = pictureTemplate.cloneNode(true);

  photoElement.querySelector('img').src = card.url;
  photoElement.querySelector('.picture-likes').textContent = card.likes;
  photoElement.querySelector('.picture-comments').textContent = card.comment;
  return photoElement;
};

var fragment = document.createDocumentFragment();
for (var n = 0; n < photoAlbum.length; n++) {
  fragment.appendChild(renderPhoto(photoAlbum[n]));
}
document.querySelector('.pictures').appendChild(fragment);
document.querySelector('.gallery-overlay').classList.remove('invisible');
document.querySelector('.gallery-overlay-image').src = photoAlbum[0].url;
document.querySelector('.likes-count').textContent = photoAlbum[0].likes;
document.querySelector('.comments-count').textContent = photoAlbum[0].comment;