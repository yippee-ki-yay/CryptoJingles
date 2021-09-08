require('dotenv').config();


const mongoose = require('mongoose');
const Web3 = require('web3');

const generateSound = require('../jingleImageGeneration/generateSound');
const serverConfig = require('../jingleImageGeneration/createConfigServer');
const createFileRenderer = require('../jingleImageGeneration/createFileRenderer');
const generateVideoWithSound = require('../jingleImageGeneration/generateVideoWithSound');

const db = require('./db');

require('./models/jinglesV0.model');

const jingleViewV0 = require('./abis/JingleViewV0.json');

const jingleViewV0Addr = '0x78C05d5654C8D9f595371C47F1452e08317832e7';

const JingleV0 = mongoose.model('JingleV0');

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.NODE_URL_HTTPS));

function generateWebm(jingleId, sampleTypes, sampleIds) {
  const jingleVersion = 0;
  console.log(jingleVersion, jingleId, sampleTypes);
  generateSound(jingleVersion, jingleId, sampleTypes, []);

  let idsSum = 0;

  for (let i = 0; i < sampleIds.length; i += 1) {
    idsSum += parseInt(sampleIds[i], 10);
  }

  const seed = (parseInt(jingleId, 10) + idsSum) * 1_000_000; // for V0

  console.log('seed: ', seed);

  const config = serverConfig.create(jingleVersion, seed, jingleId, false);
  console.log(config);
  createFileRenderer(config, () => { generateVideoWithSound(jingleVersion, jingleId); }, () => {});
}

let jingleId = 1;
const numJingles = 55;

(async () => {
 // setInterval(async () => {
    if (jingleId < numJingles) {
      console.log(`${jingleId}: jingleId`);
      const jingleViewV0Contract = new web3.eth.Contract(jingleViewV0.abi, jingleViewV0Addr);

      const jingleData = await jingleViewV0Contract.methods.getFullJingleData(jingleId).call();

      const find = await JingleV0.findOne({ jingleId: jingleData.jingleId });

      if (!find) {
        generateWebm(jingleData.id, jingleData.sampleTypes, jingleData.sampleIds);

        const jingleV0 = new JingleV0({
          jingleId: jingleData.id,
          name: jingleData.name,
          author: jingleData.author,
          price: jingleData.price,
          onSale: jingleData.onSale,
          owner: jingleData.owner,
          samples: jingleData.sampleIds,
          sampleTypes: jingleData.sampleTypes
        });
        jingleV0.hasWebm = true;

        await jingleV0.save();
      }
    }

    jingleId += 1;
// }, 10 * 1000 * 1);
})();