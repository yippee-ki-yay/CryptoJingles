import { TOGGLE_PLAY_AUDIO, TOGGLE_AUDIO_LOADING, ADD_NEW_AUDIO, AUDIO_LOADED } from '../constants/actionTypes';

const INITIAL_STATE = {
  audios: [],
};

export default (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
    case TOGGLE_AUDIO_LOADING:
    case TOGGLE_PLAY_AUDIO:
    case AUDIO_LOADED:
      return { ...state, audios: payload };

    case ADD_NEW_AUDIO:
      return {
        ...state,
        audios: [
          ...state.audios,
          {
            id: payload.id,
            source: payload.source,
            loading: false,
            playing: false,
          }],
      };

    default:
      return state;
  }
};
