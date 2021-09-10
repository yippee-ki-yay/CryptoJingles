import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import clsx from 'clsx';
import Logo from '../Decorative/Logo';
import ConnectWalletButton from './ConnectWalletButton/ConnectWalletButton';

import './Header.scss';

const Header = ({ address }) => {
  const [checked, setChecked] = useState(false);

  const profileLink = useMemo(() => {
    if (!address) return '/no-profile';
    return `/profile/${address}`;
  }, [address]);

  const changeCheckedCallback = useCallback(() => { setChecked(!checked); }, [checked, setChecked]);
  const onChangeCallback = useCallback(() => {}, []);
  const closeMenu = useCallback(() => { if (checked) setChecked(false); }, [checked, setChecked]);

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
              <NavLink activeClassName="active" onClick={closeMenu} to="/explore">Explore</NavLink>
              <NavLink activeClassName="active" onClick={closeMenu} to="/marketplace">Marketplace</NavLink>
              <NavLink activeClassName="active" onClick={closeMenu} to="/compose">Compose</NavLink>
              <NavLink activeClassName="active" onClick={closeMenu} to="/wrap-jingle">Wrap Jingles</NavLink>
              <NavLink activeClassName="active" onClick={closeMenu} to={profileLink}>Profile</NavLink>
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
