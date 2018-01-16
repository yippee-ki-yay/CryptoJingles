import { MARKETPLACE_PLAY_SONG } from '../constants/actionTypes';

const INITIAL_STATE = {
  currentSong: null
};

export default (state = INITIAL_STATE, action) => {
  const  payload = action.payload;
  switch (action.type) {
    case MARKETPLACE_PLAY_SONG:
      return { ...state, currentSong: [payload] };

    default:
      return state;
  }
};
