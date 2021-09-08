import {
  GET_ALL_USER_JINGLES_REQUEST,
  GET_ALL_USER_JINGLES_SUCCESS,
  GET_ALL_USER_JINGLES_FAILURE,

  GET_ALL_USER_V0_JINGLES_REQUEST,
  GET_ALL_USER_V0_JINGLES_SUCCESS,
  GET_ALL_USER_V0_JINGLES_FAILURE,

  GET_ALL_USER_V1_JINGLES_REQUEST,
  GET_ALL_USER_V1_JINGLES_SUCCESS,
  GET_ALL_USER_V1_JINGLES_FAILURE,

  GET_ALL_OG_WRAPPED_USER_JINGLES_REQUEST,
  GET_ALL_OG_WRAPPED_USER_JINGLES_SUCCESS,
  GET_ALL_OG_WRAPPED_USER_JINGLES_FAILURE,

  GET_ALL_NEW_WRAPPED_USER_JINGLES_REQUEST,
  GET_ALL_NEW_WRAPPED_USER_JINGLES_SUCCESS,
  GET_ALL_NEW_WRAPPED_USER_JINGLES_FAILURE,

  WRAP_JINGLE_REQUEST,
  WRAP_JINGLE_SUCCESS,
  WRAP_JINGLE_FAILURE,
  CLEAR_WRAP_JINGLE,
} from '../redux/actionTypes/jingleActionTypes';
import {
  wrapJingle,
  getAllV0UserJingles,
  getAllV1UserJingles,
  getAllOgWrappedUserJingles,
  getAllNewWrappedUserJingles,
} from '../services/jingleService';
import { wait } from '../services/utilsService';
import { approveAddressOnAssetAction } from './assetsActions';

/**
 * Handles the redux state for getting all the users v0 jingles
 *
 * @param address {String}
 * @return {Function}
 */
export const getAllV0UserJinglesAction = (address) => async (dispatch, getState) => {
  dispatch({ type: GET_ALL_USER_V0_JINGLES_REQUEST });

  try {
    const payload = await getAllV0UserJingles(address);

    dispatch({ type: GET_ALL_USER_V0_JINGLES_SUCCESS, payload });
  } catch (err) {
    dispatch({ type: GET_ALL_USER_V0_JINGLES_FAILURE, payload: err.message });

    // Do not remove this, action called in other actions
    throw new Error(err);
  }
};

/**
 * Handles the redux state for getting all the users v0 jingles
 *
 * @param address {String}
 * @return {Function}
 */
export const getAllV1UserJinglesAction = (address) => async (dispatch, getState) => {
  dispatch({ type: GET_ALL_USER_V1_JINGLES_REQUEST });

  try {
    const payload = await getAllV1UserJingles(address);

    dispatch({ type: GET_ALL_USER_V1_JINGLES_SUCCESS, payload });
  } catch (err) {
    dispatch({ type: GET_ALL_USER_V1_JINGLES_FAILURE, payload: err.message });

    // Do not remove this, action called in other actions
    throw new Error(err);
  }
};

/**
 * Handles the redux state for getting all the users OG wrapped jingles
 *
 * @param address {String}
 * @return {Function}
 */
export const getAllOGWrappedUserJinglesAction = (address) => async (dispatch, getState) => {
  dispatch({ type: GET_ALL_OG_WRAPPED_USER_JINGLES_REQUEST });

  try {
    const payload = await getAllOgWrappedUserJingles(address);

    dispatch({ type: GET_ALL_OG_WRAPPED_USER_JINGLES_SUCCESS, payload });
  } catch (err) {
    dispatch({ type: GET_ALL_OG_WRAPPED_USER_JINGLES_FAILURE, payload: err.message });

    // Do not remove this, action called in other actions
    throw new Error(err);
  }
};

/**
 * Handles the redux state for getting all the users new wrapped jingles
 *
 * @param address {String}
 * @return {Function}
 */
export const getAllNewWrappedUserJinglesAction = (address) => async (dispatch, getState) => {
  dispatch({ type: GET_ALL_NEW_WRAPPED_USER_JINGLES_REQUEST });

  try {
    const payload = await getAllNewWrappedUserJingles(address);

    dispatch({ type: GET_ALL_NEW_WRAPPED_USER_JINGLES_SUCCESS, payload });
  } catch (err) {
    dispatch({ type: GET_ALL_NEW_WRAPPED_USER_JINGLES_FAILURE, payload: err.message });

    // Do not remove this, action called in other actions
    throw new Error(err);
  }
};

/**
 * Handles the redux state for getting all the users v0 and v1 jingles
 *
 * @param address {String}
 * @return {Function}
 */
export const getAllUserJinglesAction = (address) => async (dispatch) => {
  dispatch({ type: GET_ALL_USER_JINGLES_REQUEST });

  try {
    await Promise.all([
      dispatch(getAllOGWrappedUserJinglesAction(address)),
      dispatch(getAllNewWrappedUserJinglesAction(address)),
      dispatch(getAllV0UserJinglesAction(address)),
      dispatch(getAllV1UserJinglesAction(address)),
    ]);

    dispatch({ type: GET_ALL_USER_JINGLES_SUCCESS });
  } catch (err) {
    dispatch({ type: GET_ALL_USER_JINGLES_FAILURE, payload: err.message });
  }
};

/**
 * Handles the redux state for wrapping any jingle type
 *
 * @param id
 * @param version
 * @param approved
 * @param approveAddress
 * @param approveType
 * @param assetSymbol
 * @param wrapKey
 * @param isOg
 * @return {(function(*): Promise<void>)|*}
 */
export const wrapJingleAction = (id, version, approved, approveAddress, approveType, assetSymbol, wrapKey, isOg) => async (dispatch, getState) => {
  dispatch({ type: WRAP_JINGLE_REQUEST, wrapKey });

  try {
    if (!approved) await dispatch(approveAddressOnAssetAction(assetSymbol, approveAddress, approveType, id));

    await wrapJingle(id, version, getState().app.address, isOg);

    const { jingle } = getState();
    const jinglesVersionArr = version === 0 ? jingle.v0UserJingles : jingle.v1UserJingles;
    const newJingles = [...jinglesVersionArr].filter(({ jingleId }) => jingleId !== id);

    // TODO - add to wrappedUserOgJingles or to wrappedUserNewJingles

    dispatch({
      type: WRAP_JINGLE_SUCCESS, wrapKey, version, payload: newJingles,
    });
  } catch (err) {
    dispatch({ type: WRAP_JINGLE_FAILURE, wrapKey, payload: err.message });
  }
};

/**
 * Handles the reducer state for clearing the remove action state
 *
 * @param id {Number}
 * @param version {Number}
 * @param wrapKey {String}
 * @return {Function}
 */
export const clearWrapAction = (id, version, wrapKey) => (dispatch, getState) => {
  const singleWrappingJingle = getState().jingle.wrappingJingles[wrapKey];

  if (singleWrappingJingle && !singleWrappingJingle.wrapping) dispatch({ type: CLEAR_WRAP_JINGLE, wrapKey });
};
