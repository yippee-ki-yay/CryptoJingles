import {
  CONNECT_WALLET_START,
  CONNECT_WALLET_END,

  CONNECT_WALLET_PROVIDER,
  CONNECT_WALLET_PROVIDER_SUCCESS,
  CONNECT_WALLET_PROVIDER_FAILURE,

  CLEAR_ACCOUNT,
} from 'redux/actionTypes/walletActionTypes';
import { ADD_PENDING_TX, REMOVE_PENDING_TX, INIT_APP } from '../constants/actionTypes';
import { LS_ACCOUNT } from '../constants/general';

const lsAccountType = localStorage.getItem(LS_ACCOUNT);

const INITIAL_STATE = {
  pendingTxs: [],
  address: '',
  hasMM: !!window.ethereum,
  lockedMM: true,
  canLike: false,

  connectingWallet: false,
  connectingWalletAccountType: '',

  connectingWalletProvider: false,
  connectingWalletProviderError: '',

  accountType: lsAccountType || '',
};

export default (state = INITIAL_STATE, action) => {
  const { payload, type } = action;
  switch (type) {
  case ADD_PENDING_TX:
    return { ...state, pendingTxs: [...state.pendingTxs, payload] };
  case REMOVE_PENDING_TX:
    return { ...state, pendingTxs: payload };

  case CONNECT_WALLET_START:
    return { ...state, connectingWallet: true, connectingWalletAccountType: payload };

  case CONNECT_WALLET_END:
    return { ...state, connectingWallet: false, connectingWalletAccountType: '' };

  case CONNECT_WALLET_PROVIDER:
    return { ...state, connectingWalletProvider: true, connectingWalletProviderError: '' };

  case CONNECT_WALLET_PROVIDER_SUCCESS:
    return {
      ...state,
      connectingWalletProvider: false,
      connectingWalletProviderError: '',
      lockedMM: false,
      ...payload,
    };

  case CONNECT_WALLET_PROVIDER_FAILURE:
    return {
      ...state,
      connectingWalletProvider: false,
      connectingWalletProviderError: payload,
    };

  case CLEAR_ACCOUNT:
    return {
      ...state, address: '', accountType: '', lockedMM: true,
    };

  default:
    return state;
  }
};
