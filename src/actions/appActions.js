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

/**
 * Generates unique id
 *
 * @return {String}
 */
export const guid = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return `${s4()}${s4()}-${s4()}-${s4()}-${s4()}-${s4()}${s4()}${s4()}`;
};