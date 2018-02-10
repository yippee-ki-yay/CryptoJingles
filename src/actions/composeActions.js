import { UPDATE_VOLUME, GET_VOLUMES } from '../constants/actionTypes';

export const updateVolume = (payload) => (dispatch) => {
  dispatch({ type: UPDATE_VOLUME, payload });
};