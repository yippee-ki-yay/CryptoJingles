import { wait } from './utilsService';

export const getAccount = async () => {
  const accounts = await window._web3.eth.getAccounts();

  if (!accounts.length) throw new Error('no_accounts_locked');
  return accounts[0];
};

export const getNetwork = (web3) => {
  if (web3) return web3.eth.net.getId();
  return window._web3.eth.net.getId();
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
    56: 'Binance Smart Chain',
    97: 'Binance Smart Chain - Testnet',
  };
  return networks[networkId] || 'errors.unknown_network';
};

/**
 * Recursive function which tries to get an account
 *
 * @param retryNum {Number}
 * @returns {Promise<*|boolean>}
 */
const retryGetAccounts = async (retryNum = 0) => {
  const response = await window.ethereum.request({ method: 'eth_requestAccounts', params: [] });
  if (!response && !window.ethereum.selectedAddress) {
    if (retryNum < 5) {
      await wait(300);
      return retryGetAccounts(retryNum + 1);
    }

    return false;
  }

  return window.ethereum.selectedAddress || response.result[0];
};

/**
 * Checks if the user has approved to use MM as the provider
 *
 * @return {Promise<*>}
 */
export const isInPageProviderApproved = async () => {
  try {
    if (!window.ethereum || !window.ethereum.enable) return true;

    if (window.ethereum.selectedAddress) return true;

    const account = await window.ethereum.request({ method: 'eth_requestAccounts', params: [] });
    return !!account;
  } catch (err) {
    return false;
  }
};

/**
 * If MetaMask privacy is on, opens MetaMask modal to whitelist it
 *
 * @return {Promise<*>}
 */
export const inPageProviderApprove = async () => {
  if (window.ethereum) return window.ethereum.enable();
};

/**
 * Gets the name of the inpage provider
 *
 * @return {string}
 */
export const getInPageProviderName = () => {
  const provider = window.ethereum || window.web3?.currentProvider;

  if (!provider) return 'Browser';

  if (provider.isMathWallet) return 'Math Wallet';
  if (provider.isSafePal) return 'SafePal';
  if (provider.isTokenPocket) return 'TokenPocket';
  if (provider.isMetaMask) return 'MetaMask';
  if (provider.isStatus) return 'Status';
  if (provider.isImToken) return 'imToken';
  if (provider.isTrust) return 'Trust';
  if (provider.isToshi) return 'Coinbase';
  if (provider.isTokenary) return 'Tokenary';
  if (navigator.userAgent.match(/Opera|OPR/)) return 'Opera';

  return 'Browser';
};

// Checks what operating system is used for mobile devices
// @return {string}
export const getMobileOperatingSystem = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;
  // Windows Phone must come first because its UA also contains "Android"
  if (/windows phone/i.test(userAgent)) {
    return 'Windows Phone';
  }
  if (/android/i.test(userAgent)) {
    return 'Android';
  }
  // iOS detection from: http://stackoverflow.com/a/9039885/177710
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS';
  }
  return 'unknown';
};

export const browserDetect = () => {
  const ua = window.navigator.userAgent.toLowerCase();

  // Detect browsers (only the ones that have some kind of quirk we need to work around)
  if (ua.match(/chrome/gi) !== null) return 'Chrome';
  if (ua.match(/firefox/gi) !== null) return 'Firefox';
  if (ua.match(/brave/gi) !== null) return 'Brave';
  if (ua.match(/edge/gi) !== null) return 'Edge';
  // If any case miss we will return null
  return null;
};
