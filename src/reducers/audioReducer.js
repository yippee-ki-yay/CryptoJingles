import { SET_SINGLE_AUDIO } from '../constants/actionTypes';

const INITIAL_STATE = {
  currentAudio: null
};

export default (state = INITIAL_STATE, action) => {
  const  payload = action.payload;
  switch (action.type) {
    case SET_SINGLE_AUDIO:
      return { ...state, currentAudio: payload };

    default:
      return state;
  }
};
