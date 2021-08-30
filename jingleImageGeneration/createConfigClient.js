import seedRandom from 'seed-random';
import createRandomRange from './random-range';
import createLocalConfig from './config';

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

export default (_seed) => {
  const seed = parseInt(_seed, 10);
  const randomFunc = seedRandom(seed);
  const random = createRandomRange(randomFunc);

  const maps = [
    map1, map2, map3, map4, map5, map6, map7, map8, map9, map10, map11, map12, map13, map14, map15, map16, map17,
  ];

  const mapSrc = maps[Math.floor(random(maps.length))];

  return (createLocalConfig(seed, random, randomFunc, mapSrc));
};
