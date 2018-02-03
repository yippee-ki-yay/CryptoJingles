import axios from 'axios';
import { API_URL } from '../util/config';
import {
  SET_MARKETPLACE_CATEGORY, SET_MARKETPLACE_JINGLES, SET_MARKETPLACE_SORT, SET_MARKETPLACE_PAGE
} from '../constants/actionTypes';

/**
 * Gets all jingles for category and sort option fromm the server and then sets it in the state
 *
 * @return {Function}
 */
export const getMarketplaceJingles = () => async (dispatch, getState) => {
  const { currentPage, category, sorting, } = getState().marketplace;

  try {
    const response = await axios(`${API_URL}/jingles/${category.value}/${currentPage}/filter/${sorting.value}`);

    // false for all jingles, true to get jingles on sale
    const num = await axios(`${API_URL}/jingles/count/filter/${sorting.value}/sale/${(category.value === 'sale').toString()}`);

    dispatch({ type: SET_MARKETPLACE_JINGLES, payload: { jingles: response.data, num: num.data } })
  } catch (err) {
    // console.error('Get marketplace jingles error:', err); // TODO Handle this in the future
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
  dispatch(getMarketplaceJingles());
};

/**
 * Changes the current selected sorting option for the marketplace
 * and then get all jingles for that sorting option
 *
 * @param {Object} payload { value, label }
 *
 * @return {Function}
 */
export const changeMarketplaceSorting = (payload) => (dispatch) => {
  dispatch({ type: SET_MARKETPLACE_SORT, payload });
  dispatch(getMarketplaceJingles());
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
  dispatch(getMarketplaceJingles());
};
