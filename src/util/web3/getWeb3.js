import Web3 from 'web3';
import contract from 'truffle-contract';
import { CryptoJinglesAddress, JingleAddress, MarketplaceAddress } from '../config';
import CryptoJingles from '../../../build/contracts/CryptoJingles.json';
import Jingle from '../../../build/contracts/Jingle.json';
import Marketplace from '../../../build/contracts/Marketplace.json';

let getWeb3 = () => {
  if (typeof web3 !== 'undefined') {
    console.log('Injected web3 detected.');
    window.web3 = new Web3(web3.currentProvider); // eslint-disable-line

    window.web3.version.getNetwork((err, netId) => {
      console.log(netId);
      if (netId !== "1") {
        alert("Wrong network please switch to mainnet!");
      }
    })

    const cryptoJinglesContract = contract(CryptoJingles);
    cryptoJinglesContract.setProvider(window.web3.currentProvider);
    window.contract = cryptoJinglesContract.at(CryptoJinglesAddress);
  
    const jingleContract = contract(Jingle);
    jingleContract.setProvider(window.web3.currentProvider);
    window.jingleContract = jingleContract.at(JingleAddress);
  
    const marketplaceContract = contract(Marketplace);
    marketplaceContract.setProvider(window.web3.currentProvider);
    window.marketplaceContract = marketplaceContract.at(MarketplaceAddress);

  } else {
    console.log('No web3 instance injected, using Local web3.');
    window.web3 = new Web3.providers.HttpProvider('http://localhost:8545')
  }

};

export default getWeb3
