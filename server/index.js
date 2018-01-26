require('dotenv').load();

const Web3 = require('web3');
const express = require('express');

const db = require('./db');
const routes = require('./routes');
const marketplaceAbi = require("../build/contracts/Marketplace");

const app = express();
const marketplaceAddres = "";

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETH_NODE));

const marketplaceContract = web3.eth.contract(marketplaceAbi.abi).at(marketplaceAddres);

(async () => {
    marketplaceContract.SellOrder(async (err, res) => {
       if(err) {
           console.log(err);
       }

       // write the jingle data of the jingles that are on sale
   });

   marketplaceContract.Bought(async (err, res) => {
        if(err) {
            console.log(err);
        }

        // remove the jingle
    });

    marketplaceContract.Canceled(async (err, res) => {
        if(err) {
            console.log(err);
        }

        // remove the jingle
    });

})();

app.use('/api', routes);

app.get('/', (req, res) => res.send('Hi'));

app.listen(9999, () => console.log('Listening for Purchase events'));