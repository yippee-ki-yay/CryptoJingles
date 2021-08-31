module.exports = function (randFunc) { // eslint-disable-line
  return function random(min, max) {
    if (typeof min === 'undefined') {
      min = 1; // eslint-disable-line
    }
    if (typeof max === 'undefined') {
      max = min; // eslint-disable-line
      min = 0; // eslint-disable-line
    }
    return randFunc() * (max - min) + min;
  };
};
