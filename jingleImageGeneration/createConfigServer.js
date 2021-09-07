const path = require('path');
const seedRandom = require('seed-random');
const createRandomRange = require('./random-range');
const createLocalConfig = require('./config');

const canAddFrame = (version, jingleId) => {
  if (version === 0) return jingleId <= 30;

  return jingleId <= 47;
};

module.exports = {
  create: (version, _seed, jingleId, _addFrame) => {
    const seed = parseInt(version === 0 ? _seed : jingleId, 10);
    const randomFunc = seedRandom(seed);
    const random = createRandomRange(randomFunc);

    const addFrame = _addFrame && canAddFrame(version, jingleId);

    console.log('jingleId: ', jingleId);

    const maps = [
      'architecture.jpg', 'church2.jpg', 'city2.jpg', 'city5.jpg',
      'eye.jpg', 'fractal1.jpg', 'fractal2.jpg', 'geo1.jpg', 'geo3.jpg',
      'geo4.jpg', 'geo5.jpg', 'map7.jpg', 'nature1.jpg', 'pat1.jpg',
      'scifi.jpg', 'sym3.jpg', 'sym6.jpg',
    ].map((mapName) => path.resolve(`../jingleImageGeneration/maps/${mapName}`));

    const mapSrc = maps[Math.floor(random(maps.length))];

    const outputDir = path.resolve('../public');
    const fileName = `v${version}_${jingleId}`;

    return (createLocalConfig(seed, random, randomFunc, mapSrc, outputDir, fileName, addFrame));
  },
};
