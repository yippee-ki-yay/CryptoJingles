import { UPDATE_VOLUME, UPDATE_DELAY, UPDATE_CUTS } from '../constants/actionTypes';

export const updateVolume = (payload) => (dispatch) => {
  dispatch({ type: UPDATE_VOLUME, payload });
};

export const updateDelay = (payload) => (dispatch) => {
  dispatch({ type: UPDATE_DELAY, payload });
};

export const updateCuts = (payload) => (dispatch) => {
  dispatch({ type: UPDATE_CUTS, payload });
};