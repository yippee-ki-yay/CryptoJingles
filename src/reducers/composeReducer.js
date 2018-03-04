import {
  UPDATE_VOLUME, UPDATE_DELAY, UPDATE_CUTS, SET_COMPOSE_SAMPLES, SAMPLE_SORTING_OPTIONS, SET_COMPOSE_SELECTED_SORT,
  HANDLE_SAMPLE_DROP, HANDLE_SAMPLE_DROP_CANCEL, TOGGLE_LOADING_NEW_JINGLE, SET_NEW_JINGLE_GROUP,
  TOGGLE_NEW_JINGLE_PLAYING,
} from '../constants/actionTypes';
import { getSampleSlots } from '../constants/getMockData';

const INITIAL_STATE = {
  volumes: [50, 50, 50, 50, 50],
  delays: [0, 0, 0, 0, 0],
  cuts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  sampleSlots: getSampleSlots(),
  composeSamples: [],
  sortingOptions: SAMPLE_SORTING_OPTIONS,
  selectedSort: SAMPLE_SORTING_OPTIONS[0],
  droppedSampleIds: [],
  loadingNewJingle: false,
  playingNewJingle: false,
  newJingleSampleGroup: null,
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_VOLUME:
      return { ...state, volumes: payload };

    case UPDATE_DELAY:
      return { ...state, delays: payload };

    case UPDATE_CUTS:
      return { ...state, cuts: payload };

    case HANDLE_SAMPLE_DROP:
    case HANDLE_SAMPLE_DROP_CANCEL:
      return { ...state, ...payload };

    case SET_COMPOSE_SAMPLES:
      return { ...state, composeSamples: payload };

    case SET_COMPOSE_SELECTED_SORT:
      return { ...state, composeSamples: payload.composeSamples, selectedSort: payload.selectedSort };

    case TOGGLE_LOADING_NEW_JINGLE:
      return { ...state, loadingNewJingle: !state.loadingNewJingle };

    case SET_NEW_JINGLE_GROUP:
      return { ...state, newJingleSampleGroup: payload };

    case TOGGLE_NEW_JINGLE_PLAYING:
      return { ...state, playingNewJingle: payload };

    default:
      return state;
  }
};
