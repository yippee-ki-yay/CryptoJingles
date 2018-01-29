import { PROFILE_TABS, SET_ACTIVE_PROFILE_TAB } from '../constants/actionTypes';

const INITIAL_STATE = {
  tabs: PROFILE_TABS
};

export default (state = INITIAL_STATE, action) => {
  const  payload = action.payload;
  switch (action.type) {
    case SET_ACTIVE_PROFILE_TAB:
      return { ...state, tabs: payload };

    default:
      return state;
  }
};
