import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import getWeb3 from './util/web3/getWeb3'

// Layouts
import App from './App';
import Home from './home/Home';
import MyJingles from './myJingles/MyJingles';
import MySongs from './mySongs/MySongs';
import Marketplace from './marketplace/Marketplace';
import Compose from './compose/Compose';
import MarketplaceSong from './marketplace/MarketplaceSong';

// Redux Store
import store from './store';

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store);

// Initialize web3 and set in Redux.
getWeb3
.then(results => {
  console.log('Web3 initialized!')
})
.catch(() => {
  console.log('Error in web3 initialization.')
});

ReactDOM.render((
    <Provider store={store}>
      <Router history={history}>
        <Route path='/' component={ App }>
          <IndexRoute component={ Home } />
          <Route path="/home" component={ Home } />
          <Route path="/my-jingles" component={ MyJingles } />
          <Route path="/marketplace" component={ Marketplace } />
          <Route path="/song/:id" component={ MarketplaceSong } />
          <Route path="/compose" component={ Compose } />
          <Route path="/my-songs" component={ MySongs } />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
);
