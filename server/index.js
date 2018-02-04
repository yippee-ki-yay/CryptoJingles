
//require('dotenv').load();

const Web3 = require('web3');
const express = require('express');
const cors = require('cors');

const db = require('./db');
const routes = require('./routes');
const marketplaceAbi = require("../build/contracts/Marketplace");
const jinglesAbi = require("../build/contracts/Jingle");

const jingleCtrl = require('./controllers/jingles.controller');

const app = express();
const marketplaceAddress = "0xb8e392da7abb836cff06d827531a7e5f1b00bed2";
const jinglesAddress = "0x5af7af54e8bc34b293e356ef11fffe51d6f9ae78";

const web3 = new Web3(new Web3.providers.HttpProvider("https://monthly-superb-cod.quiknode.io/fe26e4e5-2f80-4f19-b6fb-f21e4851d233/v5WwMVIHrg8ppsDCS-6Weg==/"));

const marketplaceContract = web3.eth.contract(marketplaceAbi.abi).at(marketplaceAddress);

const jingles = web3.eth.contract(jinglesAbi.abi).at(jinglesAddress);
// { jingleId: 21,
//   name: 'Mister Doomsday',
//   author: 'Super Sound',
//   owner: '0xe293390d7651234c6dfb1f41a47358b9377c004f',
//   samples: [ '321', '337', '338', '339', '340' ],
//   sampleTypes: [ '41', '80', '38', '80', '23' ],
//   onSale: false,
//   price: 0 }
// { jingleId: 20,
//   name: 'SHE',
//   author: 'Ethsy Jones',
//   owner: '0x93811dabfbee9736035025cba91491d7747cfd47',
//   samples: [ '225', '207', '221', '209', '210' ],
//   sampleTypes: [ '35', '41', '87', '55', '55' ],
//   onSale: false,
//   price: 0 }

// { jingleId: 19,
//   name: 'go go go',
//   author: 'Soundtoshi Nakajingles',
//   owner: '0x93cdb0a93fc36f6a53ed21ecf6305ab80d06beca',
//   samples: [ '300', '299', '298', '297', '296' ],
//   sampleTypes: [ '69', '47', '63', '57', '89' ],
//   onSale: false,
//   price: 0 }
async function populate() {
    jingles.Composed({}, {fromBlock: 0, toBlock: 'latest'}).get(async (err, ress) => {
        if(err) {
            console.log(err);
        }

        console.log(ress);
        ress.forEach(async res => {
        const samples = res.args.samples.map(s => s.valueOf());

        const sampleTypes = res.args.jingleTypes.map(s => s.valueOf());

        const jingleData = {
            jingleId: res.args.jingleId.valueOf(),
            name: res.args.name,
            author: res.args.author,
            owner: res.args.owner,
            samples,
            sampleTypes,
            onSale: false,
            price: 0
        };

        console.log(jingleData);
    });
 
        // const saved = await jingleCtrl.addJingle(jingleData);
    });
}

(async () => {

    await populate();

    jingles.Composed(async (err, res) => {
        if(err) {
            console.log(err);
        }

        const samples = res.args.samples.map(s => s.valueOf());

        const sampleTypes = res.args.jingleTypes.map(s => s.valueOf());

        const jingleData = {
            jingleId: res.args.jingleId.valueOf(),
            name: res.args.name,
            author: res.args.author,
            owner: res.args.owner,
            samples,
            sampleTypes,
            onSale: false,
            price: 0
        };
 
        const saved = await jingleCtrl.addJingle(jingleData);

        if (saved) {
            console.log('Jingle added to db!');
        }
    });

    marketplaceContract.SellOrder(async (err, res) => {
       if(err) {
           console.log(err);
       }

       const order = {
            jingleId: res.args.jingleId.valueOf(),
            price: res.args.price.valueOf(),
        };

       const updated = await jingleCtrl.setForSale(order);

       if (updated) {
           console.log('Jingle set for sale');
       }
    });

   marketplaceContract.Bought(async (err, res) => {
        if(err) {
            console.log(err);
        }

        const jingleId = res.args.jingleId.valueOf();
        const buyer = res.args.buyer;

        const updated = await jingleCtrl.removeFromSale(jingleId, buyer);

        if (updated) {
            console.log('Sell Order removed (bought)');
        }
    });

    marketplaceContract.Canceled(async (err, res) => {
        if(err) {
            console.log(err);
        }

        const jingleId = res.args.jingleId.valueOf();
        const owner = res.args.owner;

        const updated = await jingleCtrl.removeFromSale(jingleId, owner);

        if (updated) {
            console.log('Sell Order removed (canceled)');
        }
    });

})();

app.use(cors());
app.use('/api', routes);

app.get('/', (req, res) => res.send('Hi'));

app.listen(9999, () => console.log('Listening for Purchase events'));