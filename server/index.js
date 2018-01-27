
require('dotenv').load();

const Web3 = require('web3');
const express = require('express');
const cors = require('cors');

const db = require('./db');
const routes = require('./routes');
const marketplaceAbi = require("../build/contracts/Marketplace");
const jinglesAbi = require("../build/contracts/Jingle");

const jingleCtrl = require('./controllers/jingles.controller');
const orderCtrl = require('./controllers/order.controller');

const app = express();
const marketplaceAddress = "0x8ee827700b84e54788f6f90df23079b71964c5a3";
const jinglesAddress = "0x48961f89cd2df64766184d358bc7c2e3cb1873ba";

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

        const jingleData = {
            jingleId: res.args.songId.valueOf(),
            owner: res.args.owner,
            samples,
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
            seller: res.args.owner,
            price: res.args.price.valueOf(),
        };

       const saved = await orderCtrl.addOrder(order);

       if (saved) {
           console.log('Sell Order saved');
       }
    });

   marketplaceContract.Bought(async (err, res) => {
        if(err) {
            console.log(err);
        }

        const jingleId = res.args.songId.valueOf();

        const saved = await orderCtrl.removePurchase(jingleId);

        if (saved) {
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