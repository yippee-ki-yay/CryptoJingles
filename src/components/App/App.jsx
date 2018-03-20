import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PropTypes from 'prop-types';
import PendingTxDropdown from '../PendingTxDropdown/PendingTxDropdown';
import Logo from '../Decorative/Logo';
import { CURRENT_NETWORK } from '../../constants/config';

import '../../css/bootstrap.min.css';
import '../../css/custom.min.css';
import '../../css/theme.min.css';
import './App.scss';

const App = ({
  lockedMM, hasMM, address, children, networkError,
}) => (
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
            <li><Link to="/compose">Compose</Link></li>
            <li><Link to="/marketplace">Marketplace</Link></li>
            {
              hasMM && !lockedMM &&
              <li><Link to={`/profile/${address}`}>Profile</Link></li>
            }
            <li><Link to="/sample-packs">Sample packs</Link></li>
          </ul>

          <div className="nav navbar-nav navbar-right">
            <PendingTxDropdown />
          </div>
        </div>
      </div>
    </header>

    {
      networkError &&
      <div className="container">
        <div className="network-error">
          You are using the wrong network. Please set Metamask to {CURRENT_NETWORK}
        </div>
      </div>
    }

    <div className="children-wrapper">
      {children}
    </div>
  </div>
);

App.propTypes = {
  hasMM: PropTypes.bool.isRequired,
  lockedMM: PropTypes.bool.isRequired,
  address: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  networkError: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ app }) => ({
  hasMM: app.hasMM,
  lockedMM: app.lockedMM,
  address: app.address,
  networkError: app.networkError,
});


export default connect(mapStateToProps)(App);
