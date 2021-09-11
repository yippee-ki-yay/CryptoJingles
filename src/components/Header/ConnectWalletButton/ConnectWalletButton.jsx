import React, { useCallback, useMemo } from 'react';
import { connect } from 'react-redux';
import { openWalletModal } from 'redux/actions/modalActions';
import PropTypes from 'prop-types';
import { shortenAddress } from '../../../services/utilsService';
import { getSupportedWallets } from '../../../constants/wallet';
import ThreeDotsLoader from '../../Common/ThreeDotsLoader/TreeDotsLoader';

import './ConnectWalletButton.scss';

const ConnectWalletButton = ({
  openWalletModal, address, connectingWalletProvider, toConnectText, closeMenu,
}) => {
  const isConnected = useMemo(() => address, [address]);

  const handleClick = useCallback(() => {
    openWalletModal(true);
    closeMenu(false);
  }, [openWalletModal, closeMenu]);

  const shortAddress = shortenAddress(address);

  const { Icon } = (getSupportedWallets())[0];

  return (
    <div className="connect-wallet-wrapper">
      <button type="button" onClick={handleClick} className="button medium wallet">
        {
          isConnected ?
            (
              <div className="wallet-is-connected">
                <div className="short-address">{shortAddress}</div>
                <div className="icon-status-wrapper">
                  <div className="icon-wrapper"><Icon /></div>
                </div>
              </div>
            )
            :
            connectingWalletProvider ?
              <ThreeDotsLoader />
              :
              toConnectText || 'Connect Wallet'
        }
      </button>
    </div>
  );
};

ConnectWalletButton.defaultProps = {
  address: '',
  toConnectText: '',
  connectingWalletProvider: false,
  closeMenu: () => () => {},
};

ConnectWalletButton.propTypes = {
  openWalletModal: PropTypes.func.isRequired,
  address: PropTypes.string,
  toConnectText: PropTypes.string,
  connectingWalletProvider: PropTypes.bool,
  closeMenu: PropTypes.func,
};

const mapStateToProps = ({ app }) => ({
  address: app.address,
  connectingWalletProvider: app.connectingWalletProvider,
});

const mapDispatchToProps = {
  openWalletModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ConnectWalletButton);
