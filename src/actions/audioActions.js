import { SET_SINGLE_AUDIO } from '../constants/actionTypes';

export const playAudio = payload => (dispatch) => {
  dispatch({ type: SET_SINGLE_AUDIO, payload });
};

