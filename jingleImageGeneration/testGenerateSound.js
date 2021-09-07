const generate = require('./generateSound');

// Settings for id 0 on v1
const _settings = [
  // volumes
  '50',
  '39',
  '67',
  '71',
  '0',
  // delays
  '0',
  '23',
  '23',
  '56',
  '0',
  // startCuts
  '0',
  '0',
  '0',
  '0',
  '0',
  // endCuts
  '23',
  '0',
  '0',
  '0',
  '0',
];

generate(1, 0, [70, 88, 7, 27, 54], _settings);
