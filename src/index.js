import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux'
import getWeb3 from './util/web3/getWeb3'

// Layouts
import App from './App';
import Home from './home/Home';
import MySamples from './mySamples/MySamples';
import MyJingles from './myJingles/MyJingles';
import Marketplace from './marketplace/Marketplace';
import Compose from './compose/Compose';
import MarketplaceJingle from './marketplace/MarketplaceJingle';

// Redux Store
import store from './store';

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store);

// Initialize web3 and set in Redux.
Promise.resolve(getWeb3)
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
          <Route path="/my-samples" component={ MySamples } />
          <Route path="/marketplace" component={ Marketplace } />
          <Route path="/song/:id" component={ MarketplaceJingle } />
          <Route path="/compose" component={ Compose } />
          <Route path="/my-jingles" component={ MyJingles } />
        </Route>
      </Router>
    </Provider>
  ),
  document.getElementById('root')
);
