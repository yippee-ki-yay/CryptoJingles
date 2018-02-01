
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
const marketplaceAddress = "0x83235c9aae07c5b15d3694ef3914a60d829cd008";
const jinglesAddress = "0xcf51fc525fca81e5aefae84c997dce82cc2103f5";

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETH_NODE));

const marketplaceContract = web3.eth.contract(marketplaceAbi.abi).at(marketplaceAddress);

const jingles = web3.eth.contract(jinglesAbi.abi).at(jinglesAddress);


(async () => {

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