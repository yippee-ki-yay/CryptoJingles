import {
  UPDATE_VOLUME, UPDATE_DELAY, UPDATE_CUTS, SET_COMPOSE_SAMPLES, SAMPLE_SORTING_OPTIONS, SET_COMPOSE_SELECTED_SORT,
} from '../constants/actionTypes';
import { getSamplesFromContract } from '../util/web3/ethereumService';

/**
 * Fires when user finishes changing the compose volume slider
 *
 * @param {Object} payload { index, volume }
 * @return {Function}
 */
export const updateVolume = payload => (dispatch, getState) => {
  const { compose } = getState();
  const volumes = [...compose.volumes];

  volumes[payload.index] = payload.volume;
  dispatch({ type: UPDATE_VOLUME, payload: volumes });
};

/**
 * Fires when user finishes changing the delay volume slider
 *
 * @param {Object} payload { index, delay }
 * @return {Function}
 */
export const updateDelay = payload => (dispatch, getState) => {
  const { compose } = getState();
  const delays = [...compose.delays];

  delays[payload.index] = payload.delay;
  dispatch({ type: UPDATE_DELAY, payload: delays });
};

/**
 * Fires when user finishes changing the cut sample slider
 *
 * @param {Object} payload { index, cuts: { min, max } }
 * @return {Function}
 */
export const updateCuts = payload => (dispatch, getState) => {
  const { compose } = getState();
  const cuts = [...compose.cuts];

  cuts[payload.index] = payload.cuts.min;
  cuts[payload.index + 5] = payload.cuts.max;

  dispatch({ type: UPDATE_CUTS, payload: cuts });
};

/**
 * Gets samples for address from the contract and sets it in the reducer
 *
 * @param {String} address
 * @return {Function}
 */
export const getComposeSamples = address => async (dispatch) => {
  const payload = await getSamplesFromContract(address);
  dispatch({ type: SET_COMPOSE_SAMPLES, payload });
};

/**
 * Sorts compose samples when the user clicks the
 * Sort by dropdown
 *
 * @param {Object} option
 * @return {Function}
 */
export const onComposeSamplesSort = option => (dispatch, getState) => {
  let { composeSamples, selectedSort } = getState().compose;
  composeSamples = [...composeSamples];

  if (!composeSamples.length) return;

  switch (option.value) {
    case '-rarity': {
      composeSamples = composeSamples.sort((a, b) => b.rarity - a.rarity);
      selectedSort = SAMPLE_SORTING_OPTIONS[0];
      break;
    }
    case 'rarity': {
      composeSamples = composeSamples.sort((a, b) => a.rarity - b.rarity);
      selectedSort = SAMPLE_SORTING_OPTIONS[1];
      break;
    }
    case '-length': {
      composeSamples = composeSamples.sort((a, b) => b.length - a.length);
      selectedSort = SAMPLE_SORTING_OPTIONS[2];
      break;
    }
    case 'length': {
      composeSamples = composeSamples.sort((a, b) => a.length - b.length);
      selectedSort = SAMPLE_SORTING_OPTIONS[3];
      break;
    }
    default:
      break;
  }

  dispatch({ type: SET_COMPOSE_SELECTED_SORT, payload: { selectedSort, composeSamples } });
};
