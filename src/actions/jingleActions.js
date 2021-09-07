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

  WRAP_JINGLE_REQUEST,
  WRAP_JINGLE_SUCCESS,
  WRAP_JINGLE_FAILURE,
} from '../redux/actionTypes/jingleActionTypes';
import { wrapJingle, getAllV0UserJingles, getAllV1UserJingles } from '../services/jingleService';
import { wait } from '../services/utilsService';

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
 * Handles the redux state for getting all the users v0 and v1 jingles
 *
 * @param address {String}
 * @return {Function}
 */
export const getAllUserJinglesAction = (address) => async (dispatch) => {
  dispatch({ type: GET_ALL_USER_JINGLES_REQUEST });

  try {
    await Promise.all([dispatch(getAllV0UserJinglesAction(address)), dispatch(getAllV1UserJinglesAction(address))]);

    dispatch({ type: GET_ALL_USER_JINGLES_SUCCESS });
  } catch (err) {
    dispatch({ type: GET_ALL_USER_JINGLES_FAILURE, payload: err.message });
  }
};

/**
 * Wraps selected jingle
 *
 * @return {Function}
 */
export const wrapJingleAction = (id) => async (dispatch) => {
  dispatch({ type: WRAP_JINGLE_REQUEST, id });

  try {
    await wrapJingle();

    dispatch({ type: WRAP_JINGLE_SUCCESS, id });
  } catch (err) {
    dispatch({ type: WRAP_JINGLE_FAILURE, id, payload: err.message });
  }
};
