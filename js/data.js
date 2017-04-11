'use strict';

window.data = (function () {

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
  return {
    photoAlbum: photoAlbum
  };
})();
