import {
  GET_SINGLE_JINGLE_REQUEST,
  GET_SINGLE_JINGLE_SUCCESS,
  GET_SINGLE_JINGLE_FAILURE,
} from 'redux/actionTypes/singleJingleActionTypes';

const INITIAL_STATE = {
  gettingSingleJingle: false,
  gettingSingleJingleError: '',
  singleJingle: null,
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

  default:
    return state;
  }
};
