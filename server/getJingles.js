const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.decenter.com'));

const marketplaceAbi = require("../build/contracts/Marketplace");
const marketplaceAddress = "0xb8e392da7abb836cff06d827531a7e5f1b00bed2";
const marketplaceContract = web3.eth.contract(marketplaceAbi.abi).at(marketplaceAddress);

const jinglesAbi = require("../build/contracts/Jingle");
const jinglesAddress = "0x5af7af54e8bc34b293e356ef11fffe51d6f9ae78";
const jinglesContract = web3.eth.contract(jinglesAbi.abi).at(jinglesAddress);

(() => {
  jinglesContract.Composed({}, { fromBlock: '5025886', toBlock: 'latest' })
    .get((error, event) => {
      if (error) {
        console.log('GET JINGLES ERROR', error);
        return;
      }

      const jingles = event
                      .filter(_jingle => _jingle.type === 'mined')
                      .map(_jingle => _jingle.args);

      console.log('GET JINGLES SUCCESS', jingles);
    });
})();