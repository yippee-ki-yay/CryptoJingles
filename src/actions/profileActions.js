import axios from 'axios';
import {
  SET_ACTIVE_PROFILE_TAB, SET_PROFILE_SAMPLES, SET_PROFILE_NUM_SAMPLES_TO_BUY, SET_PROFILE_IS_OWNER,
  SET_PROFILE_JINGLES, SET_PROFILE_JINGLES_CATEGORY, SET_PROFILE_JINGLES_SORT, TOGGLE_PROFILE_AUTHOR,
  SET_PROFILE_AUTHOR_EDIT, SET_PENDING_AUTHOR, AUTHOR_EDIT_SUCCESS, SET_MY_JINGLES_PAGE, SET_PROFILE_ADDRESS,
  SAMPLE_SORTING_OPTIONS, SET_MY_SAMPLES_SORTING, PROFILE_LIKE_UNLIKE_JINGLE, SET_INVALID_PROFILE,

  BUY_SAMPLES_REQUEST,
  BUY_SAMPLES_SUCCESS,
  BUY_SAMPLES_FAILURE,
  CLEAR_BUY_SAMPLES,
} from '../constants/actionTypes';
import { getSamples } from '../util/web3/ethereumService';
import { addPendingTx, removePendingTx, guid } from './appActions';
import { SAMPLE_PRICE, API_URL } from '../util/config';
import { likeUnlikeJingle } from './utils';
import { getAllJingles } from '../services/jingleService';
import { wait } from '../services/utilsService';

/**
 * Dispatches action to show that the profile address URL param
 * is not valid and that there can't be any profile with that address
 *
 * @return {Function}
 */
export const setInvalidProfile = () => (dispatch) => { dispatch({ type: SET_INVALID_PROFILE }); };

/**
 * Sets the profile address to be equal to the route para
 *
 * @param {String} address
 *
 * @return {Function}
 */
export const setProfileAddress = (address) => (dispatch) => {
  dispatch({ type: SET_PROFILE_ADDRESS, payload: address });
};

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
 * @return {Function}
 */
export const checkIfOwnerProfile = () => async (dispatch, getState) => {
  const state = getState();
  const isOwner = state.profile.profileAddress === state.app.address;

  dispatch({ type: SET_PROFILE_IS_OWNER, payload: { isOwner } });
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
  dispatch({ type: SET_PROFILE_AUTHOR_EDIT, payload: target.value });
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
    let author = await window.contract.authors(getState().profile.profileAddress);
    author = author || getState().profile.author;

    dispatch({ type: AUTHOR_EDIT_SUCCESS, payload: author });
  } catch (err) {
    // TODO - Handle this
  }
};

/**
 * Sends value of author edit to the contract
 *
 * @return {Function}
 */
export const submitEditAuthorForm = () => async (dispatch, getState) => {
  const id = guid();
  try {
    const state = getState();
    const { address } = state.app;

    const newAuthorName = state.profile.authorEdit;

    dispatch(addPendingTx(id, 'Edit author name'));
    dispatch({ type: SET_PENDING_AUTHOR });

    await window.contract.setAuthorName(newAuthorName, { from: address });

    dispatch(removePendingTx(id));
    dispatch({ type: AUTHOR_EDIT_SUCCESS, payload: newAuthorName });
  } catch (err) {
    dispatch(removePendingTx(id));
    dispatch({ type: AUTHOR_EDIT_SUCCESS, payload: getState().profile.author });
  }
};

// SAMPLES TODO - create separate reducer & actions for this
/**
 * Sorts profile samples by selected sort option TODO - unify this with compose tab sorting
 *
 * @param {Object} option { label, value }
 * @return {Function}
 */
export const onMySamplesSort = ({ value }) => (dispatch, getState) => {
  const profileState = getState().profile;
  let mySamples = [...profileState.mySamples];
  let selectedMySampleSort = { ...profileState.selectedMySampleSort };

  if (!mySamples) return;

  switch (value) {
  case '-rarity': {
    mySamples = mySamples.sort((a, b) => b.rarity - a.rarity);
    selectedMySampleSort = SAMPLE_SORTING_OPTIONS[0]; // eslint-disable-line
    break;
  }
  case 'rarity': {
    mySamples = mySamples.sort((a, b) => a.rarity - b.rarity);
    selectedMySampleSort = SAMPLE_SORTING_OPTIONS[1]; // eslint-disable-line
    break;
  }
  case '-length': {
    mySamples = mySamples.sort((a, b) => b.length - a.length);
    selectedMySampleSort = SAMPLE_SORTING_OPTIONS[2]; // eslint-disable-line
    break;
  }
  case 'length': {
    mySamples = mySamples.sort((a, b) => a.length - b.length);
    selectedMySampleSort = SAMPLE_SORTING_OPTIONS[3]; // eslint-disable-line
    break;
  }
  default:
    break;
  }

  dispatch({ type: SET_MY_SAMPLES_SORTING, payload: { mySamples, selectedMySampleSort } });
};

