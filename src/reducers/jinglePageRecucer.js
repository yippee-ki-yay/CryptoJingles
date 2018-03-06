import { SET_VALID_JINGLE, JINGLE_PAGE_LOADED } from '../constants/actionTypes';

const INITIAL_STATE = {
  jingle: null,
  validJingle: true,
  isOwner: false,
  salePrice: undefined,
};

export default (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_VALID_JINGLE:
      return { ...state, validJingle: payload };

    case JINGLE_PAGE_LOADED:
      return {
        ...state,
        jingle: payload.jingle,
        isOwner: payload.isOwner,
        validJingle: payload.validJingle,
      };

    default:
      return state;
  }
};
