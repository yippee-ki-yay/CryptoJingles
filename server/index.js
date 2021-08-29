
require('dotenv').config();

const Web3 = require('web3');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const db = require('./db');
const routes = require('./routes');
const marketplaceAbi = require("./abis/Marketplace.json");
const jinglesAbi = require("./abis/Jingle");
const cryptoJinglesAbi = require("./abis/CryptoJingle");
const jingleCtrl = require('./controllers/jingles.controller');
const userCtrl = require('./controllers/users.controller');

const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

const marketplaceAddress = "0xc1ef465527343f68bb1841f99b9adeb061cc7ac9";
const jinglesAddress = "0x5b6660ca047cc351bfedca4fc864d0a88f551485";
const cryptoJinglesAddress = "0xdea4c5c25218994d0468515195622e25820d27c7";

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.NODE_URL));

const _ = require('lodash');

const marketplaceContract = new web3.eth.Contract(marketplaceAbi.abi, marketplaceAddress);

const jingles = new web3.eth.Contract(jinglesAbi.abi, jinglesAddress);
const cryptoJingles = new web3.eth.Contract(cryptoJinglesAbi.abi, cryptoJinglesAddress);

(async () => {


    jingles.events.Composed({}).on('data', async (err, res) => {
        await addJingle(res);
    });

    marketplaceContract.events.SellOrder({}).on('data', async (err, res) => {
        await putOnSale(res);
    });

   marketplaceContract.events.Bought({}).on('data', async (err, res) => {
        await boughtJingle(res);
    });

    marketplaceContract.events.Canceled({}).on('data', async (err, res) => {
        await cancelJingle(res);
    });

    cryptoJingles.events.Purchased({}).on('data', async (err, res) => {

        if (!res.returnValues) {
            return;
        }

        const address = res.returnValues.user;
        const numSamples = res.returnValues.numJingles.valueOf();

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
        jingleId: res.returnValues.jingleId.valueOf(),
        price: res.returnValues.price.valueOf(),
    };

   const updated = await jingleCtrl.setForSale(order);

   if (updated) {
       console.log('Jingle set for sale');
   }
}

async function cancelJingle(res) {
    const jingleId = res.returnValues.jingleId.valueOf();
    const owner = res.returnValues.owner;

    const updated = await jingleCtrl.removeFromSale(jingleId, owner);

    if (updated) {
        console.log('Sell Order removed (canceled)');
    }
}

async function addJingle(res) {
    console.log(res);
    const samples = res.returnValues.samples.map(s => s.valueOf());
    const settings = res.returnValues.settings.map(s => s.valueOf());

    const sampleTypes = res.returnValues.jingleTypes.map(s => s.valueOf());

    const jingleData = {
        jingleId: res.returnValues.jingleId.valueOf(),
        name: res.returnValues.name,
        author: res.returnValues.author,
        owner: res.returnValues.owner,
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
    const jingleId = res.returnValues.jingleId.valueOf();
    const buyer = res.returnValues.buyer;

    const updated = await jingleCtrl.removeFromSale(jingleId, buyer);

    if (updated) {
        console.log('Sell Order removed (bought)');
    }
}

app.use(cors());
app.use('/api', routes);

app.listen(9999, () => console.log('Listening for Purchase events'));
