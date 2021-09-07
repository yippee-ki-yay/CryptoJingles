import React from 'react';
import t from 'translate';

import WalletIcon from '../../Common/Icons/WalletIcon';
import './Blocker.scss';

const Blocker = () => (
  <div className="blocker-wrapper">
    <div className="width-container">
      <WalletIcon />
      <div className="block-text">{ t('wallet.blocker') }</div>
    </div>
  </div>
);

export default Blocker;
