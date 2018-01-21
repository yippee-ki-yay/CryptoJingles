import contract from 'truffle-contract';

import { JingleAddress, CryptoJinglesAddress } from '../config';
import { getJingleMetadata } from '../../getMockData';

import Jingle from '../../../build/contracts/Jingle.json';
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
      const jinglesContract = contract(Jingle);
      jinglesContract.setProvider(web3.currentProvider);

      const cryptoJinglesContract = contract(CryptoJingles);
      cryptoJinglesContract.setProvider(web3.currentProvider);

      const jinglesInstance = await jinglesContract.at(JingleAddress);
      const cryptoJinglesInstance = await cryptoJinglesContract.at(CryptoJinglesAddress);

      const jingles = await jinglesInstance.getAllJinglesForOwner(accounts[0]);

      const myJingles = parseJingles(jingles);

      resolve({
        accounts,
        web3,
        jinglesInstance,
        myJingles,
        cryptoJinglesInstance,
      });
    });
  });