import axios from 'axios';
import { API_URL } from '../constants/config';
import { SET_VALID_JINGLE, JINGLE_PAGE_LOADED } from '../constants/actionTypes';

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
 * @return {String} address
 */
export const loadPage = id => async (dispatch, getState) => {
  const { address } = getState().app;

  const jingle = await dispatch(getJingle(id));

  if (typeof jingle !== 'object') return dispatch({ type: SET_VALID_JINGLE, payload: false });

  const isOwner = jingle.owner === address;

  dispatch({ type: JINGLE_PAGE_LOADED, payload: { jingle, isOwner, validJingle: true } });
};
