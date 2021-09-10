import {
  GET_ALL_USER_JINGLES_REQUEST,
  GET_ALL_USER_JINGLES_SUCCESS,
  GET_ALL_USER_JINGLES_FAILURE,
  CLEAR_ALL_USER_JINGLES,

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

  UNWRAP_JINGLE_REQUEST,
  UNWRAP_JINGLE_SUCCESS,
  UNWRAP_JINGLE_FAILURE,
  CLEAR_UNWRAP_JINGLE,

  GET_USER_SAMPLES_REQUEST,
  GET_USER_SAMPLES_SUCCESS,
  GET_USER_SAMPLES_FAILURE,

  CREATE_JINGLE_REQUEST,
  CREATE_JINGLE_SUCCESS,
  CREATE_JINGLE_FAILURE,
  CLEAR_CREATE_JINGLE,

  GET_ALL_V0_MARKETPLACE_USER_JINGLES_REQUEST,
  GET_ALL_V0_MARKETPLACE_USER_JINGLES_SUCCESS,
  GET_ALL_V0_MARKETPLACE_USER_JINGLES_FAILURE,

  GET_ALL_V1_MARKETPLACE_USER_JINGLES_REQUEST,
  GET_ALL_V1_MARKETPLACE_USER_JINGLES_SUCCESS,
  GET_ALL_V1_MARKETPLACE_USER_JINGLES_FAILURE,
} from '../actionTypes/jingleActionTypes';
import {
  wrapJingle,
  unwrapJingle,
  getAllV0UserJingles,
  getAllV1UserJingles,
  getAllOgWrappedUserJingles,
  getAllNewWrappedUserJingles,
  getUserSamples,
  createJingle,
  getAllV0MarketplaceUserJingles,
  getAllV1MarketplaceUserJingles,
} from '../../services/jingleService';
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

    return payload;
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

    return payload;
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

    return payload;
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

    return payload;
  } catch (err) {
    dispatch({ type: GET_ALL_NEW_WRAPPED_USER_JINGLES_FAILURE, payload: err.message });

    // Do not remove this, action called in other actions
    throw new Error(err);
  }
};

/**
 * Handles the redux state for getting all the users v0 jingles
 * on sale on the marketplace
 *
 * @param address {String}
 * @return {Function}
 */
export const getAllV0MarketplaceUserJinglesAction = (address) => async (dispatch) => {
  dispatch({ type: GET_ALL_V0_MARKETPLACE_USER_JINGLES_REQUEST });

  try {
    const payload = await getAllV0MarketplaceUserJingles(address);

    dispatch({ type: GET_ALL_V0_MARKETPLACE_USER_JINGLES_SUCCESS, payload });

    return payload;
  } catch (err) {
    dispatch({ type: GET_ALL_V0_MARKETPLACE_USER_JINGLES_FAILURE, payload: err.message });

    // Do not remove this, action called in other actions
    throw new Error(err);
  }
};

/**
 * Handles the redux state for getting all the users v1 jingles
 * on sale on the marketplace
 *
 * @param address {String}
 * @return {Function}
 */
export const getAllV1MarketplaceUserJinglesAction = (address) => async (dispatch) => {
  dispatch({ type: GET_ALL_V1_MARKETPLACE_USER_JINGLES_REQUEST });

  try {
    const payload = await getAllV1MarketplaceUserJingles(address);

    dispatch({ type: GET_ALL_V1_MARKETPLACE_USER_JINGLES_SUCCESS, payload });

    return payload;
  } catch (err) {
    dispatch({ type: GET_ALL_V1_MARKETPLACE_USER_JINGLES_FAILURE, payload: err.message });

    // Do not remove this, action called in other actions
    throw new Error(err);
  }
};

/**
 * Handles the redux state for getting all the users v0 and v1 jingles
 *
 * @param address {String}
 * @param loadFromMarketplaces {Boolean}
 * @return {Function}
 */
export const getAllUserJinglesAction = (address, loadFromMarketplaces) => async (dispatch) => {
  dispatch({ type: GET_ALL_USER_JINGLES_REQUEST });

  try {
    const promises = [
      dispatch(getAllOGWrappedUserJinglesAction(address)),
      dispatch(getAllNewWrappedUserJinglesAction(address)),
      dispatch(getAllV0UserJinglesAction(address)),
      dispatch(getAllV1UserJinglesAction(address)),
    ];

    if (loadFromMarketplaces) {
      promises.push(dispatch(getAllV0MarketplaceUserJinglesAction(address)));
      promises.push(dispatch(getAllV1MarketplaceUserJinglesAction(address)));
    }

    const res = await Promise.all(promises);

    const payload = res.reduce((acc, jingleArr) => [...acc, ...jingleArr], []);

    dispatch({ type: GET_ALL_USER_JINGLES_SUCCESS, payload });
  } catch (err) {
    dispatch({ type: GET_ALL_USER_JINGLES_FAILURE, payload: err.message });
  }
};

