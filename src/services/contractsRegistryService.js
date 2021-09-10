import contract from 'truffle-contract';
import CryptoJingles from '../../server/abis/CryptoJingle.json';
import {
  CryptoJinglesAddress,
  JingleAddress,
  MarketplaceAddress,
  SampleAddress,
  WrappedOGJingleAddress,
  WrappedNewJingleAddress,
  JingleV0ViewAddress,
  JingleV1ViewAddress,
  JingleV0Address,
} from '../util/config';
import Jingle from '../../server/abis/Jingle.json';
import Marketplace from '../../server/abis/Marketplace.json';
import Sample from '../../server/abis/Sample.json';
import WrappedOGJingle from '../../server/abis/WrappedOGJingle.json';
import WrappedNewJingle from '../../server/abis/WrappedNewJingle.json';
import JingleV0View from '../../server/abis/JingleV0View.json';
import JingleV1View from '../../server/abis/JingleV1View.json';
import JingleV0 from '../../server/abis/JingleV0.json';
import Erc20 from '../../server/abis/Erc20.json';
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

export const getErc20Contract = async (address) => createContract(Erc20.abi, address)();

createNewContract(CryptoJingles, CryptoJinglesAddress, 'contract');
createNewContract(Jingle, JingleAddress, 'jingleContract');
createNewContract(Marketplace, MarketplaceAddress, 'marketplaceContract');
createNewContract(Sample, SampleAddress, 'samplesContract');
createNewContract(WrappedOGJingle, WrappedOGJingleAddress, 'wrappedOGJingleContract');

export const MarketplaceV1Contract = createContract(Marketplace.abi, MarketplaceAddress);

export const CryptoJinglesV1Contract = createContract(CryptoJingles.abi, CryptoJinglesAddress);
export const JingleV0ViewContract = createContract(JingleV0View.abi, JingleV0ViewAddress);
export const JingleV1ViewContract = createContract(JingleV1View.abi, JingleV1ViewAddress);
export const JingleV1Contract = createContract(Jingle.abi, JingleAddress);
export const JingleV0Contract = createContract(JingleV0.abi, JingleV0Address);
export const WrappedOGJinglesContract = createContract(WrappedOGJingle.abi, WrappedOGJingleAddress);
export const WrappedNewJinglesContract = createContract(WrappedNewJingle.abi, WrappedNewJingleAddress);
