import t from 'translate';
import { requireAddress } from './utilsService';

const BASE_TX_MULTIPLIER = 1.1;

const handleError = (err, reject) => {
  let errorMessage = 'errors.error_occurred';

  if (err) {
    if (err.message) errorMessage = err.message;
    if (typeof err === 'string') errorMessage = err;
  }

  // Workaround for https://github.com/MetaMask/metamask-extension/issues/7160
  if (err?.stack?.includes('User denied transaction signature') || errorMessage.includes('User denied transaction signature')) {
    errorMessage = t('errors.denied_transaction');
  }

  reject(new Error(errorMessage));
};

const sendTxWeb3 = (tx) => new Promise((resolve, reject) => {
  try {
    tx.send({ ...tx, send: null })
      .on('transactionHash', () => {
        // onTxHashCallback();
      })
      .on('confirmation', (confirmNum, receipt) => {
        resolve(receipt);
      })
      .on('error', (err) => { handleError(err, reject); });
  } catch (err) {
    handleError(err, reject);
  }
});

/**
 * Calls the contract method via the web3 contract api
 * with custom estimatedGas
 * Takes in account exceptions because the estimateGas method
 * does not return the correct amount sometimes
 *
 * @param contract {Object}
 * @param contractFunc {String}
 * @param funcParams {Array}
 * @param _txParams {Object}
 *
 * @return {Promise}
 */
const callTx = (
  contract, contractFunc, funcParams, _txParams,
) => new Promise(async (resolve, reject) => { // eslint-disable-line
  try {
    requireAddress(contract.options.address);

    const method = contract.methods[contractFunc](...funcParams);

    const txParams = { ..._txParams };

    // txParams.realGas = await method.estimateGas(txParams);
    // txParams.gasLimit = Math.floor(BASE_TX_MULTIPLIER * txParams.realGas);

    const res = await sendTxWeb3({
      ...txParams, contractFunc, funcParams, send: method.send,
    });

    resolve(res);
  } catch (err) {
    reject(err);
  }
});

export default callTx;
