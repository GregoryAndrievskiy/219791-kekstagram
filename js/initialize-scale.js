'use strict';

window.initializeScale = function () {
  function setScale(defaultScale, increase, decrease, scaleStep, minScale, maxScale, scaleSet) {
    var actualScale = defaultScale;
    increase.addEventListener('click', function () {
      if (actualScale !== maxScale) {
        actualScale += scaleStep;
      }
      scaleSet(actualScale);
      return actualScale;
    });
    decrease.addEventListener('click', function () {
      if (actualScale !== minScale) {
        actualScale -= scaleStep;
      }
      scaleSet(actualScale);
      return actualScale;
    });
  }
  return {
    setScale: setScale
  };
}();
