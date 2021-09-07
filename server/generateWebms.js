const mongoose = require('mongoose');
const generateSound = require('../jingleImageGeneration/generateSound');
const serverConfig = require('../jingleImageGeneration/createConfigServer');
const createFileRenderer = require('../jingleImageGeneration/createFileRenderer');
const generateVideoWithSound = require('../jingleImageGeneration/generateVideoWithSound');

const db = require('./db');

require('./models/jingles.model');

const Jingle = mongoose.model('Jingle');

function generateWebm(jingleId, sampleTypes, settings) {
  const jingleVersion = 1;
  console.log(jingleVersion, jingleId, sampleTypes, settings);
  generateSound(jingleVersion, jingleId, sampleTypes, settings);

  const seed = jingleId; // for V1

  const config = serverConfig.create(1, jingleId, jingleId, false);
  console.log(config);
  createFileRenderer(config, () => { generateVideoWithSound(jingleVersion, jingleId); }, () => {});
}

(async () => {
  setInterval(async () => {
    const jingle = await Jingle.findOne({ hasWebm: false });

    generateWebm(jingle.jingleId, jingle.sampleTypes, jingle.settings);

    jingle.hasWebm = true;

    await jingle.save();

    db.closeConnection();
  }, 60 * 1000 * 1);
})();