import { UPDATE_VOLUME, UPDATE_DELAY } from '../constants/actionTypes';

export const updateVolume = (payload) => (dispatch) => {
  dispatch({ type: UPDATE_VOLUME, payload });
};

export const updateDelay = (payload) => (dispatch) => {
  console.log('Delay', payload);
  dispatch({ type: UPDATE_DELAY, payload });
};