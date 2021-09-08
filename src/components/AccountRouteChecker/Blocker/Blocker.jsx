import React from 'react';
import PropTypes from 'prop-types';
import t from 'translate';

import WalletIcon from '../../Common/Icons/WalletIcon';
import './Blocker.scss';

const Blocker = ({ text }) => (
  <div className="blocker-wrapper">
    <div className="width-container">
      <WalletIcon />
      <div className="block-text">{ t(text) }</div>
    </div>
  </div>
);

Blocker.defaultProps = {
  text: 'wallet.blocker',
};

Blocker.propTypes = {
  text: PropTypes.string,
};

export default Blocker;
