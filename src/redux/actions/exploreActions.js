import { EXPLORE_JINGLES_PER_PAGE } from 'constants/explore';
import {
  GET_EXPLORE_JINGLES_REQUEST,
  GET_EXPLORE_JINGLES_SUCCESS,
  GET_EXPLORE_JINGLES_FAILURE,

  GET_EXPLORE_FULL_JINGLES_DATA_PER_PAGE_REQUEST,
  GET_EXPLORE_FULL_JINGLES_DATA_PER_PAGE_SUCCESS,
  GET_EXPLORE_FULL_JINGLES_DATA_PER_PAGE_FAILURE,

  SET_EXPLORE_SORT,
  SET_EXPLORE_FILTER,
  SET_EXPLORE_PAGE,

  CLEAR_EXPLORE_JINGLES_ACTION,
} from 'redux/actionTypes/exploreActionTypes';
import { sortExploreJingles, getExploreJinglesIdsWithVersion } from 'services/exploreService';
import { getJinglesFullData } from 'services/jingleService';

/**
 * Handles the reducer state for getting the full
 * jingle data for the current page
 *
 * @return {(function(*, *): Promise<void>)|*}
 */
export const getExploreFullJinglesDataPerPageAction = () => async (dispatch, getState) => {
  dispatch({ type: GET_EXPLORE_FULL_JINGLES_DATA_PER_PAGE_REQUEST });

  const { currentPage, jinglesBasic } = getState().explore;

  const idsEnd = currentPage * EXPLORE_JINGLES_PER_PAGE;
  const idsStart = idsEnd - EXPLORE_JINGLES_PER_PAGE;

  const idsAndVersions = [...jinglesBasic].slice(idsStart, idsEnd);

  try {
    const fullDataJingles = await getJinglesFullData(idsAndVersions);

    const payload = idsAndVersions.map((idAndVer) => fullDataJingles.find(({ jingleId, version }) => parseFloat(jingleId) === idAndVer[0] && version === idAndVer[1]));

    dispatch({ type: GET_EXPLORE_FULL_JINGLES_DATA_PER_PAGE_SUCCESS, payload });
  } catch (err) {
    dispatch({ type: GET_EXPLORE_FULL_JINGLES_DATA_PER_PAGE_FAILURE, payload: err.message });
  }
};

/**
 * Handles the reducer state for getting all explore jingles for
 * the selected sort and filter
 *
 * @return {Function}
 */
export const getExploreJinglesAction = () => async (dispatch, getState) => {
  dispatch({ type: GET_EXPLORE_JINGLES_REQUEST });

  try {
    const { sorting, versionFilter } = getState().explore;

    const payload = await getExploreJinglesIdsWithVersion(versionFilter.value);

    dispatch({ type: GET_EXPLORE_JINGLES_SUCCESS, payload: sortExploreJingles(sorting.value, payload) });

    dispatch(getExploreFullJinglesDataPerPageAction());
  } catch (err) {
    dispatch({ type: GET_EXPLORE_JINGLES_FAILURE, payload: err.message });
  }
};

/**
 * Handles the reducer state for clearing all marketplace data
 *
 * @return {(function(*, *))|*}
 */
export const clearExploreJinglesAction = () => (dispatch) => dispatch({ type: CLEAR_EXPLORE_JINGLES_ACTION });

/**
 * Changes the current selected sorting option for the explore
 * and then get all jingles for that sorting option
 *
 * @param {Object} newVal { value, label }
 *
 * @return {Function}
 */
export const changeExploreSorting = (newVal) => (dispatch, getState) => {
  const newJinglesBasic = sortExploreJingles(newVal.value, [...getState().explore.jinglesBasic]);

  dispatch({ type: SET_EXPLORE_SORT, payload: { newVal, newJinglesBasic } });
  dispatch(getExploreFullJinglesDataPerPageAction());
};

/**
 * Handles the reducer state for setting a new sorting value
 * and gets new jingles for it
 *
 * @param newVal {Object}
 * @return {(function(*, *): void)|*}
 */
export const changeExploreFiltering = (newVal) => (dispatch, getState) => {
  dispatch({ type: SET_EXPLORE_FILTER, payload: newVal });
  dispatch(getExploreJinglesAction());
};

/**
 * Changes the current selected page and then get all jingles for that page
 *
 * @param {Number} pageNum
 * @return {Function}
 */
export const onExplorePaginationChange = (pageNum) => (dispatch) => {
  dispatch({ type: SET_EXPLORE_PAGE, payload: pageNum + 1 });
  dispatch(getExploreFullJinglesDataPerPageAction());
};
