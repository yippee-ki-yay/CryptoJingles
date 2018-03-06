import {
  SET_VALID_JINGLE, JINGLE_PAGE_LOADED, JINGLE_BOUGHT, JINGLE_SALE_CANCELED, JINGLE_PUT_ON_SALE, SET_JINGLE_SELL_PRICE,
  LIKE_UNLIKE_JINGLE_PAGE,
} from '../constants/actionTypes';

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

    case JINGLE_BOUGHT:
      return { ...state, jingle: payload.jingle, isOwner: payload.isOwner };

    case JINGLE_SALE_CANCELED:
    case JINGLE_PUT_ON_SALE:
    case LIKE_UNLIKE_JINGLE_PAGE:
      return { ...state, jingle: payload };

    case SET_JINGLE_SELL_PRICE:
      return { ...state, salePrice: payload };

    default:
      return state;
  }
};
