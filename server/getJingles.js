/* eslint-disable no-plusplus */
/* eslint-disable no-lonely-if */
/* eslint-disable no-restricted-syntax */
require('dotenv').config();

const Web3 = require('web3');

const web3 = new Web3(process.env.NODE_URL);

const db = require('./db');
const routes = require('./routes');

const marketplaceAbi = require('./abis/Marketplace.json');
const cryptoJinglesAbi = require('./abis/CryptoJingle');
const jinglesAbi = require('./abis/Jingle');

const userCtrl = require('./controllers/users.controller');

const marketplaceAddress = '0xc1ef465527343f68bb1841f99b9adeb061cc7ac9';
const jinglesAddress = '0x5b6660ca047cc351bfedca4fc864d0a88f551485';

const marketplaceContract = new web3.eth.Contract(
  marketplaceAbi.abi,
  marketplaceAddress,
);

const jinglesContract = new web3.eth.Contract(jinglesAbi.abi, jinglesAddress);
const jingleCtrl = require('./controllers/jingles.controller');

const cryptoJinglesAddress = '0xdea4c5c25218994d0468515195622e25820d27c7';
const cryptoJingles = new web3.eth.Contract(
  cryptoJinglesAbi.abi,
  cryptoJinglesAddress,
);

const startBlock = '5025886';
// const endBlock = parseInt(startBlock, 10) + 2000;

// console.log(endBlock);

const endBlock = '13143557';

let lastCycleBlock = startBlock;

async function update() {
  jinglesContract.getPastEvents(
    'Composed',
    { fromBlock: lastCycleBlock, toBlock: endBlock },
    async (err, events) => {
      const mined = events;

      const numJinglesInDb = await jingleCtrl.jingleNum();

      console.log('Trying', mined.length, numJinglesInDb);

      const newOnes = mined.length - numJinglesInDb;

      const jingles = mined
        .map((_jingle) => _jingle.returnValues)
        .map((_jingle) => ({
          ..._jingle,
          jingleId: parseFloat(_jingle.jingleId.valueOf()),
        }))
        .map(
          (_jingle) => new Promise(async (resolve) => {
            const samples = _jingle.samples.map((s) => s.valueOf());
            const sampleTypes = _jingle.jingleTypes.map((s) => s.valueOf());
            const settings = _jingle.settings.map((s) => s.valueOf());

            if (_jingle.jingleId.valueOf() >= numJinglesInDb) {
              const saved = await jingleCtrl.addJingle({
                jingleId: _jingle.jingleId.valueOf(),
                name: _jingle.name,
                author: _jingle.author,
                owner: _jingle.owner,
                samples,
                sampleTypes,
                onSale: false,
                price: 0,
                settings,
              });
              resolve(saved);
            }
          }),
        );

      console.log('GET JINGLES SUCCESS', jingles);

      Promise.all(jingles).then((_jingles) => {
        console.log('WROTE TO DB SUCCESS', _jingles);
      });
    },
  );

  cryptoJingles.getPastEvents(
    'Purchased',
    { fromBlock: lastCycleBlock, toBlock: endBlock },
    async (err, ress) => {
      ress.forEach(async (res) => {
        const address = res.returnValues.user;
        const numSamples = res.returnValues.numJingles.valueOf();

        console.log(address, numSamples);

        await userCtrl.addUser(address, numSamples);
      });
    },
  );

  const marketplace = {};

  marketplaceContract.getPastEvents(
    'allEvents',
    { fromBlock: lastCycleBlock, toBlock: endBlock },
    async (err, events) => {
      console.log(err, events);
      // eslint-disable-next-line no-use-before-define
      addMarketplaceEvents(events, marketplace);

      for (const key of Object.keys(marketplace)) {
        const eventList = marketplace[key];

        let numOrders = 0;
        let numCancels = 0;

        eventList.forEach((e) => {
          if (e.event === 'SellOrder') {
            numOrders++;
          } else {
            numCancels++;
          }
        });

        const e = eventList[eventList.length - 1];

        if (numOrders > numCancels) {
          // add
          await putOnSale(eventList[eventList.length - 1]);
        } else {
          // cancel

          if (e.event === 'Bought') {
            await boughtJingle(e);
          } else {
            await cancelJingle(e);
          }
        }
      }
    },
  );
}

async function boughtJingle(res) {
  const jingleId = res.returnValues.jingleId.valueOf();
  const { buyer } = res.returnValues;

  const updated = await jingleCtrl.removeFromSale(jingleId, buyer);

  if (updated) {
    console.log('Sell Order removed (bought)');
  }
}

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
  const { owner } = res.returnValues;

  const updated = await jingleCtrl.removeFromSale(jingleId, owner);

  if (updated) {
    console.log('Sell Order removed (canceled)');
  }
}

function addMarketplaceEvents(events, marketplace) {
  events.forEach((event) => {
    const jingleId = event.returnValues.jingleId.valueOf();

    if (marketplace[jingleId]) {
      marketplace[jingleId].push(event);
    } else {
      // eslint-disable-next-line no-param-reassign
      marketplace[jingleId] = [];
      marketplace[jingleId].push(event);
    }
  });
}

(async () => {
 // setInterval(async () => {
    await update();
    console.log('Block before: ', lastCycleBlock);

    lastCycleBlock = (await web3.eth.getBlockNumber()).toString();
    console.log('Block after: ', lastCycleBlock);
//  }, 1000 * 60 * 0.2);
})();
