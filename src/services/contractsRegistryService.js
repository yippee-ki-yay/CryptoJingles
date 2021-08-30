import contract from 'truffle-contract';
import CryptoJingles from '../../server/abis/CryptoJingle.json';
import {
  CryptoJinglesAddress, JingleAddress, MarketplaceAddress, SampleAddress,
} from '../util/config';
import Jingle from '../../server/abis/Jingle.json';
import Marketplace from '../../server/abis/Marketplace.json';
import Sample from '../../server/abis/Sample.json';
import { wait } from './utilsService';

const createNewContract = async (abi, address, name) => {
  if (!window._web3) {
    await wait(300);
    if (!window._web3) return createNewContract(abi, address, name);
  }

  const cryptoJinglesContract = contract(abi);
  cryptoJinglesContract.setProvider(window._web3.currentProvider);
  window[name] = cryptoJinglesContract.at(address);
};

createNewContract(CryptoJingles, CryptoJinglesAddress, 'contract');
createNewContract(Jingle, JingleAddress, 'jingleContract');
createNewContract(Marketplace, MarketplaceAddress, 'marketplaceContract');
createNewContract(Sample, SampleAddress, 'samplesContract');
