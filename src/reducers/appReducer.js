import { ADD_PENDING_TX, REMOVE_PENDING_TX } from '../constants/actionTypes';

const INITIAL_STATE = {
  pendingTxs: []
};

export default (state = INITIAL_STATE, action) => {
  const  payload = action.payload;
  switch (action.type) {
    case ADD_PENDING_TX:
      return { ...state, pendingTxs: [...state.pendingTxs, payload] };
    case REMOVE_PENDING_TX:
      return { ...state, pendingTxs: payload };

    default:
      return state;
  }
};
