import {
  PROFILE_TABS, SET_ACTIVE_PROFILE_TAB, SET_PROFILE_SAMPLES, SET_PROFILE_NUM_SAMPLES_TO_BUY, SET_PROFILE_IS_OWNER,
  SET_PROFILE_JINGLES, SORTING_OPTIONS, CATEGORY_OPTIONS, SET_PROFILE_JINGLES_CATEGORY, SET_PROFILE_JINGLES_SORT,
  TOGGLE_PROFILE_AUTHOR, SET_PROFILE_AUTHOR_EDIT, SET_PENDING_AUTHOR, AUTHOR_EDIT_SUCCESS, SET_MY_JINGLES_PAGE,
  SET_PROFILE_ADDRESS, MARKETPLACE_JINGLES_PER_PAGE, SET_MY_SAMPLES_SORTING, SAMPLE_SORTING_OPTIONS,
  PROFILE_LIKE_UNLIKE_JINGLE, SET_INVALID_PROFILE,

  BUY_SAMPLES_REQUEST,
  BUY_SAMPLES_SUCCESS,
  BUY_SAMPLES_FAILURE,
  CLEAR_BUY_SAMPLES,
} from '../constants/actionTypes';

const INITIAL_STATE = {
  isValidProfile: true,
  author: 'Satoshi Nakajingles',
  authorEdit: 'Satoshi Nakajingles',
  editAuthorActive: false,
  profileAddress: '',
  isOwner: false,
  tabs: PROFILE_TABS,
  mySamples: [],
  myJingles: [],
  currentJinglesPage: 1,
  totalJingles: 0,
  jingleSorting: SORTING_OPTIONS[0],
  jingleSortingOptions: SORTING_OPTIONS,
  jingleCategory: CATEGORY_OPTIONS[0],
  jingleCategories: CATEGORY_OPTIONS,
  numSamplesToBuy: 5,
  loading: true,
  jinglesPerPage: MARKETPLACE_JINGLES_PER_PAGE,
  mySamplesSortingOptions: SAMPLE_SORTING_OPTIONS,
  selectedMySampleSort: SAMPLE_SORTING_OPTIONS[0],

  buyingSamples: false,
  buyingSamplesError: '',
};

export default (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
  case SET_ACTIVE_PROFILE_TAB:
    return { ...state, tabs: payload, loading: true };

  case SET_INVALID_PROFILE:
    return { ...state, isValidProfile: false };

  case SET_PROFILE_SAMPLES:
    return { ...state, mySamples: payload, loading: false };

  case SET_PROFILE_NUM_SAMPLES_TO_BUY:
    return { ...state, numSamplesToBuy: payload };

  case SET_PROFILE_IS_OWNER:
    return { ...state, isOwner: payload.isOwner };

  case SET_PROFILE_JINGLES:
    return {
      ...state, loading: false, myJingles: payload.jingles, totalJingles: payload.num,
    };

  case SET_PROFILE_JINGLES_CATEGORY:
    return { ...state, jingleCategory: payload };

  case SET_PROFILE_JINGLES_SORT:
    return { ...state, jingleSorting: payload };

  case TOGGLE_PROFILE_AUTHOR: {
    if (payload === false) {
      return {
        ...state, editAuthorActive: payload, author: state.author, authorEdit: state.author,
      };
    }
    return { ...state, editAuthorActive: payload };
  }

  case SET_PROFILE_AUTHOR_EDIT:
    return { ...state, authorEdit: payload };

  case SET_PENDING_AUTHOR:
    return { ...state, editAuthorActive: payload, author: 'Updating author...' };

  case AUTHOR_EDIT_SUCCESS:
    return { ...state, author: payload, authorEdit: payload };

  case SET_MY_JINGLES_PAGE:
    return { ...state, currentJinglesPage: payload };

  case SET_PROFILE_ADDRESS:
    return {
      ...INITIAL_STATE,
      buyingSamples: state.buyingSamples,
      buyingSamplesError: state.buyingSamplesError,
      profileAddress: payload,
    };

  case SET_MY_SAMPLES_SORTING:
    return { ...state, ...payload };

  case PROFILE_LIKE_UNLIKE_JINGLE:
    return { ...state, myJingles: payload };

  case BUY_SAMPLES_REQUEST:
    return {
      ...state,
      buyingSamples: true,
      buyingSamplesError: '',
    };

  case BUY_SAMPLES_SUCCESS:
    return {
      ...state,
      buyingSamples: false,
      buyingSamplesError: '',
    };

  case BUY_SAMPLES_FAILURE:
    return {
      ...state,
      buyingSamples: false,
      buyingSamplesError: payload,
    };

  case CLEAR_BUY_SAMPLES:
    return {
      ...state,
      buyingSamples: false,
      buyingSamplesError: '',
    };

  default:
    return state;
  }
};
