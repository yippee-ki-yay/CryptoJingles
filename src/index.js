import FastClick from 'fastclick';
import React from 'react';
import getWeb3 from './util/web3/getWeb3';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, Redirect } from 'react-router';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';

// Layouts
import App from './App';
import Home from './home/Home';
import MySamples from './mySamples/MySamples';
import Profile from './components/Profile/Profile';
import Marketplace from './marketplace/Marketplace';
import Compose from './compose/Compose';
import JinglePage from './marketplace/JinglePage';

// Redux Store
import store from './store';

// Initialize react-router-redux.
const history = syncHistoryWithStore(browserHistory, store);

const startApp = () => {
  if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', () => { FastClick.attach(document.body); }, false);
  }

  getWeb3();

  ReactDOM.render((
    <div>
      <Provider store={store}>
        <Router history={history}>
          <Route path='/' component={App}>
            <IndexRoute component={Home} />
            <Route path="/home" component={Home} />
            <Route path="/marketplace" component={Marketplace} />
            <Route path="/jingle/:id" component={JinglePage} />
            <Route path="/compose" component={Compose} />
            <Route path="/profile" component={Profile} />
            <Route path='/404' component={() => (<div>404</div>)} />
            <Redirect from='*' to='/404' />
          </Route>
        </Router>
      </Provider>
    </div>
    ),
    document.getElementById('root')
  );
};

window.addEventListener('load', startApp);
