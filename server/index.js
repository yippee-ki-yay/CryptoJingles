
require('dotenv').load();

const Web3 = require('web3');
const express = require('express');

const db = require('./db');
const routes = require('./routes');
const marketplaceAbi = require("../build/contracts/Marketplace");
const jinglesAbi = require("../build/contracts/Jingle");

const app = express();
const marketplaceAddress = "0x1cd2d4def506a69858f30bce024481e8fc4d3ab8";
const jinglesAddress = "0x48961f89cd2df64766184d358bc7c2e3cb1873ba";

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETH_NODE));

const marketplaceContract = web3.eth.contract(marketplaceAbi.abi).at(marketplaceAddress);

const jingles = web3.eth.contract(jinglesAbi.abi).at(jinglesAddress);

(async () => {

    jingles.Composed(async (err, res) => {
        if(err) {
            console.log(err);
        }
 
        console.log(res);
    });

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