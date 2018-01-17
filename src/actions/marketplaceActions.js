import { MARKETPLACE_PLAY_SONG, MARKETPLACE_SET_SINGLE_SONG } from '../constants/actionTypes';

export const marketplacePlaySong = (payload) => (dispatch) => {
  dispatch({ type: MARKETPLACE_PLAY_SONG, payload });
};

export const marketplaceSetSingleSong = (payload) => (dispatch) => {
  dispatch({ type: MARKETPLACE_SET_SINGLE_SONG, payload });
};
