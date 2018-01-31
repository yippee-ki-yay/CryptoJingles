
// require('dotenv').load();

// const Web3 = require('web3');
// const express = require('express');
// const cors = require('cors');

// const db = require('./db');
// const routes = require('./routes');
// const marketplaceAbi = require("../build/contracts/Marketplace");
// const jinglesAbi = require("../build/contracts/Jingle");

// const jingleCtrl = require('./controllers/jingles.controller');

// const app = express();
// const marketplaceAddress = "0x1d744b4fb32265f1a624ad38ea5c55d029719da8";
// const jinglesAddress = "0x17330b21d4c706eadc745295ed0a0b4bc43e8381";

// const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETH_NODE));

// const marketplaceContract = web3.eth.contract(marketplaceAbi.abi).at(marketplaceAddress);

// const jingles = web3.eth.contract(jinglesAbi.abi).at(jinglesAddress);


// (async () => {

//     jingles.Composed(async (err, res) => {
//         if(err) {
//             console.log(err);
//         }

//         const samples = res.args.samples.map(s => s.valueOf());

//         const sampleTypes = res.args.jingleTypes.map(s => s.valueOf());

//         const jingleData = {
//             jingleId: res.args.jingleId.valueOf(),
//             name: res.args.name,
//             author: res.args.author,
//             owner: res.args.owner,
//             samples,
//             sampleTypes,
//             onSale: false,
//             price: 0
//         };
 
//         const saved = await jingleCtrl.addJingle(jingleData);

//         if (saved) {
//             console.log('Jingle added to db!');
//         }
//     });

//     marketplaceContract.SellOrder(async (err, res) => {
//        if(err) {
//            console.log(err);
//        }

//        const order = {
//             jingleId: res.args.jingleId.valueOf(),
//             price: res.args.price.valueOf(),
//         };

//        const updated = await jingleCtrl.setForSale(order);

//        if (updated) {
//            console.log('Jingle set for sale');
//        }
//     });

//    marketplaceContract.Bought(async (err, res) => {
//         if(err) {
//             console.log(err);
//         }

//         const jingleId = res.args.jingleId.valueOf();
//         const buyer = res.args.buyer;

//         const updated = await jingleCtrl.removeFromSale(jingleId, buyer);

//         if (updated) {
//             console.log('Sell Order removed (bought)');
//         }
//     });

//     marketplaceContract.Canceled(async (err, res) => {
//         if(err) {
//             console.log(err);
//         }

//         const jingleId = res.args.jingleId.valueOf();
//         const owner = res.args.owner;

//         const updated = await jingleCtrl.removeFromSale(jingleId, owner);

//         if (updated) {
//             console.log('Sell Order removed (canceled)');
//         }
//     });

// })();

var audioconcat = require('audioconcat')

var songs = [
    'heavenly-trans_zydE3IHu.mp3',
  '01-28-2018_00-04_msg797792.mp3',
];

audioconcat(songs)
  .concat('all.mp3')
  .on('start', function (command) {
    console.log('ffmpeg process started:', command)
  })
  .on('error', function (err, stdout, stderr) {
    console.error('Error:', err)
    console.error('ffmpeg stderr:', stderr)
  })
  .on('end', function (output) {
    console.error('Audio created in:', output)
  })

// app.use(cors());
// app.use('/api', routes);

// app.get('/', (req, res) => res.send('Hi'));

// app.listen(9999, () => console.log('Listening for Purchase events'));