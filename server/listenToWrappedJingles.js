// /* eslint-disable no-await-in-loop */
// require('dotenv').config();

// const mongoose = require('mongoose');
// const Web3 = require('web3');

// const db = require('./db');

// const web3 = new Web3(new Web3.providers.HttpProvider(process.env.NODE_URL_HTTPS));

// const wrappedJingleCtrl = require('./controllers/wrappedJingles.controller');

// const wrappedJingleAbi = require('./abis/WrappedJingle.json');

// const jingleV1Addr = '0x5b6660ca047cc351bfedca4fc864d0a88f551485';

// const wrappedContractAddr = '';
// const wrappedContractOGAddr = '';

// const wrappedJingleContract = new web3.eth.Contract(
//   wrappedJingleAbi.abi,
//   wrappedContractAddr,
// );

// const wrappedJingleOGContract = new web3.eth.Contract(
//   wrappedJingleAbi.abi,
//   wrappedContractOGAddr,
// );

// const startBlock = '13191116';
// const endBlock = 'latest';

// const getWrapEvents = async () => {
//   wrappedJingleContract.getPastEvents('Wrapped', {
//     fromBlock: startBlock,
//     toBlock: endBlock,
//   }, async (res, err) => {
//     console.log(res);
//     if (res && res.length > 0) {
//       for (let i = 0; i < res.length; i += 1) {
//         const wrappedTokenId = res.returnValues[0];
//         const tokenId = res.returnValues[1];
//         const contractAddr = res.returnValues[2];

//         const version = contractAddr.toLowerString() === jingleV1Addr.toLowerString() ? 'v1' : 'v0';

//         await wrappedJingleCtrl.addWrappedJingle(wrappedTokenId, version, tokenId);
//       }
//     }
//   });
// };

// const getUnWrapEvents = async () => {
//   wrappedJingleContract.getPastEvents('Unwrapped', {
//     fromBlock: startBlock,
//     toBlock: endBlock,
//   }, async (res, err) => {
//     if (res && res.length > 0) {
//       for (let i = 0; i < res.length; i += 1) {
//         const unWrappedTokenId = res.returnValues[0];
//         const tokenId = res.returnValues[1];
//         const contractAddr = res.returnValues[2];

//         const version = contractAddr.toLowerString() === jingleV1Addr.toLowerString() ? 'v1' : 'v0';

//         await wrappedJingleCtrl.removeWrappedJingle(unWrappedTokenId, version, tokenId);
//       }
//     }
//   });
// };

// // jingleV0 i jingleV1 listen to transfer events _to & _from
// (async () => {
//   //setInterval(async () => {
//     await getWrapEvents();

//     //await getUnWrapEvents();
//  // }, 60 * 1000 * 1);
// });