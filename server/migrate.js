const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://mainnet.decenter.com'));

const cryptoJinglesAbi = require("../build/contracts/CryptoJingles");
const jinglesAbi = require("./oldJingleAbi");

const cryptoJinglesAddress = "0xa46aeff63f9b7a2d50f7687927047756df216434";

const cryptoJingles = web3.eth.contract(cryptoJinglesAbi.abi).at(cryptoJinglesAddress);

const users = {};

async function getWhoBoughtSamples() {
    cryptoJingles.Purchased({}, { fromBlock: '5025886', toBlock: 'latest' })
    .get(async (error, events) => {
        events.forEach(e => {
            const num = e.args.numJingles.valueOf();
            const user = e.args.user;

            addNumSamples(user, num);
        });

        let num = 0;
        let i = 0;

        const txArr = [];

        for (var key in users) {
            if (users.hasOwnProperty(key)) {
                num += users[key];
                i++;

                const numTimes = users[key] / 10;

                for (let i = 0; i < numTimes; ++i) {
                    txArr.push(key);
                }
            }
        }

        console.log(txArr.length, txArr);
        console.log("Num of users who have bought samples: " + i, " Num of samples: ", num);
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
