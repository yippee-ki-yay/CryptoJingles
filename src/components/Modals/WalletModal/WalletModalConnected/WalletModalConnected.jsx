import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import trans from 'translate';
import { connect } from 'react-redux';
import { logOut } from 'redux/actions/walletActions';
import ModalBody from '../../ModalBody';
import { getSupportedWallets } from '../../../../constants/wallet';
import TooltipWrapper from '../../../Common/TooltipNumberWrapper/TooltipWrapper';

import './WalletModalConnected.scss';

const WalletModalConnected = ({
  closeModal, address, accountType,
  logOut,
}) => {
  const walletInfo = getSupportedWallets().find(({ connectionType }) => connectionType === accountType);
  const formattedAddress = useMemo(() => `${address.slice(0, 5)}...${address.slice(-5)} `, [address]);

  return (
    <div className="wallet-modal-connected-wrapper">
      <ModalBody closeModal={closeModal} title={trans('common.account')}>
        <div className="wallet-modal-connected">
          <div className="provider-wrapper">
            { trans('wallet_modal.connected_with', { provider: walletInfo.value }) }
          </div>
          <div className="wallet">
            <div className="wallet-icon"><walletInfo.Icon /></div>
            <div className="wallet-acc"><TooltipWrapper copy={false} title={address}>{formattedAddress}</TooltipWrapper></div>
          </div>
          <div className="links-wrapper">
            <div className="modal-link"><TooltipWrapper title={address}>{ trans('modal.copy_address') }</TooltipWrapper></div>
            <a className="modal-link" target="_blank" rel="noopener noreferrer" href={`https://etherscan.io/address/${address}`}>
              { trans('modal.eth_scan') }
            </a>
          </div>
          <button type="button" onClick={logOut} className="button disconnect">
            { trans('modal.disconnect_wallet') }
          </button>
        </div>
      </ModalBody>
    </div>
  );
};

WalletModalConnected.defaultProps = {
  accountType: '',
  address: '',
};

WalletModalConnected.propTypes = {
  closeModal: PropTypes.func.isRequired,
  accountType: PropTypes.string,
  address: PropTypes.string,
  logOut: PropTypes.func.isRequired,
};

const mapStateToProps = ({ app, assets }) => ({
  connectingWallet: app.connectingWallet,
  accountType: app.accountType,
  address: app.address,
});

const mapDispatchToProps = {
  logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletModalConnected);
