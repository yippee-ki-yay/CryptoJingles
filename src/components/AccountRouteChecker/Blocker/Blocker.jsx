import React from 'react';
import PropTypes from 'prop-types';

import WalletIcon from '../../Common/Icons/WalletIcon';
import './Blocker.scss';

const Blocker = () => (
  <div className="blocker-wrapper">
    <div className="width-container">
      <WalletIcon />
      <div className="block-text">In order to enter page please connect your wallet.</div>
    </div>
  </div>
);

Blocker.propTypes = {};

export default Blocker;
