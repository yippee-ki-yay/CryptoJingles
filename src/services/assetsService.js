import Dec from 'decimal.js';
import { getErc20Contract } from './contractsRegistryService';
import {
  ASSETS, DEFAULT_ASSET,
} from '../constants/assets';
import callTx from './txService';
import { ethToWei } from './web3Service';

/**
 * Gets full asset data for the asset symbol
 * @param assetSymbol {String}
 * @return {{symbol: string, address: *, decimals: number, name: string, icon: *}|void|{symbol: string, address: string, decimals: number, name: string, icon: function(): string}}
 */
export const getAssetInfo = (assetSymbol) => ASSETS.find((t) => t.symbol.toLowerCase() === assetSymbol?.toLowerCase()) || console.trace(`Asset "${assetSymbol}" not found `) || { ...DEFAULT_ASSET };

/**
 * Gets the assets number of decimals and does the conversion to eth
 * @param amount {Number, String, Object}
 * @param assetSymbol {String}
 * @return {String}
 */
export const assetAmountInEth = (amount, assetSymbol = 'ETH') => {
  const { decimals } = getAssetInfo(assetSymbol);
  return Dec(amount?.toString() || 0).div(10 ** decimals).toString();
};

/**
 * Gets the assets number of decimals and does the conversion to wei
 * @param amount {Number, String, Object}
 * @param assetSymbol {String}
 * @return {String}
 */
export const assetAmountInWei = (amount, assetSymbol = 'ETH') => {
  const { decimals } = getAssetInfo(assetSymbol);

  return Dec(amount?.toString() || 0).mul(10 ** decimals).floor().toFixed()
    .toString();
};

/**
 * Fetches the allowance amount on a asset
 *
 * @param assetSymbol {String} Token symbol
 * @param owner {String}
 * @param spender {String}
 * @return {Promise<string>}
 */
const getAssetAllowanceForAddress = async (assetSymbol, owner, spender) => {
  const contract = await getErc20Contract(getAssetInfo(assetSymbol).address);
  const data = await contract.methods.allowance(owner, spender).call();

  return assetAmountInEth(data, assetSymbol);
};

/**
 * Transforms the approve type to the prop name in the reducer for when
 * an asset is being approved
 *
 * @param approveType
 * @return {string}
 */
export const getApprovingReducerPropName = (approveType) => `approving${approveType}`;

/**
 * Transforms the approve type to the prop name in the reducer when
 * checking if an asset is approved
 *
 * @param approveType
 * @return {string}
 */
export const getGettingIsApprovedReducerPropName = (approveType) => `gettingIsApproved${approveType}`;

/**
 * Transforms the approve type to the prop name in the reducer when
 * checking if an asset is approved
 *
 * @param approveType
 * @return {string}
 */
export const getIsApprovedReducerPropName = (approveType) => `approved${approveType}`;

/**
 * Gets from the state if the approving tx
 * for an account is sending
 *
 * @param state {Object}
 * @param assetSymbol {String}
 * @param approveType {String}
 * @returns {*|boolean}
 */
export const getApprovingState = (state, assetSymbol, approveType) => {
  const { app, assets } = state;
  const { address } = app;

  if (!address) return false;

  const singleAssetAccountState = assets[assetSymbol][address];
  if (!singleAssetAccountState) return false;

  const propName = getApprovingReducerPropName(approveType);

  return singleAssetAccountState[propName] || false;
};

/**
 * Checks if an asset is approved for some amount
 *
 * @param addressToCheck {String}
 * @param account {String}
 * @param assetSymbol {String}
 * @param amount {String}
 * @return {Promise<boolean>}
 */
export const isAddressApprovedOnAsset = async (assetSymbol, account, addressToCheck, amount) => {
  if (assetSymbol === 'ETH') return true;

  const allowance = await getAssetAllowanceForAddress(assetSymbol, account, addressToCheck);
  return Dec(allowance).gte(amount);
};

/**
 * Approves Erc20 asset for an address
 *
 * @param assetSymbol {String} Token symbol
 * @param from {String}
 * @param approveAddress {String} Spender address
 * @return {Promise<Boolean>}
 */
export const approveAddressOnAsset = async (
  assetSymbol, from, approveAddress,
) => {
  const assetContract = await getErc20Contract(getAssetInfo(assetSymbol).address);
  const num = ethToWei(Number.MAX_SAFE_INTEGER.toString());

  return callTx(assetContract, 'approve', [approveAddress, num], { from });
};

/**
 * Gets balance of a provided address on an Erc20 asset
 *
 * @param assetSymbol {String}
 * @param address {String}
 * @return {Promise<String>}
 */
export const getAssetBalance = async (assetSymbol, address) => {
  const isEth = assetSymbol === 'ETH';
  if (!address && !isEth) return '0';

  let data = '';

  if (isEth) data = await window._web3.eth.getBalance(address);
  else {
    const contract = await getErc20Contract(getAssetInfo(assetSymbol).address);
    data = (await contract.methods.balanceOf(address).call()).toString();
  }

  // This maybe needs to be changed if we are checking
  // the balance of one token on another token
  return assetAmountInEth(data, assetSymbol);
};

/**
 * Fetches total supply of any asset
 * @param assetSymbol {String}
 * @returns {Promise<String>}
 */
export const getAssetTotalSupply = async (assetSymbol) => {
  const contract = await getErc20Contract(getAssetInfo(assetSymbol).address);
  const data = (await contract.methods.totalSupply().call()).toString();
  return assetAmountInEth(data, assetSymbol);
};

export const createUniswapSwapLink = (assetSymbol) => `https://app.uniswap.org/#/swap?outputCurrency=${(getAssetInfo(assetSymbol)).address}`;

export const getAssetPrice = (asset, currency) => {
  if (asset === 'ETH' && currency === 'USD') return '2000';
  return '0';
};
