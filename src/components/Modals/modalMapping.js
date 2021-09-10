import {
  WALLET_MODAL,
  EDIT_AUTHOR_NAME_MODAL,
} from './modalTypes';
import WalletModal from './WalletModal/WalletModal';
import EditAuthorNameModal from './EditAuthorNameModal/EditAuthorNameModal';

export default {
  [WALLET_MODAL]: WalletModal,
  [EDIT_AUTHOR_NAME_MODAL]: EditAuthorNameModal,
};
