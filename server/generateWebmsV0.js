const mongoose = require('mongoose');
const generateSound = require('../jingleImageGeneration/generateSound');
const serverConfig = require('../jingleImageGeneration/createConfigServer');
const createFileRenderer = require('../jingleImageGeneration/createFileRenderer');
const generateVideoWithSound = require('../jingleImageGeneration/generateVideoWithSound');

const db = require('./db');

require('./models/jinglesV0.model');

const JingleV0 = mongoose.model('JingleV0');

function generateWebm(jingleId, sampleTypes, sampleIds) {
  const jingleVersion = 0;
  console.log(jingleVersion, jingleId, sampleTypes);
  generateSound(jingleVersion, jingleId, sampleTypes, []);

  let idsSum = 0;

  for (let i = 0; i < sampleIds.length; i += 1) {
    idsSum += parseInt(sampleIds[i], 10);
  }

  const seed = (parseInt(jingleId, 10) + idsSum) * 1_111_111; // for V0

  console.log('seed: ', seed);

  const config = serverConfig.create(jingleVersion, seed, jingleId, false);
  console.log(config);
  createFileRenderer(config, () => { generateVideoWithSound(jingleVersion, jingleId); }, () => {});
}

(async () => {
  // setInterval(async () => {
  const jingle = await JingleV0.findOne({ hasWebm: false });

  if (!jingle) {
    console.log('No jingle found');
    return;
  }

  generateWebm(jingle.jingleId, jingle.sampleTypes, jingle.sampleIds);

  jingle.hasWebm = true;

  await jingle.save();
  // }, 40 * 1000 * 1);
})();