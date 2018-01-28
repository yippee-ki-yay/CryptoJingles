import axios from 'axios';
import { API_URL } from '../util/config';
import {
  SET_MARKETPLACE_CATEGORY, SET_MARKETPLACE_JINGLES, SET_MARKETPLACE_SORT, SET_MARKETPLACE_PAGE
} from '../constants/actionTypes';

import img0 from '../mockImages/render_0.png'; // TODO Replace this with canvas in SingleJingle component

/**
 * Gets all jingles for category and sort option fromm the server and then sets it in the state
 *
 * @return {Function}
 */
export const getMarketplaceJingles = () => async (dispatch, getState) => {
  const { currentPage, category, sorting, } = getState().marketplace;

  try {
    const response = await axios(`${API_URL}/jingles/${category.value}/${currentPage}/filter/${sorting.value}`);
    response.data.forEach(j => { j.imageSrc = img0; }); // TODO Replace this with canvas in SingleJingle component

    dispatch({ type: SET_MARKETPLACE_JINGLES, payload: response.data })
  } catch (err) {
    console.error('Get marketplace jingles error:', err); // TODO Handle this in the future
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
 * @param {Object} payload
 *
 * @return {Function}
 */
export const onMarketplacePaginationChange = (payload) => (dispatch) => {
  console.log('payload', payload);
  dispatch({ type: SET_MARKETPLACE_PAGE, payload });
  dispatch(getMarketplaceJingles());
};
