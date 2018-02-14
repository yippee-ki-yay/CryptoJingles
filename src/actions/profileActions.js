import axios from 'axios';
import {
  SET_ACTIVE_PROFILE_TAB, SET_PROFILE_SAMPLES, SET_PROFILE_NUM_SAMPLES_TO_BUY, SET_PROFILE_IS_OWNER,
  SET_PROFILE_JINGLES, SET_PROFILE_JINGLES_CATEGORY, SET_PROFILE_JINGLES_SORT, TOGGLE_PROFILE_AUTHOR,
  SET_PROFILE_AUTHOR_EDIT, SET_PENDING_AUTHOR, AUTHOR_EDIT_SUCCESS, SET_MY_JINGLES_PAGE, SET_PROFILE_ADDRESS,
  SAMPLE_SORTING_OPTIONS, SET_MY_SAMPLES_SORTING, PROFILE_LIKE_UNLIKE_JINGLE,
} from '../constants/actionTypes';
import { getSamples } from '../util/web3/ethereumService';
import { addPendingTx, removePendingTx, guid } from '../actions/appActions';
import { SAMPLE_PRICE } from '../util/config';
import { API_URL } from '../util/config';

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
export const checkIfOwnerProfile = async () => async (dispatch, getState) => {
  const addresses = await window.web3.eth.getAccounts();


  dispatch({
    type: SET_PROFILE_IS_OWNER,
    payload: {
      isOwner: addresses[0] === getState().profile.profileAddress,
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
    let author = await window.contract.authors(getState().profile.profileAddress);
    author = author || getState().profile.author;

    dispatch({ type: AUTHOR_EDIT_SUCCESS, payload: author });
  } catch(err) {
    // console.log('Get author error', err);
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
    const addresses = await window.web3.eth.getAccounts();
    const address = addresses[0];

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
 * Sorts profile samples by selected sort option TODO - unify this with compose tab sorting
 *
 * @param {Object} option { label, value }
 * @return {Function}
 */
export const onMySamplesSort = ({ value }) => (dispatch, getState) => {
  const profileState = getState().profile;
  let mySamples = [...profileState.mySamples];
  let selectedMySampleSort = Object.assign({}, profileState.selectedMySampleSort);

  if (!mySamples) return;

  switch (value) {
    case '-rarity': {
      mySamples = mySamples.sort((a, b) => b.rarity - a.rarity);
      selectedMySampleSort = SAMPLE_SORTING_OPTIONS[0];
      break;
    }
    case 'rarity': {
      mySamples = mySamples.sort((a, b) => a.rarity - b.rarity);
      selectedMySampleSort = SAMPLE_SORTING_OPTIONS[1];
      break;
    }
    case '-length': {
      mySamples = mySamples.sort((a, b) => b.length - a.length);
      selectedMySampleSort = SAMPLE_SORTING_OPTIONS[2];
      break;
    }
    case 'length': {
      mySamples = mySamples.sort((a, b) => a.length - b.length);
      selectedMySampleSort = SAMPLE_SORTING_OPTIONS[3];
      break;
    }
    default:
      break;
  }

  dispatch({ type: SET_MY_SAMPLES_SORTING, payload: { mySamples, selectedMySampleSort } })
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
 * @return {Function}
 */
export const getSamplesForUser = () => async (dispatch, getState) => {
  const mySamples = await getSamples(getState().profile.profileAddress);
  dispatch({ type: SET_PROFILE_SAMPLES, payload: mySamples });
  dispatch(onMySamplesSort(getState().profile.selectedMySampleSort));
};

/**
 * Sends transaction to contract to buy specified number of samples
 *
 * @return {Function}
 */
export const buySamples = () => async (dispatch, getState) => {
  const id = guid();

  try {
    const addresses = await window.web3.eth.getAccounts();
    const account = addresses[0];

    const numJinglesToBuy = getState().profile.numSamplesToBuy;

    dispatch(addPendingTx(id, 'Buy sample'));
    await window.contract.buySamples(parseInt(numJinglesToBuy, 10), account, {from: account, value: numJinglesToBuy * SAMPLE_PRICE});
    dispatch(removePendingTx(id));

    dispatch(getSamplesForUser(account));
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
  let jingles = [];

  const response = await axios(`${API_URL}/jingles/${jingleCategory.value}/${profileAddress}/page/${currentJinglesPage}/filter/${jingleSorting.value}`);
  const jingleIds = response.data.map(_jingle => _jingle.jingleId).toString();

  const addresses = await window.web3.eth.getAccounts();

  if (jingleIds.length > 0) {
    const likedJinglesResponse = await axios(`${API_URL}/jingles/check-liked/${addresses[0]}/${jingleIds}`);
    jingles = response.data.map((_jingle, index) => ({
      ..._jingle, liked: likedJinglesResponse.data[index]
    }));
  } else {
    jingles = response.data;
  }

  // false for all jingles, true to get jingles on sale
  const num = await axios(`${API_URL}/jingles/count/owner/${profileAddress}/sale/${(jingleCategory.value === 'sale').toString()}`);

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
// TODO - extract this to util function that takes dispatchType & collection
export const likeUnLikeProfileJingle = async (jingleId, action) => async (dispatch, getState) => {
  const actionString = action ? 'like' : 'unlike';

  const addresses = await window.web3.eth.getAccounts();
  const address = addresses[0];

  try {
    const response = await axios.post(`${API_URL}/jingle/${actionString}`, { address, jingleId });
    const jingles = [...getState().profile.myJingles];
    const jingleIndex = jingles.findIndex(_jingle => _jingle.jingleId === jingleId);

    jingles[jingleIndex].likeCount = response.data.likeCount;
    jingles[jingleIndex].liked = action;

    dispatch({ type: PROFILE_LIKE_UNLIKE_JINGLE, payload: jingles });
  } catch (err) {
    // TODO Handle this in the future
  }
};