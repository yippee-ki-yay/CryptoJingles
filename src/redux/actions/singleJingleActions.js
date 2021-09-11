import {
  GET_SINGLE_JINGLE_REQUEST,
  GET_SINGLE_JINGLE_SUCCESS,
  GET_SINGLE_JINGLE_FAILURE,
} from 'redux/actionTypes/singleJingleActionTypes';
import { getSingleJingle } from 'services/singleJingleService';
import { wait } from '../../services/utilsService';

/**
 * Handles the reducer state for getting data for a single jingle
 * per version per id
 *
 * @param version
 * @param id
 * @return {(function(*))|*}
 */
export const getSingleJingleAction = (version, id) => async (dispatch) => {
  dispatch({ type: GET_SINGLE_JINGLE_REQUEST });

  try {
    const payload = await getSingleJingle(version, id);

    dispatch({ type: GET_SINGLE_JINGLE_SUCCESS, payload });
  } catch (err) {
    dispatch({ type: GET_SINGLE_JINGLE_FAILURE, payload: err.message });
  }
};
