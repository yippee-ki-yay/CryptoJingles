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
  CLEAR_WRAP_JINGLE,

  GET_ALL_OG_WRAPPED_USER_JINGLES_REQUEST,
  GET_ALL_OG_WRAPPED_USER_JINGLES_SUCCESS,
  GET_ALL_OG_WRAPPED_USER_JINGLES_FAILURE,

  GET_ALL_NEW_WRAPPED_USER_JINGLES_REQUEST,
  GET_ALL_NEW_WRAPPED_USER_JINGLES_SUCCESS,
  GET_ALL_NEW_WRAPPED_USER_JINGLES_FAILURE,

  UNWRAP_JINGLE_REQUEST,
  UNWRAP_JINGLE_SUCCESS,
  UNWRAP_JINGLE_FAILURE,
  CLEAR_UNWRAP_JINGLE,
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

  gettingOgWrappedUserJingles: false,
  gettingOgWrappedUserJinglesError: '',
  ogWrappedUserJingles: null,

  gettingNewWrappedUserJingles: false,
  gettingNewWrappedUserJinglesError: '',
  newWrappedUserJingles: null,

  wrappingJingles: {},
  unwrappingJingles: {},
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

  case GET_ALL_OG_WRAPPED_USER_JINGLES_REQUEST:
    return {
      ...state,
      gettingOgWrappedUserJingles: true,
      gettingOgWrappedUserJinglesError: '',
    };

  case GET_ALL_OG_WRAPPED_USER_JINGLES_SUCCESS:
    return {
      ...state,
      gettingOgWrappedUserJingles: false,
      gettingOgWrappedUserJinglesError: '',
      ogWrappedUserJingles: payload,
    };

  case GET_ALL_OG_WRAPPED_USER_JINGLES_FAILURE:
    return {
      ...state,
      gettingOgWrappedUserJingles: false,
      gettingOgWrappedUserJinglesError: payload,
    };

  case GET_ALL_NEW_WRAPPED_USER_JINGLES_REQUEST:
    return {
      ...state,
      gettingNewWrappedUserJingles: true,
      gettingNewWrappedUserJinglesError: '',
    };

  case GET_ALL_NEW_WRAPPED_USER_JINGLES_SUCCESS:
    return {
      ...state,
      gettingNewWrappedUserJingles: false,
      gettingNewWrappedUserJinglesError: '',
      newWrappedUserJingles: payload,
    };

  case GET_ALL_NEW_WRAPPED_USER_JINGLES_FAILURE:
    return {
      ...state,
      gettingNewWrappedUserJingles: false,
      gettingNewWrappedUserJinglesError: payload,
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

    if (action.version === 0) initial.v0UserJingles = payload.newJingles;
    else initial.v1UserJingles = payload.newJingles;

    if (action.isOg) initial.ogWrappedUserJingles = payload.newWrappedJingles;
    else initial.newWrappedUserJingles = payload.newWrappedJingles;

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

  case CLEAR_WRAP_JINGLE:
    return {
      ...state,
      wrappingJingles: {
        ...state.wrappingJingles,
        [action.wrapKey]: {
          wrapping: false,
          error: '',
        },
      },
    };

  case UNWRAP_JINGLE_REQUEST:
    return {
      ...state,
      unwrappingJingles: {
        ...state.unwrappingJingles,
        [action.unwrapKey]: {
          unwrapping: true,
          error: '',
        },
      },
    };

  case UNWRAP_JINGLE_SUCCESS: {
    const initial = {
      ...state,
      unwrappingJingles: {
        ...state.unwrappingJingles,
        [action.unwrapKey]: {
          unwrapping: false,
          error: '',
        },
      },
    };

    if (action.version === 0) initial.v0UserJingles = payload.newJingles;
    else initial.v1UserJingles = payload.newJingles;

    if (action.isOg) initial.ogWrappedUserJingles = payload.newWrappedJingles;
    else initial.newWrappedUserJingles = payload.newWrappedJingles;

    return initial;
  }

  case UNWRAP_JINGLE_FAILURE:
    return {
      ...state,
      unwrappingJingles: {
        ...state.unwrappingJingles,
        [action.unwrapKey]: {
          unwrapping: false,
          error: payload,
        },
      },
    };

  case CLEAR_UNWRAP_JINGLE:
    return {
      ...state,
      unwrappingJingles: {
        ...state.unwrappingJingles,
        [action.unwrapKey]: {
          unwrapping: false,
          error: '',
        },
      },
    };

  default:
    return state;
  }
};
