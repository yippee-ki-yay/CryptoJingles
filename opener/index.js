require('dotenv').load();

const express = require('express');
const app = express();

const Web3 = require('web3');
const EthereumTx = require('ethereumjs-tx')
const cryptoJinglesAbi = require("../build/contracts/CryptoJingles");
const cryptoJinglesAddress = "0xae3099fa511aa90fc5696d63da390ca0c352a124";

const ourAddress = process.env.ADDRESS;
const ourPrivateKey = process.env.PRIV_KEY;

const web3 = new Web3(new Web3.providers.HttpProvider(process.env.ETH_NODE));
web3.eth.defaultAccount = ourAddress;

const cryptoJinglesContract = web3.eth.contract(cryptoJinglesAbi.abi).at(cryptoJinglesAddress);

const PurchasedEvent = cryptoJinglesContract.Purchased;

let nonce = web3.eth.getTransactionCount(ourAddress);

const gasPrice = 1202509001;

(async () => {
    PurchasedEvent(async (err, res) => {

        const purchaseId = res.args.numOfPurchases.valueOf();

        console.log('Opening jingle purchase: ', purchaseId);

        await sendTransaction(web3, cryptoJinglesContract.openJingles, ourAddress, [purchaseId], gasPrice, web3.toHex(nonce));
        nonce++;
   });

})();


const getEncodedParams = (contractMethod, params = null) => {
    let encodedTransaction = null;
    if (!params) {
      encodedTransaction = contractMethod.request.apply(contractMethod); // eslint-disable-line
    } else {
      encodedTransaction = contractMethod.request.apply(contractMethod, params); // eslint-disable-line
    }
    return encodedTransaction.params[0];
  };

const sendTransaction = async (web3, contractMethod, from, params, _gasPrice, nonce) =>
    new Promise(async (resolve, reject) => {
    try {
        const privateKey = new Buffer(ourPrivateKey, 'hex');

        const { to, data } = getEncodedParams(contractMethod, params);

        const gasPrice = web3.toHex(_gasPrice);

        const gas = web3.toHex(390000);

        let transactionParams = { from, to, data, gas, gasPrice, nonce };

        const txHash = await sendRawTransaction(web3, transactionParams, privateKey);
        console.log('TX hash', txHash);
        resolve(txHash);
    } catch (err) {
        reject(err);
    }
});

const sendRawTransaction = (web3, transactionParams, privateKey) =>
    new Promise((resolve, reject) => {
        const tx = new EthereumTx(transactionParams);

        tx.sign(privateKey);

        const serializedTx = `0x${tx.serialize().toString('hex')}`;

        web3.eth.sendRawTransaction(serializedTx, (error, transactionHash) => {
            console.log("Err: ", error);
            if (error) reject(error);

            resolve(transactionHash);
        });
});

app.get('/', (req, res) => res.send('Open them jingles!'))

app.listen(9999, () => console.log('Listening for Purchase event to open jingles!'))
