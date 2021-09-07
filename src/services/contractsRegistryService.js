import contract from 'truffle-contract';
import CryptoJingles from '../../server/abis/CryptoJingle.json';
import {
  CryptoJinglesAddress,
  JingleAddress,
  MarketplaceAddress,
  SampleAddress,
  WrappedOGJingleAddress,
  JingleV1ViewAddress,
} from '../util/config';
import Jingle from '../../server/abis/Jingle.json';
import Marketplace from '../../server/abis/Marketplace.json';
import Sample from '../../server/abis/Sample.json';
import WrappedOGJingle from '../../server/abis/WrappedOGJingle.json';
import JingleV1View from '../../server/abis/JingleV1View.json';
import { wait } from './utilsService';

const createNewContract = async (abi, address, name) => {
  if (!window._web3) {
    await wait(300);
    if (!window._web3) return createNewContract(abi, address, name);
  }

  const contractCreator = contract(abi);
  contractCreator.setProvider(window._web3.currentProvider);
  window[name] = contractCreator.at(address);
};

export const createContract = (abi, address) => async () => {
  if (!window._web3) {
    await wait(300);
    if (!window._web3) return createContract(abi, address);
  }

  return new window._web3.eth.Contract(abi, address);
};

export const getErc20Contract = async (address) => createNewContract('Erc20', address)();

createNewContract(CryptoJingles, CryptoJinglesAddress, 'contract');
createNewContract(Jingle, JingleAddress, 'jingleContract');
createNewContract(Marketplace, MarketplaceAddress, 'marketplaceContract');
createNewContract(Sample, SampleAddress, 'samplesContract');
createNewContract(WrappedOGJingle, WrappedOGJingleAddress, 'wrappedOGJingleContract');

export const wrappedOGJingleContract = createContract(JingleV1View.abi, JingleV1ViewAddress);
