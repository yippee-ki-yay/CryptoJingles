import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import PendingTxDropdown from '../PendingTxDropdown/PendingTxDropdown';
import Logo from '../Decorative/Logo';

import '../../css/bootstrap.min.css';
import '../../css/custom.min.css';
import '../../css/theme.min.css';
import './App.scss';

const App = ({ lockedMM, hasMM, address }) => (
  <div>
    <header className="navbar navbar-default navbar-fixed-top header-wrapper">
      <div className="container">
        <div className="navbar-header">
          <Link to="/" className="navbar-brand">
            <span><Logo /></span>
            Crypto Jingles
          </Link>
          <button className="navbar-toggle" type="button" data-toggle="collapse" data-target="#navbar-main">
            <span className="icon-bar" />
            <span className="icon-bar" />
            <span className="icon-bar" />
          </button>
        </div>
        <div className="navbar-collapse collapse" id="navbar-main">
          <ul className="nav navbar-nav navbar-left">

            <li>
              <Link to="/compose">Compose</Link>
            </li>
            <li>
              <Link to="/marketplace">Marketplace</Link>
            </li>
            <li>
              {
                hasMM && !lockedMM &&
                <Link to={`/profile/${address}`}>Profile</Link>
              }
            </li>
          </ul>

          <div className="nav navbar-nav navbar-right">
            <PendingTxDropdown />
          </div>
        </div>
      </div>
    </header>

    <div className="children-wrapper">
      {this.props.children}
    </div>
  </div>
);

const mapStateToProps = state => ({
  hasMM: state.app.hasMM,
  lockedMM: state.app.lockedMM,
  address: state.app.address,
});

App.propTypes = {
  hasMM: PropTypes.bool.isRequired,
  lockedMM: PropTypes.bool.isRequired,
  address: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(App);
