import seedRandom from 'seed-random';
import palettes from './color-palettes.json';
import createRandomRange from './random-range.js';

import map1 from './maps/architecture.jpg';
import map2 from './maps/church2.jpg';
import map3 from './maps/city2.jpg';
import map4 from './maps/city5.jpg';
import map5 from './maps/eye.jpg';
import map6 from './maps/fractal1.jpg';
import map7 from './maps/fractal2.jpg';
import map8 from './maps/geo1.jpg';
import map9 from './maps/geo3.jpg';
import map10 from './maps/geo4.jpg';
import map11 from './maps/geo5.jpg';
import map12 from './maps/map7.jpg';
import map13 from './maps/nature1.jpg';
import map14 from './maps/pat1.jpg';
import map15 from './maps/scifi.jpg';
import map16 from './maps/sym3.jpg';
import map17 from './maps/sym6.jpg';

module.exports = (seed) => {
  if (typeof seed === 'undefined') {
    seed = String(Math.floor(Math.random() * 1000000));
  }

  console.log('Seed:', seed);

  let randomFunc = seedRandom(seed);
  let random = createRandomRange(randomFunc);

  const maps = [
    map1, map2, map3, map4, map5, map6, map7, map8, map9, map10, map11, map12, map13, map14, map15, map16, map17
  ];

  let mapSrc = maps[Math.floor(random(maps.length))];

  return {
    // rendering options
    random: randomFunc,
    seedName: seed,
    pointilism: random(0, 0.1),
    noiseScalar: [ random(0.000001, 0.000001), random(0.0002, 0.004) ],
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
    width: 1280 * 2,
    height: 720 * 2,
    palette: getPalette()
  };

  function getPalette () { return arrayShuffle(palettes[Math.floor(random() * palettes.length)]); }

  function arrayShuffle (arr) {
    let rand;
    let tmp;
    let len = arr.length;
    let ret = arr.slice();

    while (len) {
      rand = Math.floor(random(1) * len--);
      tmp = ret[len];
      ret[len] = ret[rand];
      ret[rand] = tmp;
    }

    return ret;
  }
};
