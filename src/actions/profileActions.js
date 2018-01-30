import axios from 'axios';
import {
  SET_ACTIVE_PROFILE_TAB, SET_PROFILE_SAMPLES, SET_PROFILE_NUM_SAMPLES_TO_BUY, SET_PROFILE_IS_OWNER,
  SET_PROFILE_JINGLES, SET_PROFILE_JINGLES_CATEGORY, SET_PROFILE_JINGLES_SORT, TOGGLE_PROFILE_AUTHOR,
  SET_PROFILE_AUTHOR_EDIT, SET_PENDING_AUTHOR, AUTHOR_EDIT_SUCCESS
} from '../constants/actionTypes';
import { getSamples } from '../util/web3/ethereumService';
import { addPendingTx, removePendingTx } from '../actions/appActions';
import { SAMPLE_PRICE } from '../util/config';
import { API_URL } from '../util/config';

/**
 * Sets the active tab to the new value
 *
 * @param {String} value - value of tab
 *
 * @return {Function}
 */
export const setActiveTab = (value) => (dispatch, getState) => {
  const tabs = [...getState().profile.tabs];
  tabs[tabs.findIndex((_tab) => _tab.active)].active = false;
  tabs[tabs.findIndex((_tab) => _tab.value === value)].active = true;
  dispatch({ type: SET_ACTIVE_PROFILE_TAB, payload: tabs });
};

/**
 * Checks if the current profile is the users profile and sets
 * the results in the reducer
 *
 * @param {String} address - current profile address
 *
 * @return {Function}
 */
export const checkIfOwnerProfile = (address) => (dispatch) => {
  dispatch({
    type: SET_PROFILE_IS_OWNER,
    payload: {
      isOwner: web3.eth.accounts[0] === address, // eslint-disable-line
      address
    }});
};

/**
 * Dispatches action to change the value of authorEdit in the reducer
 * fires on input change
 *
 * @param {Object} event
 *
 * @return {Function}
 */
export const onEditAuthorChange = ({ target }) => (dispatch) => {
  dispatch({ type: SET_PROFILE_AUTHOR_EDIT, payload: target.value })
};

/**
 * Checks if the current profile is the users profile and sets
 * the results in the reducer
 *
 * @param {Boolean} hideOrShow - boolean to hide or show author input
 *
 * @return {Function}
 */
export const toggleEditAuthor = (hideOrShow) => (dispatch) => {
  dispatch({ type: TOGGLE_PROFILE_AUTHOR, payload: hideOrShow });
};

/**
 * Gets the author name from the contract for the given address
 *
 * @return {Function}
 */
export const getAuthor = () => async (dispatch, getState) => {
  try {
    const address = web3.eth.accounts[0]; // eslint-disable-line
    let author = await window.contract.authors(address);
    author = author || getState().profile.author;

    dispatch({ type: AUTHOR_EDIT_SUCCESS, payload: author });
  } catch(err) {
    console.log('Get author error', err);
    // TODO - Handle this
  }
};

/**
 * Sends value of author edit to the contract
 *
 * @return {Function}
 */
export const submitEditAuthorForm = () => async (dispatch, getState) => {
  const id = Math.floor(Math.random() * 6) + 1; // TODO - replace this with pending tx length
  try {
    const address = web3.eth.accounts[0]; // eslint-disable-line
    const newAuthorName = getState().profile.authorEdit;

    dispatch(addPendingTx(id, 'Edit author name'));
    dispatch({ type: SET_PENDING_AUTHOR });

    await window.contract.setAuthorName(newAuthorName, { from: address });

    dispatch(removePendingTx(id));
    dispatch({ type: AUTHOR_EDIT_SUCCESS, payload: newAuthorName });
  } catch(err) {
    dispatch(removePendingTx(id));
    dispatch({ type: AUTHOR_EDIT_SUCCESS, payload: getState().profile.author });
  }
};

// SAMPLES TODO - create separate reducer & actions for this
/**
 * Gets all samples from the contract for the current address
 *
 * @return {Function}
 */
export const getSamplesForUser = () => async (dispatch) => {
  const mySamples = await getSamples();
  dispatch({ type: SET_PROFILE_SAMPLES, payload: mySamples });
};

/**
 * Sends transaction to contract to buy specified number of samples
 *
 * @return {Function}
 */
export const buySamples = () => async (dispatch, getState) => {
  const id = Math.floor(Math.random() * 6) + 1; // TODO - replace this with pending tx length

  try {
    const account = web3.eth.accounts[0]; // eslint-disable-line
    const numJinglesToBuy = getState().profile.numSamplesToBuy;

    dispatch(addPendingTx(id, 'Buy sample'));
    await window.contract.buyJingle(parseInt(numJinglesToBuy, 10), {from: account, value: numJinglesToBuy * SAMPLE_PRICE});
    dispatch(removePendingTx(id));
  } catch(err) {
    dispatch(removePendingTx(id));
  }
};

/**
 * Updates number of samples to buy in state based on new input value
 *
 * @param {Object} event
 *
 * @return {Function}
 */
export const handleNumSamplesToBuyChange = ({ value }) => async (dispatch) => {
  if (value < 1) return;

  dispatch({ type: SET_PROFILE_NUM_SAMPLES_TO_BUY, payload: value });
};

// JINGLES TODO - create separate reducer & actions for this
/**
 * Gets all jingles from the server for the current address
 *
 * @return {Function}
 */
export const getJinglesForUser = () => async (dispatch, getState) => {
  const { currentJinglesPage, jingleCategory, jingleSorting, profileAddress } = getState().profile;
  const res = await axios(`${API_URL}/jingles/${jingleCategory.value}/${profileAddress}/page/${currentJinglesPage}/filter/${jingleSorting.value}`);
  dispatch({ type: SET_PROFILE_JINGLES, payload: res.data });
};

/**
 * Changes the current selected category for the jingles
 * tab in the current profile and then gets all jingles for that category
 *
 * @param {Object} payload { value, label }
 *
 * @return {Function}
 */
export const changeProfileJinglesCategory = (payload) => (dispatch) => {
  dispatch({ type: SET_PROFILE_JINGLES_CATEGORY, payload });
  dispatch(getJinglesForUser());
};

/**
 * Changes the current selected sorting option for the jingles tab
 * in the current profile and then get all jingles for that sorting option
 *
 * @param {Object} payload { value, label }
 *
 * @return {Function}
 */
export const changeProfileJinglesSorting = (payload) => (dispatch) => {
  dispatch({ type: SET_PROFILE_JINGLES_SORT, payload });
  dispatch(getJinglesForUser());
};
