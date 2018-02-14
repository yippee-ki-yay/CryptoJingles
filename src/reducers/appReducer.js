import { ADD_PENDING_TX, REMOVE_PENDING_TX, INIT_APP } from '../constants/actionTypes';

const INITIAL_STATE = {
  pendingTxs: [],
  address: '',
  hasMM: false,
  lockedMM: false
};

export default (state = INITIAL_STATE, action) => {
  const  payload = action.payload;

  switch (action.type) {
    case INIT_APP:
      return {
        ...state,
        hasMM: payload.hasMM,
        lockedMM: payload.lockedMM,
        address: payload.address
      };

    case ADD_PENDING_TX:
      return { ...state, pendingTxs: [...state.pendingTxs, payload] };
    case REMOVE_PENDING_TX:
      return { ...state, pendingTxs: payload };

    default:
      return state;
  }
};
