import { MARKETPLACE_PLAY_SONG, MARKETPLACE_SET_SINGLE_SONG } from '../constants/actionTypes';

const INITIAL_STATE = {
  currentSong: null,
  currentSingleSong: null
};

export default (state = INITIAL_STATE, action) => {
  const  payload = action.payload;
  switch (action.type) {
    case MARKETPLACE_PLAY_SONG:
      return { ...state, currentSong: [payload] };

    case MARKETPLACE_SET_SINGLE_SONG:
      return { ...state, currentSingleSong: payload };

    default:
      return state;
  }
};
