
//require('dotenv').load();

const Web3 = require('web3');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./db');
const routes = require('./routes');
const marketplaceAbi = require("../build/contracts/Marketplace");
const jinglesAbi = require("../build/contracts/Jingle");
const cryptoJinglesAbi = require("../build/contracts/CryptoJingles");
const jingleCtrl = require('./controllers/jingles.controller');
const userCtrl = require('./controllers/users.controller');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const marketplaceAddress = "0x0d9da77d3e21b99dae30b67cb79fafb2c5cee0e5";
const jinglesAddress = "0x0c0abddfdc1226ca336f24723c75e455fa1cd6bf";
const cryptoJinglesAddress = "0x3351ef3166ed2ddd8acb1e37362dda6275869b8c";

const web3 = new Web3(new Web3.providers.HttpProvider("http://ropsten.decenter.com"));

const _ = require('lodash');

const marketplaceContract = web3.eth.contract(marketplaceAbi.abi).at(marketplaceAddress);

const jingles = web3.eth.contract(jinglesAbi.abi).at(jinglesAddress);
const cryptoJingles = web3.eth.contract(cryptoJinglesAbi.abi).at(cryptoJinglesAddress);

(async () => {


    jingles.Composed(async (err, res) => {
        await addJingle(res);
    });

    marketplaceContract.SellOrder(async (err, res) => {
        await putOnSale(res);
    });

   marketplaceContract.Bought(async (err, res) => {
        await boughtJingle(res);
    });

    marketplaceContract.Canceled(async (err, res) => {
        await cancelJingle(res);
    });

    cryptoJingles.Purchased(async (err, res) => {

        if (!res.args) {
            return;
        }

        const address = res.args.user;
        const numSamples = res.args.numJingles.valueOf();

        console.log(address, numSamples);

        await userCtrl.setNumSamplesBought(address, numSamples);
    });

    //BACKUP LISTEN
    // marketplaceContract.allEvents(async (err, res) => {
    //     if (res.event === 'SellOrder') {
    //         await putOnSale(res);
    //     } else if(res.event === 'Bought') {
    //         await boughtJingle(res);
    //     } else if(res.event === 'Canceled') {
    //         await cancelJingle(res);
    //     }
    // });

    // jingles.allEvents(async (err, res) => {
    //     if (res.event === 'Composed') {
    //         await addJingle(res);
    //     }
    // });

})();

async function putOnSale(res) {
    const order = {
        jingleId: res.args.jingleId.valueOf(),
        price: res.args.price.valueOf(),
    };

   const updated = await jingleCtrl.setForSale(order);

   if (updated) {
       console.log('Jingle set for sale');
   }
}

async function cancelJingle(res) {
    const jingleId = res.args.jingleId.valueOf();
    const owner = res.args.owner;

    const updated = await jingleCtrl.removeFromSale(jingleId, owner);

    if (updated) {
        console.log('Sell Order removed (canceled)');
    }
}

async function addJingle(res) {
    const samples = res.args.samples.map(s => s.valueOf());
    const settings = res.args.settings.map(s => s.valueOf());

    const sampleTypes = res.args.jingleTypes.map(s => s.valueOf());

    const jingleData = {
        jingleId: res.args.jingleId.valueOf(),
        name: res.args.name,
        author: res.args.author,
        owner: res.args.owner,
        samples,
        sampleTypes,
        onSale: false,
        price: 0,
        settings,
    };

    const saved = await jingleCtrl.addJingle(jingleData);

    if (saved) {
        console.log('Jingle added to db!');
    }
}

async function boughtJingle(res) {
    const jingleId = res.args.jingleId.valueOf();
    const buyer = res.args.buyer;

    const updated = await jingleCtrl.removeFromSale(jingleId, buyer);

    if (updated) {
        console.log('Sell Order removed (bought)');
    }
}

app.use(cors());
app.use('/api', routes);

app.get('/', (req, res) => res.send('Hi'));

app.listen(9999, () => console.log('Listening for Purchase events'));
