import contract from 'truffle-contract';

import { SampleAddress, CryptoJinglesAddress } from '../config';
import { getJingleMetadata } from '../../getMockData';

import Sample from '../../../build/contracts/Sample.json';
import CryptoJingles from '../../../build/contracts/CryptoJingles.json';

export const parseJingles = (jingles) => {
  let myJingles = [];

  for (let i = 0; i < jingles.length; i += 2) {
    const id = jingles[i].valueOf();
    const jingleType = jingles[i + 1].valueOf();

    myJingles.push({
      id,
      jingleType,
      ...getJingleMetadata(jingleType)
    });
  }

  return myJingles;
};

export const getJingles = (web3) =>
  new Promise((resolve) => {
    web3.eth.getAccounts(async (error, accounts) => {

      //setup contracts
      const samplesContract = contract(Sample);
      samplesContract.setProvider(web3.currentProvider);

      const cryptoJinglesContract = contract(CryptoJingles);
      cryptoJinglesContract.setProvider(web3.currentProvider);

      const samplesInstance = await samplesContract.at(SampleAddress);
      const cryptoJinglesInstance = await cryptoJinglesContract.at(CryptoJinglesAddress);

      const jingles = await samplesInstance.getAllSamplesForOwner(accounts[0]);

      const myJingles = parseJingles(jingles);

      resolve({
        accounts,
        web3,
        samplesInstance,
        myJingles,
        cryptoJinglesInstance,
      });
    });
  });