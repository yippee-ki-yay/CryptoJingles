import {
  CATEGORY_OPTIONS,
  CHANGE_MARKETPLACE_PAGE,
  SET_MARKETPLACE_CATEGORY,
  SET_MARKETPLACE_SORT,
  MARKETPLACE_JINGLES_PER_PAGE,
  SET_MARKETPLACE_PAGE,
  MARKETPLACE_LIKE_UNLIKE_JINGLE,
  MARKETPLACE_SORTING_OPTIONS,

  GET_MARKETPLACE_JINGLES_REQUEST,
  GET_MARKETPLACE_JINGLES_SUCCESS,
  GET_MARKETPLACE_JINGLES_FAILURE,

  GET_MARKETPLACE_FULL_JINGLES_DATA_PER_PAGE_REQUEST,
  GET_MARKETPLACE_FULL_JINGLES_DATA_PER_PAGE_SUCCESS,
  GET_MARKETPLACE_FULL_JINGLES_DATA_PER_PAGE_FAILURE,
} from '../constants/actionTypes';

const INITIAL_STATE = {
  jinglesPerPage: MARKETPLACE_JINGLES_PER_PAGE,
  totalJingles: 0,
  currentPage: 1,
  sorting: MARKETPLACE_SORTING_OPTIONS[0],
  sortingOptions: MARKETPLACE_SORTING_OPTIONS,
  category: CATEGORY_OPTIONS[0],
  categories: CATEGORY_OPTIONS,

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
  case CHANGE_MARKETPLACE_PAGE:
    return { ...state, currentPage: payload };

  case SET_MARKETPLACE_CATEGORY:
    return { ...state, category: payload };

  case SET_MARKETPLACE_SORT:
    return { ...state, sorting: payload.newVal, jinglesBasic: payload.newJinglesBasic };

  case SET_MARKETPLACE_PAGE:
    return { ...state, currentPage: payload };

  case MARKETPLACE_LIKE_UNLIKE_JINGLE:
    return { ...state, jingles: payload };

  case GET_MARKETPLACE_JINGLES_REQUEST:
    return {
      ...state,
      gettingJinglesBasic: true,
      gettingJinglesBasicError: '',
    };

  case GET_MARKETPLACE_JINGLES_SUCCESS:
    return {
      ...state,
      gettingJinglesBasic: false,
      gettingJinglesBasicError: '',
      jinglesBasic: payload,
      totalJingles: payload.length,
    };

  case GET_MARKETPLACE_JINGLES_FAILURE:
    return {
      ...state,
      gettingJinglesBasic: false,
      gettingJinglesBasicError: payload,
    };

  case GET_MARKETPLACE_FULL_JINGLES_DATA_PER_PAGE_REQUEST:
    return {
      ...state,
      gettingJingles: true,
      gettingJinglesError: '',
    };

  case GET_MARKETPLACE_FULL_JINGLES_DATA_PER_PAGE_SUCCESS:
    return {
      ...state,
      gettingJingles: false,
      gettingJinglesError: '',
      jingles: payload,
    };

  case GET_MARKETPLACE_FULL_JINGLES_DATA_PER_PAGE_FAILURE:
    return {
      ...state,
      gettingJingles: false,
      gettingJinglesError: payload,
    };

  default:
    return state;
  }
};
