import {
  GET_ALL_USER_JINGLES_REQUEST,
  GET_ALL_USER_JINGLES_SUCCESS,
  GET_ALL_USER_JINGLES_FAILURE,

  GET_ALL_USER_V0_JINGLES_REQUEST,
  GET_ALL_USER_V0_JINGLES_SUCCESS,
  GET_ALL_USER_V0_JINGLES_FAILURE,

  GET_ALL_USER_V1_JINGLES_REQUEST,
  GET_ALL_USER_V1_JINGLES_SUCCESS,
  GET_ALL_USER_V1_JINGLES_FAILURE,

  WRAP_JINGLE_REQUEST,
  WRAP_JINGLE_SUCCESS,
  WRAP_JINGLE_FAILURE,
} from '../redux/actionTypes/jingleActionTypes';

const INITIAL_STATE = {
  gettingAllUserJingles: false,
  gettingAllUserJinglesError: '',

  gettingV0UserJingles: false,
  gettingV0UserJinglesError: '',
  v0UserJingles: null,

  gettingV1UserJingles: false,
  gettingV1UserJinglesError: '',
  v1UserJingles: null,

  wrappingJingles: {},
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
  case GET_ALL_USER_JINGLES_REQUEST:
    return {
      ...state,
      gettingAllUserJingles: true,
      gettingAllUserJinglesError: '',
    };

  case GET_ALL_USER_JINGLES_SUCCESS:
    return {
      ...state,
      gettingAllUserJingles: false,
      gettingAllUserJinglesError: '',
    };

  case GET_ALL_USER_JINGLES_FAILURE:
    return {
      ...state,
      gettingAllUserJingles: false,
      gettingAllUserJinglesError: payload,
    };

  case GET_ALL_USER_V0_JINGLES_REQUEST:
    return {
      ...state,
      gettingV0UserJingles: true,
      gettingV0UserJinglesError: '',
    };

  case GET_ALL_USER_V0_JINGLES_SUCCESS:
    return {
      ...state,
      gettingV0UserJingles: false,
      gettingV0UserJinglesError: '',
      v0UserJingles: payload,
    };

  case GET_ALL_USER_V0_JINGLES_FAILURE:
    return {
      ...state,
      gettingV0UserJingles: false,
      gettingV0UserJinglesError: payload,
    };

  case GET_ALL_USER_V1_JINGLES_REQUEST:
    return {
      ...state,
      gettingV1UserJingles: true,
      gettingV1UserJinglesError: '',
    };

  case GET_ALL_USER_V1_JINGLES_SUCCESS:
    return {
      ...state,
      gettingV1UserJingles: false,
      gettingV1UserJinglesError: '',
      v1UserJingles: payload,
    };

  case GET_ALL_USER_V1_JINGLES_FAILURE:
    return {
      ...state,
      gettingV1UserJingles: false,
      gettingV1UserJinglesError: payload,
    };

  case WRAP_JINGLE_REQUEST:
    return {
      ...state,
      wrappingJingles: {
        ...state.wrappingJingles,
        [action.wrapKey]: {
          wrapping: true,
          error: '',
        },
      },
    };

  case WRAP_JINGLE_SUCCESS: {
    const initial = {
      ...state,
      wrappingJingles: {
        ...state.wrappingJingles,
        [action.wrapKey]: {
          wrapping: false,
          error: '',
        },
      },
    };

    if (action.version === 0) initial.v0UserJingles = payload;
    else initial.v1UserJingles = payload;

    return initial;
  }

  case WRAP_JINGLE_FAILURE:
    return {
      ...state,
      wrappingJingles: {
        ...state.wrappingJingles,
        [action.wrapKey]: {
          wrapping: false,
          error: payload,
        },
      },
    };

  default:
    return state;
  }
};
