import { UPDATE_VOLUME, UPDATE_DELAY, UPDATE_CUTS } from '../constants/actionTypes';

const INITIAL_STATE = {
  volumes: [50, 50, 50, 50, 50],
  delays: [0, 0, 0, 0, 0],
  cuts: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
};

export default (state = INITIAL_STATE, action) => {
  const payload = action.payload;
  switch (action.type) {
    case UPDATE_VOLUME:
      const newState = Object.assign({}, state);

      newState.volumes[payload.index] = payload.volume;
      return newState;

    case UPDATE_DELAY:
      const updatedState = Object.assign({}, state);

      updatedState.delays[payload.index] = payload.delay;
      return updatedState;

    case UPDATE_CUTS:
      const cutState = Object.assign({}, state);

      cutState.cuts[payload.index] = payload.cuts.min;
      cutState.cuts[payload.index + 5] = payload.cuts.max;

      return cutState;

    default:
      return state;
  }
};
