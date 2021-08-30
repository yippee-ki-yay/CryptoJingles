import React, { useMemo } from 'react';
import { getInPageProviderName } from 'services/walletService';
import ConnectWalletWithProvider from './ConnectWalletWithProvider/ConnectWalletWithProvider';
import ConnectWalletNoProvider from './ConnectWalletNoProvider/ConnectWalletNoProvider';

import './ConnectWalletButtons.scss';

const ConnectWalletButtons = () => {
  const noProvider = !window.ethereum && !window.web3?.currentProvider;

  return (
    <div className="wallet-provider-wrapper">
      { noProvider ? <ConnectWalletNoProvider /> : <ConnectWalletWithProvider /> }
    </div>
  );
};

ConnectWalletButtons.propTypes = {};

export default ConnectWalletButtons;
