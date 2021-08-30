import React, { Suspense, lazy } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from './Header/Header';
import ScrollToTop from './ScrollToTop/ScrollToTop';
import Page404 from './Page404/Page404';
import ModalRoot from './Modals/ModalRoot';

// Layouts
const HomeLazy = lazy(() => import('./Home/Home'));
const ProfileLazy = lazy(() => import('./Profile/Profile'));
const MarketplaceLazy = lazy(() => import('./Marketplace/Marketplace'));
const ComposeLazy = lazy(() => import('./Compose/Compose'));
const JinglePageLazy = lazy(() => import('./JinglePage/JinglePage'));

const Routes = () => (
  <div className="app">
    <Header />

    <div className="children-wrapper">
      <Suspense fallback={<div className="loader-between-pages" />}>
        <ScrollToTop>
          <Switch>
            <Route path="/" exact component={HomeLazy} />
            <Route path="/marketplace" component={MarketplaceLazy} />
            <Route path="/jingle/:id" component={JinglePageLazy} />
            <Route path="/compose" component={ComposeLazy} />
            <Route path="/profile/:address" component={ProfileLazy} />
            <Route path="/404" component={Page404} />
            <Redirect from="*" to="/404" />
          </Switch>
        </ScrollToTop>
      </Suspense>
    </div>

    <ModalRoot />
  </div>
);

Routes.propTypes = {};

export default Routes;
