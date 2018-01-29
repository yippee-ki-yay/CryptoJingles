import {
  SET_ACTIVE_PROFILE_TAB, SET_PROFILE_SAMPLES, SET_PROFILE_NUM_SAMPLES_TO_BUY
} from '../constants/actionTypes';
import { getSamples } from '../util/web3/ethereumService';
import { addPendingTx, removePendingTx } from '../actions/appActions';
import { SAMPLE_PRICE } from '../util/config';

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

// SAMPLES

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

export const handleNumSamplesToBuyChange = ({ value }) => async (dispatch) => {
  if (value < 1) return;
  dispatch({ type: SET_PROFILE_NUM_SAMPLES_TO_BUY, payload: value });
};