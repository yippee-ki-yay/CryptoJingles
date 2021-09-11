import {
  GET_SINGLE_JINGLE_REQUEST,
  GET_SINGLE_JINGLE_SUCCESS,
  GET_SINGLE_JINGLE_FAILURE,
  CLEAR_SINGLE_JINGLE,

  PURCHASE_JINGLE_REQUEST,
  PURCHASE_JINGLE_SUCCESS,
  PURCHASE_JINGLE_FAILURE,
  CLEAR_PURCHASE_JINGLE,
} from 'redux/actionTypes/singleJingleActionTypes';

const INITIAL_STATE = {
  gettingSingleJingle: false,
  gettingSingleJingleError: '',
  singleJingle: null,

  purchasingJingle: {},
};

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
  case GET_SINGLE_JINGLE_REQUEST:
    return {
      ...state,
      gettingSingleJingle: true,
      gettingSingleJingleError: '',
    };

  case GET_SINGLE_JINGLE_SUCCESS:
    return {
      ...state,
      gettingSingleJingle: false,
      gettingSingleJingleError: '',
      singleJingle: payload,
    };

  case GET_SINGLE_JINGLE_FAILURE:
    return {
      ...state,
      gettingSingleJingle: false,
      gettingSingleJingleError: payload,
    };

  case CLEAR_SINGLE_JINGLE:
    return { ...state, singleJingle: null };

  case PURCHASE_JINGLE_REQUEST:
    return {
      ...state,
      purchasingJingle: {
        ...state.purchasingJingle,
        [action.key]: {
          purchasing: true,
          error: '',
        },
      },
    };

  case PURCHASE_JINGLE_SUCCESS:
    return {
      ...state,
      purchasingJingle: {
        ...state.purchasingJingle,
        [action.key]: {
          purchasing: false,
          error: '',
        },
      },
      singleJingle: payload,
    };

  case PURCHASE_JINGLE_FAILURE:
    return {
      ...state,
      purchasingJingle: {
        ...state.purchasingJingle,
        [action.key]: {
          purchasing: false,
          error: payload,
        },
      },
    };

  case CLEAR_PURCHASE_JINGLE:
    return {
      ...state,
      purchasingJingle: {
        ...state.purchasingJingle,
        [action.key]: {
          purchasing: false,
          error: '',
        },
      },
    };

  default:
    return state;
  }
};
