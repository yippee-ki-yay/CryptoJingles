import { UPDATE_VOLUME, UPDATE_DELAY, UPDATE_CUTS, SET_COMPOSE_SAMPLES } from '../constants/actionTypes';
import { getSamplesFromContract } from '../util/web3/ethereumService';

export const updateVolume = payload => (dispatch) => { dispatch({ type: UPDATE_VOLUME, payload }); };
export const updateDelay = payload => (dispatch) => { dispatch({ type: UPDATE_DELAY, payload }); };
export const updateCuts = payload => (dispatch) => { dispatch({ type: UPDATE_CUTS, payload }); };

/**
 * Gets samples for address from the contract and sets it in the reducer
 *
 * @param {String} address
 * @return {Function}
 */
export const getComposeSamples = address => async (dispatch) => {
  const payload = await getSamplesFromContract(address);
  console.log('getComposeSamples payload', payload);
  dispatch({ type: SET_COMPOSE_SAMPLES, payload });
};
