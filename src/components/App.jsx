import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { BrowserRouter } from 'react-router-dom';
import langManager from 'services/translate/lang-manager';
import { setupWeb3 } from '../services/web3Service';
import Routes from './Routes';
import colors from '../styles/partials/colors';

import '../css/bootstrap.scss';
import '../css/custom.scss';
import '../css/theme.scss';
import '../styles/tooltip.scss';
import '../styles/button.scss';
import './App.scss';

Object.keys(colors.main).forEach((key) => {
  document.documentElement.style.setProperty(key, colors.main[key]);
});

langManager.init();
setupWeb3();

const defaultRichTextElements = {
  b: (chunks) => <b>{chunks}</b>,
  br: (test) => <br />,
  span: (chunks) => <span>{chunks}</span>,
};

const App = ({ store }) => (
  <Provider store={store}>
    <IntlProvider
      key="en"
      locale="en"
      messages={langManager.messages}
      defaultRichTextElements={defaultRichTextElements}
    >
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </IntlProvider>
  </Provider>
);

App.propTypes = { store: PropTypes.object.isRequired };

export default App;
