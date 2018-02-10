import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import web3Reducer from './util/web3/web3Reducer';
import audioReducer from './reducers/audioReducer';
import appReducer from './reducers/appReducer';
import marketplaceReducer from './reducers/marketplaceReducer';
import profileReducer from './reducers/profileReducer';
import composeReducer from './reducers/composeReducer';

const reducer = combineReducers({
  routing: routerReducer,
  profile: profileReducer,
  marketplace: marketplaceReducer,
  compose: composeReducer,
  web3: web3Reducer,
  audio: audioReducer,
  app: appReducer
});

export default reducer;
