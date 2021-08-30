import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import colors from '../styles/partials/colors';

import '../css/bootstrap.scss';
import '../css/custom.scss';
import '../css/theme.scss';
import '../styles/tooltip.scss';
import './App.scss';

Object.keys(colors.main).forEach((key) => {
  document.documentElement.style.setProperty(key, colors.main[key]);
});

const App = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Provider>
);

App.propTypes = { store: PropTypes.object.isRequired };

export default App;
