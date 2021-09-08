import config from 'configurations/config.json';
import trans from 'translate';
import {
  getAccount,
  isInPageProviderApproved,
  nameOfNetwork,
  getInPageProviderName,
} from 'services/walletService';
import { setupWeb3, setWeb3toInPageProvider } from 'services/web3Service';
import {
  CONNECT_WALLET_START,
  CONNECT_WALLET_END,

  CONNECT_WALLET_PROVIDER,
  CONNECT_WALLET_PROVIDER_SUCCESS,
  CONNECT_WALLET_PROVIDER_FAILURE,

  CLEAR_ACCOUNT,
} from 'redux/actionTypes/walletActionTypes';
import { WALLET_TYPES } from '../../constants/wallet';
import { LS_ACCOUNT } from '../../constants/general';
import { closeModal } from './modalActions';
import { wait } from '../../services/utilsService';

/**
 * Tries to connect to the in page injected web3 provider, also checks if the app is pre-approved
 *
 * @param silent {Boolean}
 *
 * @return {Function}
 */
export const loginInPageProvider = (silent) => async (dispatch, getState) => {
  const accountType = WALLET_TYPES.inPageProvider;

  dispatch({ type: CONNECT_WALLET_PROVIDER });

  try {
    const inPageProviderApproved = await isInPageProviderApproved();

    if (silent && !inPageProviderApproved) throw new Error(trans('errors.provider_not_approved', { accountType: getInPageProviderName() }));

    const network = await setWeb3toInPageProvider();
    const address = await getAccount();

    dispatch({
      type: CONNECT_WALLET_PROVIDER_SUCCESS,
      payload: { address: '0xc1ef465527343f68bb1841f99b9adeb061cc7ac9', accountType, network },
    });

    localStorage.setItem(LS_ACCOUNT, WALLET_TYPES.inPageProvider);
  } catch (err) {
    let errorMessage = err.message || '';

    if (errorMessage.includes(('no_accounts_locked'))) errorMessage = trans(errorMessage);
    else if (errorMessage.includes('User rejected the request')) errorMessage = trans('errors.denied_login');
    else if (errorMessage.includes('wallet address undefined')) errorMessage = trans('errors.no_accounts_locked');
    else if (errorMessage.includes('wrong-network')) {
      errorMessage = trans('errors.wrong_network', { network: nameOfNetwork(config.network) });
    }

    if (!getState().app.address) {
      dispatch({ type: CLEAR_ACCOUNT });
      setupWeb3();
    }

    dispatch({ type: CONNECT_WALLET_PROVIDER_FAILURE, payload: errorMessage });

    if (!silent) throw new Error(errorMessage);
  }
};

const postLogin = () => () => {};

/**
 * Tries not silent login for the selected account type
 *
 * @param accountType {String}
 *
 * @return {Function}
 */
export const normalLogin = (accountType) => async (dispatch, getState) => {
  dispatch({ type: CONNECT_WALLET_START, payload: accountType });
  // await wait(500000);
  try {
    switch (accountType) {
    case WALLET_TYPES.inPageProvider: {
      await dispatch(loginInPageProvider(false));
      break;
    }

    default:
      return false;
    }
  } catch (err) {
    setupWeb3();
  }

  if (getState().app.address) await dispatch(postLogin());

  dispatch({ type: CONNECT_WALLET_END });
};

/**
 * If the user has already once successfully added an account this will
 * try a silent login for that account type.
 *
 * @return {Function}
 */
export const silentLogin = () => async (dispatch, getState) => {
  const { accountType, connectingWallet, address } = getState().app;
  if (!accountType || connectingWallet || address) return;

  dispatch({ type: CONNECT_WALLET_START, payload: accountType });

  try {
    switch (accountType) {
    case WALLET_TYPES.inPageProvider: {
      await dispatch(loginInPageProvider(true));
      break;
    }

    default:
      return false;
    }
  } catch (err) {
    setupWeb3();
  }

  if (getState().app.address) await dispatch(postLogin());

  dispatch({ type: CONNECT_WALLET_END });
};

export const logOut = () => (dispatch) => {
  dispatch({ type: CLEAR_ACCOUNT });
  localStorage.removeItem(LS_ACCOUNT);
};

/**
 * Listens to account change and reloads the page if there is no account or
 * the account changes
 *
 * @return {Function}
 */
export const listenToAccChange = () => (dispatch, getState) => {
  if (window.ethereum) window.ethereum.autoRefreshOnNetworkChange = false;
  if (window.ethereum?.on) {
    window.ethereum.on('accountsChanged', async (accounts) => {
      const { address, connectingWallet, accountType } = getState().app;
      const { modalType } = getState().modal;

      if (connectingWallet) return;

      if (accountType !== WALLET_TYPES.inPageProvider) return;

      if (modalType !== '') {
        dispatch(closeModal());
        await wait(500);
      }

      if (address && !accounts[0]) dispatch(logOut());
      if (accounts[0] !== address && await isInPageProviderApproved()) dispatch(loginInPageProvider(false));
    });

    window.ethereum.on('chainChanged', async () => {
      const { connectingWallet, accountType } = getState().app;
      if (connectingWallet) return;

      if (accountType === WALLET_TYPES.inPageProvider && await isInPageProviderApproved()) {
        dispatch(loginInPageProvider(false));
      }
    });
  } else {
    const interval = setInterval(async () => {
      const { address, connectingWallet, accountType } = getState().app;

      if (connectingWallet) return;
      if (accountType !== WALLET_TYPES.inPageProvider) {
        return clearInterval(interval);
      }

      const accounts = await window._web3.eth.getAccounts();

      if (address && !accounts[0]) window.location.reload();
      if (accounts[0] !== address) loginInPageProvider(false);
    }, 1000);
  }
};
