import {
  PROFILE_TABS, SET_ACTIVE_PROFILE_TAB, SET_PROFILE_SAMPLES, SET_PROFILE_NUM_SAMPLES_TO_BUY, SET_PROFILE_IS_OWNER,
  SET_PROFILE_JINGLES, SORTING_OPTIONS, CATEGORY_OPTIONS, SET_PROFILE_JINGLES_CATEGORY, SET_PROFILE_JINGLES_SORT
} from '../constants/actionTypes';

const INITIAL_STATE = {
  profileAddress: '',
  isOwner: false,
  tabs: PROFILE_TABS,
  mySamples: [],
  myJingles: [],
  currentJinglesPage: 1,
  jingleSorting: SORTING_OPTIONS[0],
  jingleSortingOptions: SORTING_OPTIONS,
  jingleCategory: CATEGORY_OPTIONS[0],
  jingleCategories: CATEGORY_OPTIONS,
  numSamplesToBuy: 1,
  loading: true
};

export default (state = INITIAL_STATE, action) => {
  const  payload = action.payload;
  switch (action.type) {
    case SET_ACTIVE_PROFILE_TAB:
      return { ...state, tabs: payload, loading: true };

    case SET_PROFILE_SAMPLES:
      return { ...state, mySamples: payload, loading: false };

    case SET_PROFILE_NUM_SAMPLES_TO_BUY:
      return { ...state, numSamplesToBuy: payload };

    case SET_PROFILE_IS_OWNER:
      return { ...state, isOwner: payload.isOwner, profileAddress: payload.address };

    case SET_PROFILE_JINGLES:
      return { ...state, loading: false, myJingles: payload };

    case SET_PROFILE_JINGLES_CATEGORY:
      return { ...state, jingleCategory: payload };

    case SET_PROFILE_JINGLES_SORT:
      return { ...state, jingleSorting: payload };

    default:
      return state;
  }
};
