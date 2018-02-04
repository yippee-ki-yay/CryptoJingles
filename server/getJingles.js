const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('https://monthly-superb-cod.quiknode.io/fe26e4e5-2f80-4f19-b6fb-f21e4851d233/v5WwMVIHrg8ppsDCS-6Weg==/'));

const db = require('./db');
const routes = require('./routes');

const marketplaceAbi = require("../build/contracts/Marketplace");
const marketplaceAddress = "0xb8e392da7abb836cff06d827531a7e5f1b00bed2";
const marketplaceContract = web3.eth.contract(marketplaceAbi.abi).at(marketplaceAddress);

const jinglesAbi = require("../build/contracts/Jingle");
const jinglesAddress = "0x5af7af54e8bc34b293e356ef11fffe51d6f9ae78";
const jinglesContract = web3.eth.contract(jinglesAbi.abi).at(jinglesAddress);
const jingleCtrl = require('./controllers/jingles.controller');

async function update() {
  jinglesContract.Composed({}, { fromBlock: '5025886', toBlock: 'latest' })
    .get(async (error, event) => {
      if (error) {
        console.log('GET JINGLES ERROR', error);
        return;
      }

      let mined = event.filter(_jingle => _jingle.type === 'mined');

      const numJinglesInDb = await jingleCtrl.jingleNum();

      console.log("Trying");

      if(mined.length > numJinglesInDb) {

        const newOnes = mined.length - numJinglesInDb;

        const jingles = 
                        mined
                        .map(_jingle => _jingle.args)
                        .map(_jingle => ({ ..._jingle, jingleId: parseFloat(_jingle.jingleId.valueOf()), }))
                        .map(_jingle => new Promise(async (resolve) => {

                          const samples = _jingle.samples.map(s => s.valueOf());
                          const sampleTypes = _jingle.jingleTypes.map(s => s.valueOf());

                          if (_jingle.jingleId.valueOf() > numJinglesInDb) {
                          const saved = await jingleCtrl.addJingle({
                              jingleId: _jingle.jingleId.valueOf(),
                              name: _jingle.name,
                              author: _jingle.author,
                              owner: _jingle.owner,
                              samples,
                              sampleTypes,
                              onSale: false,
                              price: 0
                          });
                          resolve(saved);}
                        }));

        //console.log('GET JINGLES SUCCESS', jingles);

        Promise.all(jingles).then((_jingles) => {
          console.log('WROTE TO DB SUCCESS', _jingles);
        });
      } else {
        return;
      }
    });
}

(async () => {
setInterval(async () => {
  update();
}, 1000*60*6);
})();
