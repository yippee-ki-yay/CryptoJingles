import {
  GET_SINGLE_JINGLE_REQUEST,
  GET_SINGLE_JINGLE_SUCCESS,
  GET_SINGLE_JINGLE_FAILURE,
  CLEAR_SINGLE_JINGLE,

  PURCHASE_JINGLE_REQUEST,
  PURCHASE_JINGLE_SUCCESS,
  PURCHASE_JINGLE_FAILURE,
  CLEAR_PURCHASE_JINGLE,

  SET_JINGLE_SALE_PRICE,
  SELL_JINGLE_REQUEST,
  SELL_JINGLE_SUCCESS,
  SELL_JINGLE_FAILURE,
  CLEAR_SELL_JINGLE,

  CANCEL_SALE_JINGLE_REQUEST,
  CANCEL_SALE_JINGLE_SUCCESS,
  CANCEL_SALE_JINGLE_FAILURE,
  CLEAR_CANCEL_SALE_JINGLE,
} from 'redux/actionTypes/singleJingleActionTypes';
import {
  getSingleJingle,
  purchaseJingle,
  sellJingle,
  cancelJingleSale,
} from 'services/singleJingleService';
import { MarketplaceAddress, MarketplaceV0Address } from '../../util/config';
import { formatToWei } from '../../actions/utils';

/**
 * Handles the reducer state for getting data for a single jingle
 * per version per id
 *
 * @param version
 * @param id
 * @return {(function(*))|*}
 */
export const getSingleJingleAction = (version, id) => async (dispatch) => {
  dispatch({ type: GET_SINGLE_JINGLE_REQUEST });

  try {
    const payload = await getSingleJingle(version, id);

    dispatch({ type: GET_SINGLE_JINGLE_SUCCESS, payload });
  } catch (err) {
    dispatch({ type: GET_SINGLE_JINGLE_FAILURE, payload: err.message });
  }
};

/**
 * Handles the reducer state for clearing the current single jingle
 *
 * @return {*}
 */
export const clearSingleJingleAction = () => (dispatch) => dispatch({ type: CLEAR_SINGLE_JINGLE });

/**
 * Handles the reducer state for buying a jingle
 *
 * @param version
 * @param id
 * @param price
 * @param reducerKey
 * @return {(function(*, *): Promise<void>)|*}
 */
export const purchaseJingleAction = (version, id, price, reducerKey) => async (dispatch, getState) => {
  const { address } = getState().app;

  dispatch({ type: PURCHASE_JINGLE_REQUEST, key: reducerKey });

  try {
    await purchaseJingle(version, id, price, address);

    const payload = {
      ...getState().singleJingle.singleJingle,
      owner: address.toLowerCase(),
      onSale: false,
      realOwner: '',
      price: '',
    };

    dispatch({ type: PURCHASE_JINGLE_SUCCESS, key: reducerKey, payload });
  } catch (err) {
    dispatch({ type: PURCHASE_JINGLE_FAILURE, key: reducerKey, payload: err.message });
  }
};

/**
 * Handles the reducer state for clearing the purchase action state
 *
 * @param key {String}
 * @return {Function}
 */
export const clearPurchaseJingleAction = (key) => (dispatch, getState) => {
  const singlePurchasingJingle = getState().singleJingle.purchasingJingle[key];

  if (singlePurchasingJingle && !singlePurchasingJingle.purchasing) dispatch({ type: CLEAR_PURCHASE_JINGLE, key });
};

/**
 * Handles the reducer state for changing a single jingles
 * sale price in the form
 *
 * @param payload
 * @param key
 * @return {function(*): *}
 */
export const setJingleSalePriceAction = (payload, key) => (dispatch) => dispatch({ type: SET_JINGLE_SALE_PRICE, key, payload });

/**
 * Handles the reducer state for selling a jingle
 *
 * @param version
 * @param id
 * @param reducerKey
 * @return {(function(*, *): Promise<void>)|*}
 */
export const sellJingleAction = (version, id, reducerKey) => async (dispatch, getState) => {
  const { address } = getState().app;

  const price = formatToWei(getState().singleJingle.jingleSalePrices[reducerKey]);

  dispatch({ type: SELL_JINGLE_REQUEST, key: reducerKey });

  try {
    await sellJingle(version, id, price, address);

    const payload = {
      ...getState().singleJingle.singleJingle,
      owner: version === 1 ? MarketplaceAddress.toLowerCase() : MarketplaceV0Address.toLowerCase(),
      onSale: true,
      realOwner: address.toLowerCase(),
      price,
    };

    dispatch({ type: SELL_JINGLE_SUCCESS, key: reducerKey, payload });
  } catch (err) {
    dispatch({ type: SELL_JINGLE_FAILURE, key: reducerKey, payload: err.message });
  }
};

/**
 * Handles the reducer state for clearing the sell action state
 *
 * @param key {String}
 * @return {Function}
 */
export const clearSellJingleAction = (key) => (dispatch, getState) => {
  const singleSellingJingle = getState().singleJingle.sellingJingle[key];

  if (!singleSellingJingle) dispatch(setJingleSalePriceAction('', key));
  if (singleSellingJingle && !singleSellingJingle.selling) dispatch({ type: CLEAR_SELL_JINGLE, key });
};

/**
 * Handles the reducer state for canceling a jingle sale
 *
 * @param version
 * @param id
 * @param reducerKey
 * @return {(function(*, *): Promise<void>)|*}
 */
export const cancelSaleJingleAction = (version, id, reducerKey) => async (dispatch, getState) => {
  const { address } = getState().app;

  dispatch({ type: CANCEL_SALE_JINGLE_REQUEST, key: reducerKey });

  try {
    await cancelJingleSale(version, id, address);

    const payload = {
      ...getState().singleJingle.singleJingle,
      owner: address.toLowerCase(),
      onSale: false,
      realOwner: '',
      price: '',
    };

    dispatch({ type: CANCEL_SALE_JINGLE_SUCCESS, key: reducerKey, payload });
  } catch (err) {
    dispatch({ type: CANCEL_SALE_JINGLE_FAILURE, key: reducerKey, payload: err.message });
  }
};

/**
 * Handles the reducer state for clearing the cancel sale action state
 *
 * @param key {String}
 * @return {Function}
 */
export const clearCancelSaleJingleAction = (key) => (dispatch, getState) => {
  const singleCancelingJingle = getState().singleJingle.cancelingJingle[key];

  if (singleCancelingJingle && !singleCancelingJingle.canceling) dispatch({ type: CLEAR_CANCEL_SALE_JINGLE, key });
};
