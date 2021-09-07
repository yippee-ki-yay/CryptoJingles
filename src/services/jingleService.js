import axios from 'axios';
import { API_URL } from '../util/config';
import { CATEGORY_OPTIONS, SORTING_OPTIONS } from '../constants/actionTypes';

export const getAllJingles = async (profileAddress, address, currentJinglesPage) => {
  let jingles = [];

  const category = CATEGORY_OPTIONS[0];
  const activeSort = SORTING_OPTIONS[0];
  const query = `${API_URL}/jingles/${category.value}/${profileAddress}/page/${currentJinglesPage}/filter/${activeSort.value}`;
  const response = await axios(query);
  jingles = response.data;

  // const jingleIds = response.data.map((_jingle) => _jingle.jingleId).toString();

  // if (jingleIds.length > 0) {
  //   const likedJinglesResponse = axios(`${API_URL}/jingles/check-liked/${address}/${jingleIds}`);
  //   jingles = response.data.map((_jingle, index) => ({
  //     ..._jingle, liked: likedJinglesResponse.data[index],
  //   }));
  // } else {
  //   jingles = response.data;
  // }
  // false for all jingles, true to get jingles on sale
  const query2 = `${API_URL}/jingles/count/owner/${profileAddress}/sale/${(category === 'sale').toString()}`;
  const num = await axios(query2);

  return { jingles, num: num.data };
};

export const wrapJingle = () => {};
