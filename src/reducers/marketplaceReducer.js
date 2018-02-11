import {
  CATEGORY_OPTIONS, SORTING_OPTIONS, CHANGE_MARKETPLACE_PAGE, SET_MARKETPLACE_JINGLES, SET_MARKETPLACE_CATEGORY,
  SET_MARKETPLACE_SORT, MARKETPLACE_JINGLES_PER_PAGE, SET_MARKETPLACE_PAGE, MARKETPLACE_LIKE_UNLIKE_JINGLE
} from '../constants/actionTypes';

const INITIAL_STATE = {
  jingles: [],
  jinglesPerPage: MARKETPLACE_JINGLES_PER_PAGE,
  totalJingles: 0,
  currentPage: 1,
  sorting: SORTING_OPTIONS[0],
  sortingOptions: SORTING_OPTIONS,
  category: CATEGORY_OPTIONS[0],
  categories: CATEGORY_OPTIONS
};

export default (state = INITIAL_STATE, action) => {
  const  payload = action.payload;
  switch (action.type) {
    case CHANGE_MARKETPLACE_PAGE:
      return { ...state, currentPage: payload };

    case SET_MARKETPLACE_JINGLES:
      return { ...state, jingles: payload.jingles, totalJingles: payload.num };

    case SET_MARKETPLACE_CATEGORY:
      return { ...state, category: payload };

    case SET_MARKETPLACE_SORT:
      return { ...state, sorting: payload };

    case SET_MARKETPLACE_PAGE:
      return { ...state, currentPage: payload };

    case MARKETPLACE_LIKE_UNLIKE_JINGLE:
      return { ...state, jingles: payload };

    default:
      return state;
  }
};
