import { ADD_PENDING_TX, REMOVE_PENDING_TX, INIT_APP} from '../constants/actionTypes';

/**
 * Adds a pending tx to the notification dropdown
 *
 * @param {String} tx
 * @param {String} type
 * @return {Function}
 */
export const addPendingTx = (tx, type) => (dispatch) => {
  dispatch({ type: ADD_PENDING_TX, payload: { tx, type } });
};

/**
 * Removes a pending tx to the notification dropdown
 *
 * @param {String} tx
 * @return {Function}
 */
export const removePendingTx = tx => (dispatch, getState) => {
  let { pendingTxs } = getState().app;
  pendingTxs = [...pendingTxs];
  pendingTxs.splice(pendingTxs.findIndex(item => item.tx === tx), 1);

  dispatch({ type: REMOVE_PENDING_TX, payload: pendingTxs });
};

/**
 * Sends action to init full app
 *
 * @return {String} address
 * @param {Boolean} canLike
 * @param {Number} network
 * @param {Boolean} networkError
 */
export const initAppWithMM = (address, canLike, network, networkError) => (dispatch) => {
  dispatch({
    type: INIT_APP,
    payload: {
      hasMM: true,
      lockedMM: false,
      address,
      canLike,
      network,
      networkError,
    },
  });
};

/**
 * Sends action to init app with locked MM
 *
 * @param {Number} network
 * @param {Boolean} networkError
 * @return {String} address
 */
export const initAppWithLockedMM = (network, networkError) => (dispatch) => {
  dispatch({
    type: INIT_APP,
    payload: {
      hasMM: true,
      lockedMM: true,
      address: '',
      canLike: false,
      network,
      networkError,
    },
  });
};

/**
 * Sends action to init basic app without
 * ethereum interaction
 *
 * @return {String} address
 */
export const initAppWithoutMM = () => (dispatch) => {
  dispatch({ type: INIT_APP, payload: { hasMM: false, lockedMM: false, address: '', canLike: false } });
};
