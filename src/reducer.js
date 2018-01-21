import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import web3Reducer from './util/web3/web3Reducer';
import marketplaceReducer from './reducers/marketplaceReducer';
import appReducer from './reducers/appReducer';

const reducer = combineReducers({
  routing: routerReducer,
  web3: web3Reducer,
  marketplace: marketplaceReducer,
  app: appReducer
});

export default reducer;