export const clearAllUserJinglesAction = () => (dispatch) => dispatch({ type: CLEAR_ALL_USER_JINGLES });

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

    const wrappedJinglesArr = isOg ? jingle.ogWrappedUserJingles : jingle.newWrappedUserJingles;
    const changedJingle = jinglesVersionArr.find(({ jingleId }) => jingleId === id);
    const newWrappedJingles = [{ ...changedJingle, wrapped: true }, ...wrappedJinglesArr];

    dispatch({
      type: WRAP_JINGLE_SUCCESS, wrapKey, version, isOg, payload: { newJingles, newWrappedJingles },
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

/**
 * Handles the redux state for unwrapping any jingle type
 *
 * @param id
 * @param version
 * @param unwrapKey
 * @param isOg
 * @return {(function(*): Promise<void>)|*}
 */
export const unwrapJingleAction = (id, version, unwrapKey, isOg) => async (dispatch, getState) => {
  dispatch({ type: UNWRAP_JINGLE_REQUEST, unwrapKey });

  try {
    await unwrapJingle(id, version, getState().app.address, isOg);

    const { jingle } = getState();
    const wrappedJinglesArr = isOg ? jingle.ogWrappedUserJingles : jingle.newWrappedUserJingles;
    const newWrappedJingles = [...wrappedJinglesArr].filter(({ jingleId }) => jingleId !== id);

    const jinglesVersionArr = version === 0 ? jingle.v0UserJingles : jingle.v1UserJingles;
    const changedJingle = wrappedJinglesArr.find(({ jingleId }) => jingleId === id);
    const newJingles = [{ ...changedJingle, wrapped: false }, ...jinglesVersionArr];

    dispatch({
      type: UNWRAP_JINGLE_SUCCESS, unwrapKey, version, isOg, payload: { newJingles, newWrappedJingles },
    });
  } catch (err) {
    dispatch({ type: UNWRAP_JINGLE_FAILURE, unwrapKey, payload: err.message });
  }
};

/**
 * Handles the reducer state for clearing the remove action state
 *
 * @param id {Number}
 * @param version {Number}
 * @param unwrapKey {String}
 * @return {Function}
 */
export const clearUnwrapAction = (id, version, unwrapKey) => (dispatch, getState) => {
  const singleUnwrappingJingle = getState().jingle.unwrappingJingles[unwrapKey];

  if (singleUnwrappingJingle && !singleUnwrappingJingle.unwrapping) dispatch({ type: CLEAR_UNWRAP_JINGLE, unwrapKey });
};

/**
 * Handles the redux state for getting all the users v1 samples
 *
 * @param address {String}
 * @return {Function}
 */
export const getUserSamplesAction = (address) => async (dispatch) => {
  dispatch({ type: GET_USER_SAMPLES_REQUEST });

  try {
    const payload = await getUserSamples(address);

    dispatch({ type: GET_USER_SAMPLES_SUCCESS, payload });
  } catch (err) {
    dispatch({ type: GET_USER_SAMPLES_FAILURE, payload: err.message });
  }
};

/**
 * Handles the reducer state for when a user is creating a jingle
 *
 * @param settings
 * @param sampleIds
 * @param name
 * @return {(function(*, *): Promise<void>)|*}
 */
export const createJingleAction = (settings, sampleIds, name) => async (dispatch, getState) => {
  dispatch({ type: CREATE_JINGLE_REQUEST });

  try {
    const { address } = getState().app;

    await createJingle(settings, sampleIds, name, address);

    dispatch({ type: CREATE_JINGLE_SUCCESS });

    dispatch(getUserSamplesAction(address));
  } catch (err) {
    dispatch({ type: CREATE_JINGLE_FAILURE, payload: err.message });

    // this is because of how it is called in Compose.jsx
    throw new Error(err);
  }
};

/**
 * Handles the reducer state for clearing the create jingle action state
 *
 * @return {(function(*, *): void)|*}
 */
export const clearCreateJingleAction = () => (dispatch, getState) => {
  if (!getState().jingle.creatingJingle) dispatch({ type: CLEAR_CREATE_JINGLE });
};
