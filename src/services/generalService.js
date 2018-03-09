import axios from 'axios';
import { API_URL } from '../constants/config';
import { LIKES_MESSAGE_TO_SIGN } from '../../config/universalConstants';

/**
 * Converts price in wei to price in ETH without web3
 * @param price - ether
 */
export const formatSalePrice = price => (String(parseFloat(price) / 1000000000000000000)).slice(0, 8);

/**
 * Converts price in ethers to price in wei without web3
 * @param price - wei
 */
export const formatToWei = price => (parseFloat(price) * 1000000000000000000);

/**
 * Prompts user to sign message in order to
 * validate if it is truly him using the address
 *
 * @param {String} address
 * @param {String} stringToSign
 * @return {Object}
 */
const signString = (address, stringToSign) =>
  new Promise((resolve, reject) => {
    const msgParams = [{
      type: 'string',
      name: 'Message',
      value: stringToSign,
    }];

    window.web3.givenProvider.sendAsync({
      method: 'eth_signTypedData',
      params: [msgParams, address],
      from: address,
    }, (err, data) => {
      if (err || data.error) return reject(data.error);
      return resolve(data.result);
    });
  });

/**
 * Gets signed message and sends it to the server
 * for validation.
 *
 * @param {String|Number} jingleId
 * @param {Boolean} action
 * @param {String} address
 * @return {Object}
 */
export const likeUnlikeJingle = async (jingleId, action, address) => {
  const actionString = action ? 'like' : 'unlike';

  try {
    const sig = await signString(address, LIKES_MESSAGE_TO_SIGN);

    const response = await axios.post(`${API_URL}/jingle/${actionString}`, { address, jingleId, sig });

    return { likeCount: response.data.likeCount, liked: action };
  } catch (err) {
    // TODO Handle this in the future
    return false;
  }
};

/**
 * Generates unique id
 *
 * @return {String}
 */
export const guid = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};

/**
 * Returns name of Ethereum network for given ID
 *
 * @return {String}
 */
export const nameOfNetwork = (networkId) => {
  const networks = {
    1: 'Mainnet',
    3: 'Ropsten',
    4: 'Rinkedby',
    42: 'Kovan',
  };
  return networks[networkId] || 'Unknown network';
};

