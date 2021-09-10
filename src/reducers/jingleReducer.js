import {
  GET_ALL_USER_JINGLES_REQUEST,
  GET_ALL_USER_JINGLES_SUCCESS,
  GET_ALL_USER_JINGLES_FAILURE,
  CLEAR_ALL_USER_JINGLES,

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

  GET_ALL_V0_MARKETPLACE_USER_JINGLES_REQUEST,
  GET_ALL_V0_MARKETPLACE_USER_JINGLES_SUCCESS,
  GET_ALL_V0_MARKETPLACE_USER_JINGLES_FAILURE,

  GET_ALL_V1_MARKETPLACE_USER_JINGLES_REQUEST,
  GET_ALL_V1_MARKETPLACE_USER_JINGLES_SUCCESS,
  GET_ALL_V1_MARKETPLACE_USER_JINGLES_FAILURE,

  UNWRAP_JINGLE_REQUEST,
  UNWRAP_JINGLE_SUCCESS,
  UNWRAP_JINGLE_FAILURE,
  CLEAR_UNWRAP_JINGLE,

  GET_USER_SAMPLES_REQUEST,
  GET_USER_SAMPLES_SUCCESS,
  GET_USER_SAMPLES_FAILURE,

  CREATE_JINGLE_REQUEST,
  CREATE_JINGLE_SUCCESS,
  CREATE_JINGLE_FAILURE,
  CLEAR_CREATE_JINGLE,
} from '../redux/actionTypes/jingleActionTypes';

const INITIAL_STATE = {
  gettingAllUserJingles: false,
  gettingAllUserJinglesError: '',
  allUserJingles: null,

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

  gettingV0MarketplaceUserJingles: false,
  gettingV0MarketplaceUserJinglesError: '',
  v0MarketplaceJingles: null,

  gettingV1MarketplaceUserJingles: false,
  gettingV1MarketplaceUserJinglesError: '',
  v1MarketplaceJingles: null,

  wrappingJingles: {},
  unwrappingJingles: {},

  gettingUserSamples: false,
  gettingUserSamplesError: '',
  userSamples: null,

  creatingJingle: false,
  creatingJingleError: '',
  creatingJingleSuccess: false,
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
      allUserJingles: payload,
    };

  case GET_ALL_USER_JINGLES_FAILURE:
    return {
      ...state,
      gettingAllUserJingles: false,
      gettingAllUserJinglesError: payload,
    };

  case CLEAR_ALL_USER_JINGLES:
    return {
      ...state,
      allUserJingles: null,
      v0UserJingles: null,
      v1UserJingles: null,
      ogWrappedUserJingles: null,
      newWrappedUserJingles: null,
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

  case GET_ALL_V0_MARKETPLACE_USER_JINGLES_REQUEST:
    return {
      ...state,
      gettingV0MarketplaceUserJingles: true,
      gettingV0MarketplaceUserJinglesError: '',
    };

  case GET_ALL_V0_MARKETPLACE_USER_JINGLES_SUCCESS:
    return {
      ...state,
      gettingV0MarketplaceUserJingles: false,
      gettingV0MarketplaceUserJinglesError: '',
      v0MarketplaceJingles: payload,
    };

  case GET_ALL_V0_MARKETPLACE_USER_JINGLES_FAILURE:
    return {
      ...state,
      gettingV0MarketplaceUserJingles: false,
      gettingV0MarketplaceUserJinglesError: payload,
    };

  case GET_ALL_V1_MARKETPLACE_USER_JINGLES_REQUEST:
    return {
      ...state,
      gettingV1MarketplaceUserJingles: true,
      gettingV1MarketplaceUserJinglesError: '',
    };

  case GET_ALL_V1_MARKETPLACE_USER_JINGLES_SUCCESS:
    return {
      ...state,
      gettingV1MarketplaceUserJingles: false,
      gettingV1MarketplaceUserJinglesError: '',
      v1MarketplaceJingles: payload,
    };

  case GET_ALL_V1_MARKETPLACE_USER_JINGLES_FAILURE:
    return {
      ...state,
      gettingV1MarketplaceUserJingles: false,
      gettingV1MarketplaceUserJinglesError: payload,
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

  case GET_USER_SAMPLES_REQUEST:
    return {
      ...state,
      gettingUserSamples: true,
      gettingUserSamplesError: '',
    };

  case GET_USER_SAMPLES_SUCCESS:
    return {
      ...state,
      gettingUserSamples: false,
      gettingUserSamplesError: '',
      userSamples: payload,
    };

  case GET_USER_SAMPLES_FAILURE:
    return {
      ...state,
      gettingUserSamples: false,
      gettingUserSamplesError: payload,
    };

  case CREATE_JINGLE_REQUEST:
    return {
      ...state,
      creatingJingle: true,
      creatingJingleError: '',
      creatingJingleSuccess: false,
    };

  case CREATE_JINGLE_SUCCESS:
    return {
      ...state,
      creatingJingle: false,
      creatingJingleError: '',
      creatingJingleSuccess: true,
    };

  case CREATE_JINGLE_FAILURE:
    return {
      ...state,
      creatingJingle: false,
      creatingJingleError: payload,
      creatingJingleSuccess: false,
    };

  case CLEAR_CREATE_JINGLE:
    return {
      ...state,
      creatingJingle: false,
      creatingJingleError: '',
      creatingJingleSuccess: false,
    };

  default:
    return state;
  }
};
