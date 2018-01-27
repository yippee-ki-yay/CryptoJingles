import React from 'react';
import getWeb3 from './util/web3/getWeb3';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

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

const startApp = () => {
  getWeb3();

  ReactDOM.render((
    <div>
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
    </div>
    ),
    document.getElementById('root')
  );
};

window.addEventListener('load', startApp);
