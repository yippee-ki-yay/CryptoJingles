import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import clsx from 'clsx';
import Logo from '../Decorative/Logo';
import ConnectWalletButton from './ConnectWalletButton/ConnectWalletButton';

import './Header.scss';

const Header = ({ address }) => {
  const [checked, setChecked] = useState(false);

  const changeCheckedCallback = useCallback(() => { setChecked(!checked); }, [checked, setChecked]);
  const onChangeCallback = useCallback(() => {}, []);

  return (
    <header className="header-wrapper">
      <div className={clsx('width-container', { checked })}>
        <Link to="/" className="logo-wrapper">
          <Logo /> Crypto Jingles
        </Link>

        <div className="mobile-wrapper">
          <input className="menu-btn" type="checkbox" id="menu-btn" checked={checked} onChange={onChangeCallback} />
          <label className="menu-icon" htmlFor="menu-btn" onClick={changeCheckedCallback}><span className="navicon" /></label>

          <div className="links-container">
            <div className="links-wrapper">
              <NavLink activeClasssName="active" to="/wrap-jingle">Wrap Jingles</NavLink>
              <NavLink activeClasssName="active" to="/compose">Compose</NavLink>
              <NavLink activeClasssName="active" to="/marketplace">Marketplace</NavLink>
              { address && (<NavLink activeClasssName="active" to={`/profile/${address}`}>Profile</NavLink>) }
            </div>

            <ConnectWalletButton closeMenu={setChecked} />
          </div>
        </div>
      </div>
    </header>
  );
};

const mapStateToProps = (state) => ({
  address: state.app.address,
});

Header.propTypes = {
  address: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
