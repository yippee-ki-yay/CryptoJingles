import {
  GET_ASSET_BALANCE_REQUEST,
  GET_ASSET_BALANCE_SUCCESS,
  GET_ASSET_BALANCE_FAILURE,

  GET_IS_ADDRESS_APPROVED_ON_ASSET_REQUEST,
  GET_IS_ADDRESS_APPROVED_ON_ASSET_SUCCESS,
  GET_IS_ADDRESS_APPROVED_ON_ASSET_FAILURE,

  APPROVE_ADDRESS_ON_ASSET_REQUEST,
  APPROVE_ADDRESS_ON_ASSET_SUCCESS,
  APPROVE_ADDRESS_ON_ASSET_FAILURE,

  GET_ASSET_PRICE_REQUEST,
  GET_ASSET_PRICE_SUCCESS,
  GET_ASSET_PRICE_FAILURE,
} from 'redux/actionTypes/assetsActionTypes';
import {
  approveAddressOnAsset,
  getApprovingReducerPropName,
  getAssetBalance,
  getGettingIsApprovedReducerPropName,
  getIsApprovedReducerPropName,
  isAddressApprovedOnAsset,
  getAssetPrice,
  getAssetInfo,
} from 'services/assetsService';

/**
 * Handles redux states when an assets balance is being fetched
 *
 * @param asset {String}
 * @return {Function}
 */
export const getAssetBalanceAction = (asset) => async (dispatch, getState) => {
  dispatch({ type: GET_ASSET_BALANCE_REQUEST, asset });

  try {
    const payload = await getAssetBalance(asset, getState().app.address);

    dispatch({ type: GET_ASSET_BALANCE_SUCCESS, asset, payload });

    return payload;
  } catch (err) {
    dispatch({ type: GET_ASSET_BALANCE_FAILURE, asset, payload: err.message });
  }
};

/**
 * Handles redux states when an assets price for a perticular currency
 *
 * @param asset {String}
 * @param currency {String}
 * @return {Function}
 */
export const getAssetPriceAction = (asset, currency) => async (dispatch, getState) => {
  dispatch({ type: GET_ASSET_PRICE_REQUEST, asset, currency });

  try {
    const payload = await getAssetPrice(asset, currency);

    dispatch({
      type: GET_ASSET_PRICE_SUCCESS, asset, currency, payload,
    });

    return payload;
  } catch (err) {
    dispatch({
      type: GET_ASSET_PRICE_FAILURE, asset, currency, payload: err.message,
    });
  }
};

/**
 * Handles redux action for checking if the address is approved on the asset
 *
 * @param asset {String}
 * @param spender {String}
 * @param tokenId {Number}
 * @param approveType {String}
 * @return {Function}
 */
export const isAddressApprovedOnAssetAction = (asset, spender, tokenId, approveType) => async (dispatch, getState) => {
  const gettingPropName = getGettingIsApprovedReducerPropName(approveType);
  const isApprovedPropName = getIsApprovedReducerPropName(approveType);

  dispatch({ type: GET_IS_ADDRESS_APPROVED_ON_ASSET_REQUEST, asset, gettingPropName }); // eslint-disable-line object-curly-newline

  const assetInfo = getAssetInfo(asset);

  try {
    const contract = await assetInfo.contract();

    const events = await contract.getPastEvents('Approval', {
      filter: { owner: getState().app.address, spender, tokenId: tokenId.toString() }, // Using an array means OR: e.g. 20 or 23
      fromBlock: assetInfo.fromBlock,
      toBlock: 'latest',
    });

    const payload = events.length > 0;

    dispatch({ type: GET_IS_ADDRESS_APPROVED_ON_ASSET_SUCCESS, asset, gettingPropName, isApprovedPropName, payload }); // eslint-disable-line object-curly-newline

    return payload;
  } catch (err) {
    dispatch({ type: GET_IS_ADDRESS_APPROVED_ON_ASSET_FAILURE, asset, gettingPropName, payload: err.message }); // eslint-disable-line object-curly-newline

    return false;
  }
};

/**
 * Handles redux action for when an address is being approved on an asset
 *
 * @param asset {String}
 * @param spender {String}
 * @param approveType {String}
 * @param tokenId {Number}
 * @return {Function}
 */
export const approveAddressOnAssetAction = (asset, spender, approveType, tokenId) => async (dispatch, getState) => {
  const propName = getApprovingReducerPropName(approveType);
  const isApprovedPropName = getIsApprovedReducerPropName(approveType);
  const { address } = getState().app;

  dispatch({
    type: APPROVE_ADDRESS_ON_ASSET_REQUEST, asset, address, propName,
  });

  try {
    await approveAddressOnAsset(asset, address, spender, tokenId);

    dispatch({ type: APPROVE_ADDRESS_ON_ASSET_SUCCESS, asset, address, propName, isApprovedPropName }); // eslint-disable-line object-curly-newline
  } catch (err) {
    dispatch({ type: APPROVE_ADDRESS_ON_ASSET_FAILURE, asset, address, propName, payload: err.message }); // eslint-disable-line object-curly-newline

    // do not remove - this is here to stop any methods from executing after this one
    throw new Error(err.message);
  }
};

/**
 * Checks if an address is approved and if not sends tx to approve it
 *
 * @param asset {String}
 * @param spender {String}
 * @param amount {String}
 * @param approveType {String}
 * @return {Function}
 */
export const approveAddressOnAssetIfNotApprovedAction = (asset, spender, amount, approveType) => async (dispatch, getState) => {
  if (asset === 'ETH') return;

  let approved = false;

  try {
    approved = await dispatch(isAddressApprovedOnAssetAction(asset, spender, amount, approveType));
    if (!approved) return dispatch(approveAddressOnAssetAction(asset, spender, approveType));
  } catch (err) {
    throw new Error(err.message);
  }
};
