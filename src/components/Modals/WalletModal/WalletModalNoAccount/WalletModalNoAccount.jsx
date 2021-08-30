import React from 'react';
import PropTypes from 'prop-types';
import trans from 'translate';
import { connect } from 'react-redux';
import { MESSAGE_BOX_TYPES } from 'constants/general';
import ModalBody from '../../ModalBody';
import MessageBox from '../../../Common/MessageBox/MessageBox';
import ConnectWalletButtons from '../../../ConnectWalletButtons/ConnectWalletButtons';

import './WalletModalNoAccount.scss';

const WalletModalNoAccount = ({
  closeModal, connectingWalletProviderError,
}) => (
  <div className="wallet-modal-no-account-wrapper">
    <ModalBody closeModal={closeModal} title={trans('wallet_modal.not_connected')}>

      <ConnectWalletButtons />

      <div className="new-to-eth">
        {
          trans('modal.new_to_eth', { link: (chunk) => (<a href="https://ethereum.org/en/wallets/" className="link" target="_blank" rel="noopener noreferrer">{chunk}</a>) })
        }
      </div>

      {
        connectingWalletProviderError && (
          <MessageBox type={MESSAGE_BOX_TYPES.ERROR}>
            { connectingWalletProviderError }
          </MessageBox>
        )
      }
    </ModalBody>
  </div>
);

WalletModalNoAccount.propTypes = {
  closeModal: PropTypes.func.isRequired,
  connectingWalletProviderError: PropTypes.string.isRequired,
};

const mapStateToProps = ({ app }) => ({
  connectingWallet: app.connectingWallet,
  connectingWalletProviderError: app.connectingWalletProviderError,
});

export default connect(mapStateToProps)(WalletModalNoAccount);
