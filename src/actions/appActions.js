import { ADD_PENDING_TX, REMOVE_PENDING_TX } from '../constants/actionTypes';

export const addPendingTx = (tx, type) => (dispatch) => {
  dispatch({ type: ADD_PENDING_TX, payload: { tx, type } });
};

export const removePendingTx = (tx) => (dispatch, getState) => {
  let pendingTxs = getState().app.pendingTxs;
  pendingTxs = [...pendingTxs];
  pendingTxs.splice(pendingTxs.findIndex((item) => item.tx === tx), 1);

  dispatch({ type: REMOVE_PENDING_TX, payload: pendingTxs });
};