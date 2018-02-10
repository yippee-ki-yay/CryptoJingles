import { UPDATE_VOLUME } from '../constants/actionTypes';

const INITIAL_STATE = {
  volumes: [50, 50, 50, 50, 50]
};

export default (state = INITIAL_STATE, action) => {
  const  payload = action.payload;
  switch (action.type) {
    case UPDATE_VOLUME:
       const newState = Object.assign({}, state);

       newState.volumes[payload.index] = payload.volume;
       return newState;

    default:
      return state;
  }
};
