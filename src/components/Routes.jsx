import React, { Suspense, lazy, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './Header/Header';
import ScrollToTop from './ScrollToTop/ScrollToTop';
import Page404 from './Page404/Page404';
import ModalRoot from './Modals/ModalRoot';
import Footer from './Common/Footer/Footer';
import AccountRouteChecker from './AccountRouteChecker/AccountRouteChecker';
import { useWindowSize } from '../hooks/generalHooks';
import { listenToAccChange, silentLogin } from '../redux/actions/walletActions';

import '../services/contractsRegistryService';

// Layouts
const HomeLazy = lazy(() => import('./Home/Home'));
const ProfileLazy = lazy(() => import('./Profile/Profile'));
const MarketplaceLazy = lazy(() => import('./Marketplace/Marketplace'));
const ComposeLazy = lazy(() => import('./Compose/Compose'));
const JinglePageLazy = lazy(() => import('./JinglePage/JinglePage'));
const WrapJinglesLazy = lazy(() => import('./WrapJingles/WrapJingles'));

const Routes = ({ listenToAccChange, silentLogin }) => {
  const [windowWidth, windowHeight] = useWindowSize();

  useEffect(() => {
    document.documentElement.style.setProperty('--vh', `${window.innerHeight / 100}px`);
  }, [windowHeight]);

  useEffect(() => {
    silentLogin();
    listenToAccChange();
  }, [listenToAccChange, silentLogin]);

  return (
    <div className="app">
      <Header />

      <div className="children-wrapper">
        <Suspense fallback={<div className="loader-between-pages" />}>
          <ScrollToTop>
            <Switch>
              <Route path="/" exact component={HomeLazy} />
              <Route path="/marketplace" component={MarketplaceLazy} />
              <Route path="/jingle/:id" component={JinglePageLazy} />
              <AccountRouteChecker path="/wrap-jingle" component={WrapJinglesLazy} requireLogin requireLoginBlocker />
              <Route path="/compose" component={ComposeLazy} />
              <Route path="/profile/:address" component={ProfileLazy} />
              <Route path="/404" component={Page404} />
              <Redirect from="*" to="/404" />
            </Switch>
          </ScrollToTop>
        </Suspense>
      </div>

      <Footer />
      <ModalRoot />
    </div>
  );
};

Routes.propTypes = {
  listenToAccChange: PropTypes.func.isRequired,
  silentLogin: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  listenToAccChange,
  silentLogin,
};

export default connect(null, mapDispatchToProps)(Routes);
