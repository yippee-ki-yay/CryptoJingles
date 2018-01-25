import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import web3Reducer from './util/web3/web3Reducer';
import audioReducer from './reducers/audioReducer';
import appReducer from './reducers/appReducer';

const reducer = combineReducers({
  routing: routerReducer,
  web3: web3Reducer,
  audio: audioReducer,
  app: appReducer
});

export default reducer;
