import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { normalLogin } from 'redux/actions/walletActions';
import clsx from 'clsx';
import { getSupportedWallets } from '../../../constants/wallet';
import ThreeDotsLoader from '../../Common/ThreeDotsLoader/TreeDotsLoader';

import './ConnectWalletWithProvider.scss';

const ConnectWalletWithProvider = ({ normalLogin, connectingWallet, connectingWalletAccountType }) => {
  let options = getSupportedWallets();

  if (connectingWallet) options = options.filter(({ connectionType }) => connectionType === connectingWalletAccountType);
  return (
    <div className="connect-wallet-buttons-wrapper">
      {
        options.map(({
          Icon, label, value, connectionType,
        }) => (
          <div
            key={label}
            className={clsx('wallet-wrapper', { [value]: value, connecting: connectingWallet })}
            onClick={() => { normalLogin(connectionType); }}
          >
            <div className="wallet-name">{label}</div>
            { connectingWallet ? <ThreeDotsLoader white big /> : <Icon /> }
          </div>
        ))
      }
    </div>
  );
};

ConnectWalletWithProvider.propTypes = {
  normalLogin: PropTypes.func.isRequired,
  connectingWallet: PropTypes.bool.isRequired,
  connectingWalletAccountType: PropTypes.string.isRequired,
};

const mapStateToProps = ({ app }) => ({
  connectingWallet: app.connectingWallet,
  connectingWalletAccountType: app.connectingWalletAccountType,
});

const mapDispatchToProps = { normalLogin };

export default connect(mapStateToProps, mapDispatchToProps)(ConnectWalletWithProvider);
