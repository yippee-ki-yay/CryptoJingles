import {
  GET_ALL_JINGLES_REQUEST,
  GET_ALL_JINGLES_SUCCESS,
  GET_ALL_JINGLES_FAILURE,

  WRAP_JINGLE_REQUEST,
  WRAP_JINGLE_SUCCESS,
  WRAP_JINGLE_FAILURE,
} from '../redux/actionTypes/jingleActionTypes';

const INITIAL_STATE = {
  gettingAllJingles: false,
  gettingAllJinglesError: '',
  allJingles: null,

  wrappingJingles: {},
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
  case GET_ALL_JINGLES_REQUEST:
    return {
      ...state,
      gettingAllJingles: true,
      gettingAllJinglesError: '',
    };

  case GET_ALL_JINGLES_SUCCESS:
    return {
      ...state,
      gettingAllJingles: false,
      gettingAllJinglesError: '',
      allJingles: payload,
    };

  case GET_ALL_JINGLES_FAILURE:
    return {
      ...state,
      gettingAllJingles: false,
      gettingAllJinglesError: payload,
    };

  case WRAP_JINGLE_REQUEST:
    return {
      ...state,
      wrappingJingles: {
        ...state.wrappingJingles,
        [action.id]: {
          wrapping: true,
          error: '',
        },
      },
    };

  case WRAP_JINGLE_SUCCESS:
    return {
      ...state,
      wrappingJingles: {
        ...state.wrappingJingles,
        [action.id]: {
          wrapping: false,
          error: '',
        },
      },
    };

  case WRAP_JINGLE_FAILURE:
    return {
      ...state,
      wrappingJingles: {
        ...state.wrappingJingles,
        [action.id]: {
          wrapping: false,
          error: payload,
        },
      },
    };

  default:
    return state;
  }
};
