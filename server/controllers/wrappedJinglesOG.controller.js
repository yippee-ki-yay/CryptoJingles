const mongoose = require('mongoose');
const Web3 = require('web3');

require('../models/wrappedJingleOG.model');
require('../models/jinglesV0.model');
require('../models/jingles.model');

const WrappedJingleOG = mongoose.model('WrappedJingleOG');
const JingleV0 = mongoose.model('JingleV0');
const Jingle = mongoose.model('Jingle');

const getJingleData = require('../../jingleImageGeneration/getJingleData');
const jingleV0ViewAbi = require('../abis/JingleV0View.json');
const jingleV1ViewAbi = require('../abis/JingleV1View.json');

const wrappedJingleAbi = require('../abis/WrappedJingle.json');

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.NODE_URL_HTTPS));

const wrappedContractAddrOG = '0xA603806c2bcd429841A075aCadBEBcd53B651B02';

const jingleV0ViewAddr = '0x78c05d5654c8d9f595371c47f1452e08317832e7';
const jingleV1ViewAddr = '0xad8d088f5921abbee3c0f431ebbc7c8dcc38e227';

const jingleV0Addr = '0x5AF7Af54E8Bc34b293e356ef11fffE51d6f9Ae78';

const wrappedJingleContract = new web3.eth.Contract(
  wrappedJingleAbi.abi,
  wrappedContractAddrOG,
);

const jingleV0ViewContract = new web3.eth.Contract(
  jingleV0ViewAbi.abi,
  jingleV0ViewAddr,
);

const jingleV1ViewContract = new web3.eth.Contract(
  jingleV1ViewAbi.abi,
  jingleV1ViewAddr,
);

module.exports.getWrappedJingleMetadataOG = async (req, res) => {
  try {
    const { wrappedId } = req.params;

    let wrappedJingle = await WrappedJingleOG.findOne({ wrappedId });

    if (!wrappedJingle) {
      const tokenId = await wrappedJingleContract.methods.wrappedToUnwrapped(wrappedId).call();

      if (!tokenId.isWrapped) {
        res.json({});
        return;
      }

      const version = tokenId.jingleContract.toLowerCase() === jingleV0Addr.toLowerCase() ? 'v0' : 'v1';

      const newWrapped = new WrappedJingleOG({
        wrappedId,
        jingleId: tokenId.tokenId,
        jingleVersion: version,
      });

      await newWrapped.save();

      wrappedJingle = newWrapped;
    }

    console.log(wrappedJingle);

    const metadata = {};

    if (wrappedJingle) {
      let jingleData;

      if (wrappedJingle.jingleVersion === 'v0') {
        jingleData = await jingleV0ViewContract.methods.getFullJingleData(wrappedJingle.jingleId).call();
      } else {
        jingleData = await jingleV1ViewContract.methods.getFullJingleData(wrappedJingle.jingleId).call();
      }

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