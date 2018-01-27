import Web3 from 'web3';
import contract from 'truffle-contract';
import { CryptoJinglesAddress } from '../config';
import CryptoJingles from '../../../build/contracts/CryptoJingles.json';

let getWeb3 = () => {
  if (typeof web3 !== 'undefined') {
    console.log('Injected web3 detected.');
    window.web3 = new Web3(web3.currentProvider); // eslint-disable-line
  } else {
    console.log('No web3 instance injected, using Local web3.');
    window.wewb3 = new Web3.providers.HttpProvider('http://localhost:8545')
  }

  const cryptoJinglesContract = contract(CryptoJingles);
  cryptoJinglesContract.setProvider(window.web3.currentProvider);
  window.contract = cryptoJinglesContract.at(CryptoJinglesAddress);
};

export default getWeb3
