import React, { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { logOut } from 'redux/actions/walletActions';
import ModalBody from '../../ModalBody';
import { getSupportedWallets } from '../../../../constants/wallet';
import TooltipWrapper from '../../../Common/TooltipNumberWrapper/TooltipWrapper';
import TooltipNumberWrapper from '../../../Common/TooltipNumberWrapper/TooltipNumberWrapper';

import './WalletModalConnected.scss';

const WalletModalConnected = ({
  closeModal, account, accountType,
  // logOut,
}) => {
  const walletInfo = getSupportedWallets().find(({ connectionType }) => connectionType === accountType);
  const formattedAddress = useMemo(() => `${account.slice(0, 5)}...${account.slice(-5)} `, [account]);

  return (
    <div className="wallet-modal-connected-wrapper">
      <ModalBody closeModal={closeModal} title="common.account">
        <div className="wallet-modal-connected">
          <div className="provider-wrapper">
            {/* { trans('wallet_modal.connected_with', { provider: walletInfo.value }) } */}
            {'wallet_modal.connected_with'}
          </div>
          <div className="wallet">
            <div className="wallet-icon"><walletInfo.Icon /></div>
            <div className="wallet-acc"><TooltipWrapper copy={false} title={account}>{formattedAddress}</TooltipWrapper></div>
          </div>
          <div className="links-wrapper">
            <div className="modal-link"><TooltipWrapper title={account}>modal.copy_address</TooltipWrapper></div>
            <a className="modal-link" target="_blank" rel="noopener noreferrer" href={`https://etherscan.io/address/${account}`}>
              modal.eth_scan
            </a>
          </div>
          {/* <button type="button" onClick={logOut} className="button disconnect"> */}
          {/*  { trans('modal.disconnect_wallet') } */}
          {/* </button> */}
        </div>
      </ModalBody>
    </div>
  );
};

WalletModalConnected.defaultProps = {
  accountType: '',
  account: '',
};

WalletModalConnected.propTypes = {
  closeModal: PropTypes.func.isRequired,
  accountType: PropTypes.string,
  account: PropTypes.string,
  // logOut: PropTypes.func.isRequired,
};

const mapStateToProps = ({ wallet, assets }) => ({
  connectingWallet: wallet.connectingWallet,
  accountType: wallet.accountType,
  account: wallet.account,
});

const mapDispatchToProps = {
  // logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(WalletModalConnected);
