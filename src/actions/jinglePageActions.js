import axios from 'axios';
import { API_URL } from '../constants/config';
import {
  SET_VALID_JINGLE, JINGLE_PAGE_LOADED, JINGLE_BOUGHT, JINGLE_SALE_CANCELED, JINGLE_PUT_ON_SALE, SET_JINGLE_SELL_PRICE,
  LIKE_UNLIKE_JINGLE_PAGE,
} from '../constants/actionTypes';
import { addPendingTx, removePendingTx } from './appActions';
import { guid, formatToWei, likeUnlikeJingle } from '../services/generalService';

/**
 * Gets jingle from the server based on provided JinlgeId
 *
 * @return {String} address
 */
export const getJingle = jingleId => async (dispatch, getState) => {
  const { address, lockedMM, hasMM } = getState().app;

  let jingleData = await axios(`${API_URL}/jingle/${jingleId}`);
  jingleData = jingleData.data;

  if (!jingleData) return false;

  if (!hasMM || lockedMM) jingleData.liked = false;
  else {
    const likedJinglesResponse = await axios(`${API_URL}/jingle/check-liked/${address}/${jingleId}`);
    jingleData.liked = likedJinglesResponse.data;
  }

  return jingleData;
};

/**
 * Is fired when the jinglePage component is loaded or when the
 * jinglePage jingleId url param changes
 *
 * @param {String} id
 * @return {Function}
 */
export const loadPage = id => async (dispatch, getState) => {
  const { address } = getState().app;

  const jingle = await dispatch(getJingle(id));

  if (typeof jingle !== 'object') return dispatch({ type: SET_VALID_JINGLE, payload: false });

  const isOwner = jingle.owner === address;

  dispatch({ type: JINGLE_PAGE_LOADED, payload: { jingle, isOwner, validJingle: true } });
};

/**
 * Fires when a user is on another users jingle
 * and clicks the purchase button
 *
 * @return {Function} address
 */
export const purchaseJingle = () => async (dispatch, getState) => {
  const { jinglePage, app } = getState();
  let { jingle } = jinglePage;
  const from = app.address;

  const id = guid();
  dispatch(addPendingTx(id, 'Buy Jingle'));
  await window.marketplaceContract.buy(jingle.jingleId, { from, value: jingle.price });
  dispatch(removePendingTx(id));

  jingle = await dispatch(getJingle(jingle.jingleId));
  const isOwner = jingle.owner === from;

  dispatch({ type: JINGLE_BOUGHT, payload: { jingle, isOwner } });
};

/**
 * Fires when a user is on his own jingle
 * and clicks the cancel sale button
 *
 * @return {Function}
 */
export const cancelJingleSale = () => async (dispatch, getState) => {
  const { jinglePage, app } = getState();
  let { jingle } = jinglePage;
  const from = app.address;

  const id = guid();
  dispatch(addPendingTx(id, 'Cancel Sale'));
  await window.marketplaceContract.cancel(jingle.jingleId, { from });
  dispatch(removePendingTx(id));

  jingle = await dispatch(getJingle(jingle.jingle));
  dispatch({ type: JINGLE_SALE_CANCELED, payload: jingle });
};

/**
 * Fires when a user is on his own jingle
 * and clicks the sell jingle button
 *
 * @return {Function}
 */
export const putJingleOnSale = () => async (dispatch, getState) => {
  const { jinglePage, app } = getState();
  let { jingle } = jinglePage;
  const { salePrice } = jinglePage;
  const from = app.address;

  if (salePrice && (salePrice <= 0)) return;

  const id = guid();
  dispatch(addPendingTx(id, 'Sell Jingle'));
  await window.jingleContract.approveAndSell(jingle.jingleId, salePrice, { from });
  dispatch(removePendingTx(id));

  jingle = await dispatch(getJingle(jingle.jingleId));
  dispatch({ type: JINGLE_PUT_ON_SALE, payload: jingle });
};

/**
 * Fires when the user changes the input value for
 * jingle sale price
 *
 * @param {Object} event
 * @return {Function}
 */
export const handleSalePriceChange = event => (dispatch ) => {
  dispatch({ type: SET_JINGLE_SELL_PRICE, payload: formatToWei(event.target.value) });
};

/**
 * Fires when a user clicks the heart like/unlike icon
 *
 * @param {String|Number} jingleId
 * @param {Boolean} action
 * @return {Function}
 */
export const likeUnlikeJinglePageJingle = (jingleId, action) => async (dispatch, getState) => {
  const { jinglePage, app } = getState();
  const { jingle } = jinglePage;
  const address = { app };

  const likeData = await likeUnlikeJingle(jingleId, action, address);
  if (!likeData) return;

  dispatch({ type: LIKE_UNLIKE_JINGLE_PAGE, payload: { ...jingle, ...likeData } });
};
