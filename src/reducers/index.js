import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import web3Reducer from '../util/web3/web3Reducer';
// import audioReducer from './audioReducer';
import appReducer from './appReducer';
import marketplaceReducer from './marketplaceReducer';
import profileReducer from './profileReducer';
import composeReducer from './composeReducer';
import modalReducer from './modalReducer';
import jingleReducer from './jingleReducer';
import assetsReducer from './assetsReducer';

const reducer = combineReducers({
  routing: routerReducer,
  profile: profileReducer,
  marketplace: marketplaceReducer,
  compose: composeReducer,
  app: appReducer,
  modal: modalReducer,
  jingle: jingleReducer,
  assets: assetsReducer,
  // web3: web3Reducer,
  // audio: audioReducer,
});

export default reducer;
