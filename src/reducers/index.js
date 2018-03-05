import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import appReducer from './appReducer';
import marketplaceReducer from './marketplaceReducer';
import profileReducer from './profileReducer';
import composeReducer from './composeReducer';
import audioReducer from './audioReducer';

const reducer = combineReducers({
  routing: routerReducer,
  profile: profileReducer,
  marketplace: marketplaceReducer,
  compose: composeReducer,
  app: appReducer,
  audio: audioReducer,
});

export default reducer;
