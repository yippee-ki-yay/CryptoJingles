const mongoose = require('mongoose');
const Web3 = require('web3');

require('../models/wrappedJingle.model');
require('../models/jinglesV0.model');
require('../models/jingles.model');

const WrappedJingle = mongoose.model('WrappedJingle');
const JingleV0 = mongoose.model('JingleV0');
const Jingle = mongoose.model('Jingle');

const getJingleData = require('../../jingleImageGeneration/getJingleData');

const wrappedJingleAbi = require('../abis/WrappedJingle.json');
const jingleV0ViewAbi = require('../abis/JingleV0View.json');
const jingleV1ViewAbi = require('../abis/JingleV1View.json');

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.NODE_URL_HTTPS));

const wrappedContractAddr = '0x74a24A55e9FAdca1595Ac0682eC2D66922D29ef7';
const jingleV0Addr = '0x5AF7Af54E8Bc34b293e356ef11fffE51d6f9Ae78';

const jingleV0ViewAddr = '0x78c05d5654c8d9f595371c47f1452e08317832e7';
const jingleV1ViewAddr = '0xad8d088f5921abbee3c0f431ebbc7c8dcc38e227';

const wrappedJingleContract = new web3.eth.Contract(
  wrappedJingleAbi.abi,
  wrappedContractAddr,
);

const jingleV0ViewContract = new web3.eth.Contract(
  jingleV0ViewAbi.abi,
  jingleV0ViewAddr,
);

const jingleV1ViewContract = new web3.eth.Contract(
  jingleV1ViewAbi.abi,
  jingleV1ViewAddr,
);

module.exports.removeWrappedJingle = async (wrappedId, jingleVersion, jingleId) => {
  try {
    const find = await WrappedJingle.findOneAndDelete({ wrappedId });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getWrappedJingleMetadata = async (req, res) => {
  try {
    const { wrappedId } = req.params;

    let wrappedJingle = await WrappedJingle.findOne({ wrappedId });

    if (!wrappedJingle) {
      const tokenId = await wrappedJingleContract.methods.wrappedToUnwrapped(wrappedId).call();

      if (!tokenId.isWrapped) {
        res.json({});
        return;
      }

      const version = tokenId.jingleContract.toLowerCase() === jingleV0Addr.toLowerCase() ? 'v0' : 'v1';

      const newWrapped = new WrappedJingle({
        wrappedId,
        jingleId: tokenId.tokenId,
        jingleVersion: version,
      });

      await newWrapped.save();

      wrappedJingle = newWrapped;
    }

    const metadata = {};

    if (wrappedJingle) {
      let jingleData;

      if (wrappedJingle.jingleVersion === 'v0') {
        jingleData = await jingleV0ViewContract.methods.getFullJingleData(wrappedJingle.jingleId).call();
      } else {
        jingleData = await jingleV1ViewContract.methods.getFullJingleData(wrappedJingle.jingleId).call();
      }

      console.log(jingleData);

      const base = 'https://cryptojingles.app';

      const webmName = `${wrappedJingle.jingleVersion}_${jingleData.id}`;

      const attributes = [];

      jingleData.sampleTypes.forEach((sampleType) => {
        attributes.push({
          trait_type: getJingleData(sampleType).name,
          value: 'sample',
        });
      });

      metadata.description = `Wrapped version of ${wrappedJingle.jingleVersion} jingle number #${jingleData.id}`;
      metadata.name = `Wrapped ${wrappedJingle.jingleVersion} #${jingleData.id} - ${jingleData.name}`;
      metadata.animation_url = `${base}/public/videosWithSound/${webmName}.webm`;
      metadata.external_url = `${base}/jingle/${wrappedJingle.jingleVersion[1]}/${jingleData.id}`;
      metadata.image = `${base}/public/videosWithSound/${webmName}.webm`;
      metadata.attributes = attributes;
    }

    res.status(200);
    res.json(metadata);
  } catch (err) {
    console.log(err);
  }
};