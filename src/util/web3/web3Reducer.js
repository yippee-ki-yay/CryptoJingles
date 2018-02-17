// TODO - user this instead of window.
const initialState = {
  web3Instance: null,
};

const web3Reducer = (state = initialState, action) => (
  (action.type === 'WEB3_INITIALIZED') ? { ...state, web3Instance: action.payload.web3Instance } : state
);

export default web3Reducer;
