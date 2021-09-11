import {
  GET_SINGLE_JINGLE_REQUEST,
  GET_SINGLE_JINGLE_SUCCESS,
  GET_SINGLE_JINGLE_FAILURE,
  CLEAR_SINGLE_JINGLE,

  PURCHASE_JINGLE_REQUEST,
  PURCHASE_JINGLE_SUCCESS,
  PURCHASE_JINGLE_FAILURE,
  CLEAR_PURCHASE_JINGLE,
} from 'redux/actionTypes/singleJingleActionTypes';
import {
  getSingleJingle,
  purchaseJingle,
} from 'services/singleJingleService';
import { wait } from '../../services/utilsService';

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
      owner: address,
      onSale: false,
      realOwner: '',
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

  console.log('singlePurchasingJingle', singlePurchasingJingle);
  if (singlePurchasingJingle && !singlePurchasingJingle.purchasing) dispatch({ type: CLEAR_PURCHASE_JINGLE, key });
};
