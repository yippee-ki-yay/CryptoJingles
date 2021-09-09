import {
  SET_MARKETPLACE_CATEGORY, SET_MARKETPLACE_SORT, SET_MARKETPLACE_PAGE,
  MARKETPLACE_LIKE_UNLIKE_JINGLE,

  GET_MARKETPLACE_JINGLES_REQUEST,
  GET_MARKETPLACE_JINGLES_SUCCESS,
  GET_MARKETPLACE_JINGLES_FAILURE,

  GET_MARKETPLACE_FULL_JINGLES_DATA_PER_PAGE_REQUEST,
  GET_MARKETPLACE_FULL_JINGLES_DATA_PER_PAGE_SUCCESS,
  GET_MARKETPLACE_FULL_JINGLES_DATA_PER_PAGE_FAILURE,

  MARKETPLACE_JINGLES_PER_PAGE,
} from '../constants/actionTypes';
import { likeUnlikeJingle } from './utils';
import { getMarketplaceJinglesIdsWithPrices, sortMarketplaceJingles } from '../services/marketplaceService';
import { getJinglesV1FullData } from '../services/jingleService';

/**
 * Handles the reducer state for getting the full
 * jingle data for the current page
 *
 * @return {(function(*, *): Promise<void>)|*}
 */
export const getMarketplaceFullJinglesDataPerPageAction = () => async (dispatch, getState) => {
  dispatch({ type: GET_MARKETPLACE_FULL_JINGLES_DATA_PER_PAGE_REQUEST });

  const { currentPage, jinglesBasic } = getState().marketplace;

  const idsEnd = currentPage * MARKETPLACE_JINGLES_PER_PAGE;
  const idsStart = idsEnd - MARKETPLACE_JINGLES_PER_PAGE;

  const ids = [...jinglesBasic.map((item) => item[0])].slice(idsStart, idsEnd);

  try {
    const payload = await getJinglesV1FullData(ids);

    dispatch({ type: GET_MARKETPLACE_FULL_JINGLES_DATA_PER_PAGE_SUCCESS, payload });
  } catch (err) {
    dispatch({ type: GET_MARKETPLACE_FULL_JINGLES_DATA_PER_PAGE_FAILURE, payload: err.message });
  }
};

/**
 * Gets all jingles for category and sort option fromm the server and then sets it in the state
 *
 * @return {Function}
 */
export const getMarketplaceJinglesAction = () => async (dispatch, getState) => {
  dispatch({ type: GET_MARKETPLACE_JINGLES_REQUEST });

  try {
    const { sorting } = getState().marketplace;

    const payload = await getMarketplaceJinglesIdsWithPrices();

    dispatch({ type: GET_MARKETPLACE_JINGLES_SUCCESS, payload: sortMarketplaceJingles(sorting.value, payload) });

    dispatch(getMarketplaceFullJinglesDataPerPageAction());
  } catch (err) {
    dispatch({ type: GET_MARKETPLACE_JINGLES_FAILURE, payload: err.message });
  }
};

/**
 * Changes the current selected category for the marketplace
 * and then get all jingles for that category
 *
 * @param {Object} payload { value, label }
 *
 * @return {Function}
 */
export const changeMarketplaceCategory = (payload) => (dispatch) => {
  dispatch({ type: SET_MARKETPLACE_CATEGORY, payload });
  dispatch(getMarketplaceFullJinglesDataPerPageAction());
};

/**
 * Changes the current selected sorting option for the marketplace
 * and then get all jingles for that sorting option
 *
 * @param {Object} payload { value, label }
 *
 * @return {Function}
 */
export const changeMarketplaceSorting = (newVal) => (dispatch, getState) => {
  const newJinglesBasic = sortMarketplaceJingles(newVal.value, [...getState().marketplace.jinglesBasic]);

  dispatch({ type: SET_MARKETPLACE_SORT, payload: { newVal, newJinglesBasic } });
  dispatch(getMarketplaceFullJinglesDataPerPageAction());
};

/**
 * Changes the current selected page and then get all jingles for that page
 *
 * @param {Number} pageNum
 *
 * @return {Function}
 */
export const onMarketplacePaginationChange = (pageNum) => (dispatch) => {
  dispatch({ type: SET_MARKETPLACE_PAGE, payload: pageNum + 1 });
  dispatch(getMarketplaceFullJinglesDataPerPageAction());
};

/**
 * Updates jingle like count based on jingleId.
 *
 * @param {Number} jingleId
 * @param {Boolean} action - true = like, false = dislike
 *
 * @return {Function}
 */
export const likeUnLikeMarketplaceJingle = (jingleId, action) => async (dispatch, getState) => {
  const state = getState();
  const { address } = state.app;

  try {
    const likeData = await likeUnlikeJingle(jingleId, action, address);
    if (!likeData) return;

    const jingles = [...state.marketplace.jingles];
    const jingleIndex = jingles.findIndex((_jingle) => _jingle.jingleId === jingleId);

    jingles[jingleIndex] = { ...jingles[jingleIndex], ...likeData };
    dispatch({ type: MARKETPLACE_LIKE_UNLIKE_JINGLE, payload: jingles });
  } catch (err) {
    // TODO Handle this in the future
  }
};
