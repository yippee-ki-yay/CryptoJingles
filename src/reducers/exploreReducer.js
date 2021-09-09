import {
  EXPLORE_FILTER_OPTIONS,
  EXPLORE_SORTING_OPTIONS,
} from 'constants/explore';
import {
  SET_EXPLORE_FILTER,
  SET_EXPLORE_SORT,
  SET_EXPLORE_PAGE,

  GET_EXPLORE_JINGLES_REQUEST,
  GET_EXPLORE_JINGLES_SUCCESS,
  GET_EXPLORE_JINGLES_FAILURE,

  GET_EXPLORE_FULL_JINGLES_DATA_PER_PAGE_REQUEST,
  GET_EXPLORE_FULL_JINGLES_DATA_PER_PAGE_SUCCESS,
  GET_EXPLORE_FULL_JINGLES_DATA_PER_PAGE_FAILURE,

  CLEAR_EXPLORE_JINGLES_ACTION,
} from '../redux/actionTypes/exploreActionTypes';

const INITIAL_STATE = {
  totalJingles: 0,
  currentPage: 1,

  sortingOptions: EXPLORE_SORTING_OPTIONS,
  sorting: EXPLORE_SORTING_OPTIONS[0],

  versionFilterOptions: EXPLORE_FILTER_OPTIONS,
  versionFilter: EXPLORE_FILTER_OPTIONS[0],

  gettingJinglesBasic: false,
  gettingJinglesBasicError: '',
  jinglesBasic: null,

  gettingJingles: false,
  gettingJinglesError: '',
  jingles: null,
};

export default (state = INITIAL_STATE, action) => {
  const { payload } = action;
  switch (action.type) {
  case SET_EXPLORE_SORT:
    return { ...state, sorting: payload.newVal, jinglesBasic: payload.newJinglesBasic };

  case SET_EXPLORE_FILTER:
    return {
      ...state,
      versionFilter: payload,
      jinglesBasic: null,
      jingles: null,
      currentPage: 1,
    };

  case SET_EXPLORE_PAGE:
    return { ...state, currentPage: payload };

  case GET_EXPLORE_JINGLES_REQUEST:
    return {
      ...state,
      gettingJinglesBasic: true,
      gettingJinglesBasicError: '',
    };

  case GET_EXPLORE_JINGLES_SUCCESS:
    return {
      ...state,
      gettingJinglesBasic: false,
      gettingJinglesBasicError: '',
      jinglesBasic: payload,
      totalJingles: payload.length,
    };

  case GET_EXPLORE_JINGLES_FAILURE:
    return {
      ...state,
      gettingJinglesBasic: false,
      gettingJinglesBasicError: payload,
    };

  case GET_EXPLORE_FULL_JINGLES_DATA_PER_PAGE_REQUEST:
    return {
      ...state,
      gettingJingles: true,
      gettingJinglesError: '',
    };

  case GET_EXPLORE_FULL_JINGLES_DATA_PER_PAGE_SUCCESS:
    return {
      ...state,
      gettingJingles: false,
      gettingJinglesError: '',
      jingles: payload,
    };

  case GET_EXPLORE_FULL_JINGLES_DATA_PER_PAGE_FAILURE:
    return {
      ...state,
      gettingJingles: false,
      gettingJinglesError: payload,
    };

  case CLEAR_EXPLORE_JINGLES_ACTION:
    return INITIAL_STATE;

  default:
    return state;
  }
};
