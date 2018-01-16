import { MARKETPLACE_PLAY_SONG } from '../constants/actionTypes';

export const marketplacePlaySong = (payload) => (dispatch) => {
  dispatch({ type: MARKETPLACE_PLAY_SONG, payload });
};