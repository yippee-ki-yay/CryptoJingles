import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';

import '../css/bootstrap.scss';
import '../css/custom.scss';
import '../css/theme.scss';
import './App.scss';

const App = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
);

App.propTypes = { store: PropTypes.object.isRequired };

export default App;
