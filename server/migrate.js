const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.decenter.com'));

const cryptoJinglesAbi = require('../build/contracts/CryptoJingles');
const jinglesAbi = require('./oldJingleAbi');

const cryptoJinglesAddress = '0xa46aeff63f9b7a2d50f7687927047756df216434';

const cryptoJingles = web3.eth.contract(cryptoJinglesAbi.abi).at(cryptoJinglesAddress);

const users = {};

async function getWhoBoughtSamples() {
  cryptoJingles.Purchased({}, { fromBlock: '5025886', toBlock: 'latest' })
    .get(async (error, events) => {
      events.forEach((e) => {
        const num = e.args.numJingles.valueOf();
        const user = e.args.user;

        addNumSamples(user, num);
      });

      let num = 0;
      let i = 0;

      const txArr = [];

      const arr = {
        '0x2f2fd0d33e9a2b97b586b0340d2e5192b2f77fe1': 10,
        '0x183febd8828a9ac6c70c0e27fbf441b93004fc05': 40,
        '0x507fc313f9d50ce32ff94e67df48f7b0935d016a': 44,
        '0xb87e73ad25086c43a16fe5f9589ff265f8a3a9eb': 5,
        '0x51b76da4aa0ea58878115a545bcb0244453f4c12': 35,
        '0xd387a6e4e84a6c86bd90c158c6028a58cc8ac459': 56,
        '0x98aec1e4e88564a48331e55b4366f6f4b2e48f24': 6,
        '0x54f9d80d75fa7d5bc924fc4cd71000e1f97a1c74': 15,
        '0xe293390d7651234c6dfb1f41a47358b9377c004f': 210,
        '0x93811dabfbee9736035025cba91491d7747cfd47': 10,
        '0x47d6aea659d68495b9cce2f3e13365f160aa86ea': 35,
        '0xad565956ae5bd43117f6b0a650ec18c621ff8e0d': 10,
        '0xaacbd9dc15c6f8cb596107e843cdeb6d237476f2': 16,
        '0xf38ecbec6b5bf1469d149a8e04a7d2ad6b97ef05': 5,
        '0x4bb9a1e3ba4aee6f6bb76de1384e7417fd2c9dc2': 6,
        '0x00158a74921620b39e5c3afe4dca79feb2c2c143': 15,
        '0x5e95016eec2f9a12aa9cd70008cfc5abd4df8a05': 1,
        '0xeeb241f6a46198bd4cc402670294d47f2c8853e8': 5,
        '0xe540cc2fc3b04ba509ee5852e9092c7ed63ea0a8': 5,
        '0x1cf682fa852995099759c91bc8ba23bf74360e0e': 10,
        '0xa1c78ed146a8693a8cf3d29385bc54cd3f145b4a': 5,
        '0xc993e17ee60201bdba0ccffa7f328162ac34fdb0': 5,
        '0x666f4ae593d457dc38fcdc9d3961f5c96ab7ce9f': 5,
    };

      //console.log(arr);

      for (const key in arr) {
        if (arr.hasOwnProperty(key)) {
          num += users[key];
          i++;

          const numTimes = (arr[key] * 2) / 10;

          for (let i = 0; i < numTimes; ++i) {
            txArr.push(key);
          }
        }
      }

      console.log(txArr.length, txArr);
      //console.log(`Num of users who have bought samples: ${i}`, ' Num of samples: ', num);
    });
}


function addNumSamples(address, num) {
  if (users[address]) {
    users[address] += parseInt(num);
  } else {
    users[address] = parseInt(num);
  }
}

(async () => {
  getWhoBoughtSamples();
})();
