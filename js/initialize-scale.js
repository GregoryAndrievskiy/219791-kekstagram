'use strict';

window.initializeScale = (function (defaultScale, increase, decrease, scaleStep, minScale, maxScale, scaleSet) {
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
});
