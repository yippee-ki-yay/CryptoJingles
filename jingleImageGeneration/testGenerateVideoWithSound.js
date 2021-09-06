const generateVideoWithSound = require('./generateVideoWithSound');
const generateSound = require('./generateSound');
const serverConfig = require('./createConfigServer');
const createFileRenderer = require('./createFileRenderer');

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

const test = () => {
  const jingleId = 0;

  generateSound(1, jingleId, [70, 88, 7, 27, 54], _settings);

  const config = serverConfig.create(1, jingleId + 5 + 1 + 10 + 3 + 8 , 0, false);
  createFileRenderer(config, () => { generateVideoWithSound(1, 0); }, () => {});
};

test();
