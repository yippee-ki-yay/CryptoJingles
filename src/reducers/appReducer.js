import { ADD_PENDING_TX, REMOVE_PENDING_TX, INIT_APP } from '../constants/actionTypes';

const INITIAL_STATE = {
  pendingTxs: [],
  address: '',
  hasMM: false,
  lockedMM: false,
  canLike: false,
};

export default (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
  case INIT_APP:
    return {
      ...state,
      hasMM: payload.hasMM,
      lockedMM: payload.lockedMM,
      address: payload.address,
      canLike: payload.canLike,
    };

  case ADD_PENDING_TX:
    return { ...state, pendingTxs: [...state.pendingTxs, payload] };
  case REMOVE_PENDING_TX:
    return { ...state, pendingTxs: payload };

  default:
    return state;
  }
};
