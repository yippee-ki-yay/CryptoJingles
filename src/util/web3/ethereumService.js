import contract from 'truffle-contract';

import { SampleAddress, CryptoJinglesAddress, JingleAddress } from '../config';
import { getJingleMetadata } from '../../constants/getMockData';

import Sample from '../../../build/contracts/Sample.json';
import Jingle from '../../../build/contracts/Jingle.json';
import CryptoJingles from '../../../build/contracts/CryptoJingles.json';

export const parseSamples = (samples) => {
  let mySamples = [];

  for (let i = 0; i < samples.length; i += 2) {
    const id = samples[i].valueOf();
    const jingleType = samples[i + 1].valueOf();

    mySamples.push({
      id,
      jingleType,
      ...getJingleMetadata(jingleType)
    });
  }

  return mySamples;
};

export const getSamples = (address) =>
  new Promise(async (resolve) => {
    //setup contracts
    const samplesContract = contract(Sample);
    samplesContract.setProvider(window.web3.currentProvider);

    const cryptoJinglesContract = contract(CryptoJingles);
    cryptoJinglesContract.setProvider(window.web3.currentProvider);

    const samplesInstance = await samplesContract.at(SampleAddress);

    const samples = await samplesInstance.getAllSamplesForOwner(address);

    resolve(parseSamples(samples));
  });
