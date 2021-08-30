const palettes = require('./color-palettes.json');

module.exports = (seed, random, randomFunc, mapSrc, outputDir = '') => {
  function arrayShuffle(arr) {
    let rand;
    let tmp;
    let len = arr.length;
    const ret = arr.slice();

    while (len) {
      rand = Math.floor(random(1) * len--); // eslint-disable-line
      tmp = ret[len];
      ret[len] = ret[rand];
      ret[rand] = tmp;
    }

    return ret;
  }

  function getPalette() { return arrayShuffle(palettes[Math.floor(random() * palettes.length)]); }

  return {
    // rendering options
    random: randomFunc,
    seedName: seed,
    pointilism: random(0, 0.1),
    noiseScalar: [random(0.000001, 0.000001), random(0.0002, 0.004)],
    globalAlpha: 0.5,
    startArea: random(0.0, 1.5),
    maxRadius: random(5, 100),
    lineStyle: random(1) > 0.5 ? 'round' : 'square',
    interval: random(0.001, 0.01),
    count: 300,
    steps: 300,
    endlessBrowser: false, // Whether to endlessly step in browser

    // background image that drives the algorithm
    debugLuma: false,
    backgroundScale: 1,
    backgorundFille: 'black',
    backgroundSrc: mapSrc,

    // browser/node options
    pixelRatio: 1,
    width: 250,
    height: 250,
    palette: getPalette(),

    // node only options
    asVideoFrames: false,
    filename: 'render',
    outputDir,
  };
};
