import Web3 from 'web3';
import contract from 'truffle-contract';
import { CryptoJinglesAddress, JingleAddress, MarketplaceAddress } from '../config';
import CryptoJingles from '../../../build/contracts/CryptoJingles.json';
import Jingle from '../../../build/contracts/Jingle.json';
import Marketplace from '../../../build/contracts/Marketplace.json';
import { initAppWithMM, initAppWithoutMM, initAppWithLockedMM } from '../../../src/actions/appActions';

/**
 * Checks if the user has MetaMask. If it does, binds
 * web3, contracts to window object. Dispatches actions accordingly
 *
 * @param {Function} dispatch
 * @return {Promise.<void>}
 */
let getWeb3 = async (dispatch) => {
  if (typeof web3 !== 'undefined') {
    window.web3 = new Web3(web3.currentProvider); // eslint-disable-line

    const netId = await window.web3.eth.net.getId();

    // if (netId !== "1") alert("Wrong network, please switch to the mainnet!");

    // Init jingles contract
    const cryptoJinglesContract = contract(CryptoJingles);
    cryptoJinglesContract.setProvider(window.web3.currentProvider);
    window.contract = cryptoJinglesContract.at(CryptoJinglesAddress);

    // Init jingle contract
    const jingleContract = contract(Jingle);
    jingleContract.setProvider(window.web3.currentProvider);
    window.jingleContract = jingleContract.at(JingleAddress);

    // Init marketplace contract
    const marketplaceContract = contract(Marketplace);
    marketplaceContract.setProvider(window.web3.currentProvider);
    window.marketplaceContract = marketplaceContract.at(MarketplaceAddress);

    const addresses = await window.web3.eth.getAccounts();
    const address = addresses[0];

    if (address) dispatch(initAppWithMM(address.toLowerCase()));
    else dispatch(initAppWithLockedMM())
  } else {
    dispatch(initAppWithoutMM());
  }
};

export default getWeb3
