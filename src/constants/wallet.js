import { getInPageProviderName } from 'services/walletService';
import BrowserIcon from '../components/Common/Icons/ProviderIcons/BrowserIcon';
import imTokenIcon from '../components/Common/Icons/ProviderIcons/imTokenIcon';
import StatusIcon from '../components/Common/Icons/ProviderIcons/StatusIcon';
import CoinbaseIcon from '../components/Common/Icons/ProviderIcons/CoinbaseIcon';
import OperaIcon from '../components/Common/Icons/ProviderIcons/OperaIcon';
import TokenaryIcon from '../components/Common/Icons/ProviderIcons/TokenaryIcon';
import TrustIcon from '../components/Common/Icons/ProviderIcons/TrustIcon';
import MathWalletIcon from '../components/Common/Icons/ProviderIcons/MathWalletIcon';
import SafePalIcon from '../components/Common/Icons/ProviderIcons/SafePalIcon';
import TokenPocketIcon from '../components/Common/Icons/ProviderIcons/TokenPocketIcon';
import MetaMaskIcon from '../components/Common/Icons/ProviderIcons/MetaMaskIcon';

export const WALLET_TYPES = {
  inPageProvider: 'inPageProvider',
};

export const inPageProviderIconSwitcher = (providerName) => {
  switch (providerName) {
  case 'MetaMask':
    return MetaMaskIcon;

  case 'Status':
    return StatusIcon;

  case 'imToken':
    return imTokenIcon;

  case 'Trust':
    return TrustIcon;

  case 'Coinbase':
    return CoinbaseIcon;

  case 'Tokenary':
    return TokenaryIcon;

  case 'Opera':
    return OperaIcon;

  case 'Math Wallet':
    return MathWalletIcon;

  case 'SafePal':
    return SafePalIcon;

  case 'TokenPocket':
    return TokenPocketIcon;

  default:
    return BrowserIcon;
  }
};

const providerNameToValue = (providerName) => {
  switch (providerName) {
  case 'MetaMask':
    return 'MetaMask';

  case 'Status':
    return 'Status';

  case 'imToken':
    return 'imToken';

  case 'Trust':
    return 'Trust';

  case 'Coinbase':
    return 'Coinbase';

  case 'Tokenary':
    return 'Tokenary';

  case 'Opera':
    return 'Opera';

  case 'Math Wallet':
    return 'MathWallet';

  case 'SafePal':
    return 'SafePal';

  case 'TokenPocket':
    return 'TokenPocket';

  default:
    return 'Browser';
  }
};

export const getSupportedWallets = () => {
  const providerName = getInPageProviderName();
  return [
    {
      label: providerName,
      value: providerNameToValue(providerName),
      Icon: inPageProviderIconSwitcher(providerName),
      connectionType: WALLET_TYPES.inPageProvider,
      mobile: true,
    },
  ];
};

export const WALLET_KEYS_TO_NAME = {
  metamask: 'MetaMask',
  trust: 'Trust',
  mathWallet: 'Math Wallet',
  safePal: 'SafePal',
  tokenPocket: 'TokenPocket',
  binance: 'Binance Chain Wallet',
};

export const NOT_SUPPORTED_WALLETS_LINKS = {
  mobile: {
    metamask: {
      iOS: 'https://apps.apple.com/us/app/metamask/id1438144202?_branch_match_id=863004636459437586',
      Android: 'https://play.google.com/store/apps/details?id=io.metamask&hl=en_US&ref=producthunt&_branch_match_id=863004636459437586',
    },
    trust: {
      iOS: 'https://apps.apple.com/us/app/trust-crypto-bitcoin-wallet/id1288339409',
      Android: 'https://play.google.com/store/apps/details?id=com.wallet.crypto.trustapp&hl=en&gl=US',
    },
    mathWallet: {
      iOS: 'https://apps.apple.com/us/app/math-wallet-blockchain-wallet/id1383637331',
      Android: 'https://play.google.com/store/apps/details?id=com.medishares.android&hl=en&gl=US',
    },
    safePal: {
      iOS: 'https://apps.apple.com/us/app/safepal-crypto-wallet-btc/id1449232593',
      Android: 'https://play.google.com/store/apps/details?id=io.safepal.wallet&hl=en&gl=US',
    },
    tokenPocket: {
      iOS: 'https://apps.apple.com/us/app/tokenpocket/id1436028697',
      Android: 'https://play.google.com/store/apps/details?id=vip.mytokenpocket&hl=en&gl=US',
    },
  },
  browser: {
    metamask: {
      Chrome: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
      Firefox: 'https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/',
      Brave: 'https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn',
      Edge: 'https://microsoftedge.microsoft.com/addons/detail/metamask/ejbalbakoplchlghecdalmeeeajnimhm?hl=en-US',
    },
    mathWallet: {
      Chrome: 'https://chrome.google.com/webstore/detail/math-wallet/afbcbjpbpfadlkmhmclhkeeodmamcflc?hl=en',
    },
  },
};
