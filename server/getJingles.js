require('dotenv').load();

const Web3 = require('web3');

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.NODE_URL));

const db = require('./db');
const routes = require('./routes');

const marketplaceAbi = require('../build/contracts/Marketplace');

// const marketplaceAddress = '0x0d9da77d3e21b99dae30b67cb79fafb2c5cee0e5';
// const jinglesAddress = '0x0c0abddfdc1226ca336f24723c75e455fa1cd6bf';

const marketplaceAddress = '0xc1ef465527343f68bb1841f99b9adeb061cc7ac9';
const jinglesAddress = '0x5b6660ca047cc351bfedca4fc864d0a88f551485';

const marketplaceContract = web3.eth.contract(marketplaceAbi.abi).at(marketplaceAddress);

const jinglesAbi = require('../build/contracts/Jingle');

const jinglesContract = web3.eth.contract(jinglesAbi.abi).at(jinglesAddress);
const jingleCtrl = require('./controllers/jingles.controller');

async function update() {
  jinglesContract.Composed({}, { fromBlock: '5025886', toBlock: 'latest' })
    .get(async (error, event) => {
      if (error) {
        console.log('GET JINGLES ERROR', error);
        return;
      }

      console.log(event);

      const mined = event.filter(_jingle => _jingle.type === 'mined');

      const numJinglesInDb = await jingleCtrl.jingleNum();

      console.log('Trying', mined.length, numJinglesInDb);

     if (mined.length > numJinglesInDb) {
      const newOnes = mined.length - numJinglesInDb;

      const jingles =
                        mined
                          .map(_jingle => _jingle.args)
                          .map(_jingle => ({ ..._jingle, jingleId: parseFloat(_jingle.jingleId.valueOf()) }))
                          .map(_jingle => new Promise(async (resolve) => {
                            const samples = _jingle.samples.map(s => s.valueOf());
                            const sampleTypes = _jingle.jingleTypes.map(s => s.valueOf());
                            const settings = _jingle.settings.map(s => s.valueOf());

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
                          }));

      console.log('GET JINGLES SUCCESS', jingles);

      Promise.all(jingles).then((_jingles) => {
        console.log('WROTE TO DB SUCCESS', _jingles);
      });
      }
    });


  const marketplace = {};

  marketplaceContract.allEvents({ fromBlock: '5025886', toBlock: 'latest' }).get(async (err, events) => {
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
  });
}

async function boughtJingle(res) {
  const jingleId = res.args.jingleId.valueOf();
  const buyer = res.args.buyer;

  const updated = await jingleCtrl.removeFromSale(jingleId, buyer);

  if (updated) {
    console.log('Sell Order removed (bought)');
  }
}

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


function addMarketplaceEvents(events, marketplace) {
  events.forEach((event) => {
    const jingleId = event.args.jingleId.valueOf();

    if (marketplace[jingleId]) {
      marketplace[jingleId].push(event);
    } else {
      marketplace[jingleId] = [];
      marketplace[jingleId].push(event);
    }
  });
}

(async () => {
setInterval(async () => {
update();
}, 1000*60*3);
})();
