import axios from 'axios';
import {
  API_URL,
  NO_PROFILE_ADDRESSES,
  MarketplaceAddress,
  MarketplaceV0Address,
  WrappedNewJingleAddress,
  WrappedOGJingleAddress,
} from '../util/config';
import { LIKES_MESSAGE_TO_SIGN } from '../../config/universalConstants';
import { NUM_V0_OG_JINGLES, NUM_V1_OG_JINGLES } from '../constants/general';

/**
 * Converts price in wei to price in ETH without web3
 * @param price - ether
 */
export const formatSalePrice = (price) => (String(parseFloat(price) / 1000000000000000000)).slice(0, 8);

/**
 * Converts price in ethers to price in wei without web3
 * @param price - wei
 */
export const formatToWei = (price) => (parseFloat(price) * 1000000000000000000);

/**
 * Prompts user to sign message in order to
 * validate if it is truly him using the address
 *
 * @param {String} address
 * @param {String} stringToSign
 * @return {Object}
 */
const signString = (address, stringToSign) => new Promise((resolve, reject) => {
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

export const notSupportedAddressText = (address) => {
  const lcAddress = address.toLowerCase();

  if (NO_PROFILE_ADDRESSES.includes(lcAddress)) {
    if (lcAddress === MarketplaceV0Address) return 'Viewing the v0 marketplace is disabled here';
    if (lcAddress === MarketplaceAddress) return 'Viewing the v1 marketplace is disabled here';
    if (lcAddress === WrappedOGJingleAddress) return 'Viewing the Genesis wrapper is disabled here';
    if (lcAddress === WrappedNewJingleAddress) return 'Viewing the new wrapper is disabled here';
  }

  return 'Provided address is not valid.';
};

export const checkIfJingleOg = (version, jingleId) => {
  const isV0OG = version === 0 && jingleId <= NUM_V0_OG_JINGLES;
  const isV1OG = version === 1 && jingleId <= NUM_V1_OG_JINGLES;
  return isV0OG || isV1OG;
};

export const formatViewJingle = (version, jingle) => ({
  ...jingle,
  jingleId: parseInt(jingle.id, 10),
  version,
  liked: false,
  likeCount: 0,
  price: parseFloat(jingle.price),
  isOg: checkIfJingleOg(version, parseInt(jingle.id, 10)),
  type: '',
  owner: jingle.owner.toLowerCase(),
});
