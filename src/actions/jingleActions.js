import {
  GET_ALL_JINGLES_REQUEST,
  GET_ALL_JINGLES_SUCCESS,
  GET_ALL_JINGLES_FAILURE,

  WRAP_JINGLE_REQUEST,
  WRAP_JINGLE_SUCCESS,
  WRAP_JINGLE_FAILURE,
} from '../redux/actionTypes/jingleActionTypes';
import { getAllJingles, wrapJingle } from '../services/jingleService';
import { wait } from '../services/utilsService';

/**
 * Gets all jingles from the server for the current address
 *
 * @return {Function}
 */
export const getAllJinglesAction = () => async (dispatch, getState) => {
  dispatch({ type: GET_ALL_JINGLES_REQUEST });

  try {
    await wait(1000);
    // const { address } = getState().app;
    const address = '0x93cdB0a93Fc36f6a53ED21eCf6305Ab80D06becA';
    const profileAddress = '0x93cdB0a93Fc36f6a53ED21eCf6305Ab80D06becA';
    const payload = await getAllJingles(profileAddress, address, 1);

    dispatch({ type: GET_ALL_JINGLES_SUCCESS, payload });
  } catch (err) {
    dispatch({ type: GET_ALL_JINGLES_FAILURE, payload: err.message });
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