/**
 * Return color based on sample rarity
 *
 * @param {Number} rarity
 *
 * @return {String}
 */
export const getColorForRarity = (rarity) => {
  switch (rarity) {
  case 0:
    return '#005792';
  case 1:
    return '#734488'; // 492645
  case 2:
    return '#FFDF00';
  case 3:
    return '#99ff00';
  default:
    return '#000';
  }
};

/**
 * Gets all samples from the contract for the current address
 *
 * @param {String} address
 * @return {Function}
 */
export const getSamplesForUser = (address) => async (dispatch, getState) => {
  const mySamples = await getSamples(address);
  dispatch({ type: SET_PROFILE_SAMPLES, payload: mySamples });
  dispatch(onMySamplesSort(getState().profile.selectedMySampleSort));
};

/**
 * Handles the redux state for buying the specified number of samples
 *
 * @return {Function}
 */
export const buySamplesAction = () => async (dispatch, getState) => {
  dispatch({ type: BUY_SAMPLES_REQUEST });

  try {
    const state = getState();

    const { address } = state.app;
    const numJinglesToBuy = state.profile.numSamplesToBuy;

    const txParams = { from: address, value: parseInt(numJinglesToBuy, 10) * SAMPLE_PRICE };
    await window.contract.buySamples(parseInt(numJinglesToBuy, 10), address, txParams);

    dispatch({ type: BUY_SAMPLES_SUCCESS });

    dispatch(getSamplesForUser(address));
  } catch (err) {
    dispatch({ type: BUY_SAMPLES_FAILURE, payload: err.message });
  }
};

/**
 * Handles the reducer state for clearing the buy samples action
 *
 * @return {(function(*, *))|*}
 */
export const clearBuySamplesAction = () => (dispatch, getState) => {
  if (!getState().profile.buyingSamples) dispatch({ type: CLEAR_BUY_SAMPLES });
};

/**
 * Updates number of samples to buy in state based on new input value
 *
 * @param {Object} event
 *
 * @return {Function}
 */
export const setNumSamplesToBuyAction = ({ value }) => async (dispatch) => {
  if (value < 1 || value > 15) return;

  dispatch({ type: SET_PROFILE_NUM_SAMPLES_TO_BUY, payload: value });
};

// JINGLES TODO - create separate reducer & actions for this
/**
 * Gets all jingles from the server for the current address
 *
 * @return {Function}
 */
export const getJinglesForUser = () => async (dispatch, getState) => {
  const {
    currentJinglesPage, jingleCategory, jingleSorting, profileAddress,
  } = getState().profile;
  let jingles = [];

  const category = jingleCategory.value;
  const activeSort = jingleSorting.value;
  const query = `${API_URL}/jingles/${category}/${profileAddress}/page/${currentJinglesPage}/filter/${activeSort}`;
  const response = await axios(query);

  const jingleIds = response.data.map((_jingle) => _jingle.jingleId).toString();

  const { address } = getState().app;

  if (jingleIds.length > 0) {
    const likedJinglesResponse = await axios(`${API_URL}/jingles/check-liked/${address}/${jingleIds}`);
    jingles = response.data.map((_jingle, index) => ({
      ..._jingle, liked: likedJinglesResponse.data[index],
    }));
  } else {
    jingles = response.data;
  }

  // false for all jingles, true to get jingles on sale
  const query2 = `${API_URL}/jingles/count/owner/${profileAddress}/sale/${(category === 'sale').toString()}`;
  const num = await axios(query2);

  dispatch({ type: SET_PROFILE_JINGLES, payload: { jingles, num: num.data } });
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

/**
 * Changes the current selected page and then get all jingles for that page
 *
 * @param {Number} pageNum
 *
 * @return {Function}
 */
export const onMyJinglesPaginationChange = (pageNum) => (dispatch) => {
  dispatch({ type: SET_MY_JINGLES_PAGE, payload: pageNum + 1 });
  dispatch(getJinglesForUser());
};

/**
 * Updates jingle like count based on jingleId.
 *
 * @param {Number} jingleId
 * @param {Boolean} action - true = like, false = dislike
 *
 * @return {Function}
 */
export const likeUnLikeProfileJingle = (jingleId, action) => async (dispatch, getState) => {
  const state = getState();
  const { address } = state.app;

  try {
    const likeData = await likeUnlikeJingle(jingleId, action, address);

    if (!likeData) return;

    const jingles = [...state.profile.myJingles];
    const jingleIndex = jingles.findIndex((_jingle) => _jingle.jingleId === jingleId);

    jingles[jingleIndex] = { ...jingles[jingleIndex], ...likeData };
    dispatch({ type: PROFILE_LIKE_UNLIKE_JINGLE, payload: jingles });
  } catch (err) {
    // TODO Handle this in the future
  }
};
