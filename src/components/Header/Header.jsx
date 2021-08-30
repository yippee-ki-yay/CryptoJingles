import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Logo from '../Decorative/Logo';
import PendingTxDropdown from '../PendingTxDropdown/PendingTxDropdown';

const Header = ({ lockedMM, hasMM, address }) => (
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
);

const mapStateToProps = (state) => ({
  hasMM: state.app.hasMM,
  lockedMM: state.app.lockedMM,
  address: state.app.address,
});

Header.propTypes = {
  hasMM: PropTypes.bool.isRequired,
  lockedMM: PropTypes.bool.isRequired,
  address: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
