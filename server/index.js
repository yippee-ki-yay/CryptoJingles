
require('dotenv').load();

const Web3 = require('web3');
const express = require('express');
const cors = require('cors');

const db = require('./db');
const routes = require('./routes');
const marketplaceAbi = require("../build/contracts/Marketplace");
const jinglesAbi = require("../build/contracts/Jingle");

const jingleCtrl = require('./controllers/jingles.controller');

const app = express();
const marketplaceAddress = "0x957585bc5e3642b26a0d339a006683b218fb0109";
const jinglesAddress = "0xec914e5e1ef3a204bbf45ea6267eb2039fe7e48a";

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETH_NODE));

const marketplaceContract = web3.eth.contract(marketplaceAbi.abi).at(marketplaceAddress);

const jingles = web3.eth.contract(jinglesAbi.abi).at(jinglesAddress);


(async () => {

    //mockup data

//     const order = {
//         jingleId: 13,
//         seller: '0x094144edafd5eA40f82d0bDa155A3E5eFc93658E',
//         price: 300000000,
//     };

//    await orderCtrl.addOrder(order);

    jingles.Composed(async (err, res) => {
        if(err) {
            console.log(err);
        }

        const samples = res.args.samples.map(s => s.valueOf());

        const sampleTypes = res.args.jingleTypes.map(s => s.valueOf());

        const jingleData = {
            jingleId: res.args.songId.valueOf(),
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
            jingleId: res.args.songId.valueOf(),
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

        const jingleId = res.args.songId.valueOf();

        const updated = await jingleCtrl.removeFromSale(jingleId);

        if (updated) {
            console.log('Sell Order removed (bought)');
        }
    });

    marketplaceContract.Canceled(async (err, res) => {
        if(err) {
            console.log(err);
        }

        // remove the jingle
    });

})();

app.use(cors());
app.use('/api', routes);

app.get('/', (req, res) => res.send('Hi'));

app.listen(9999, () => console.log('Listening for Purchase events'));