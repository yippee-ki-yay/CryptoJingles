import { ASSETS } from 'constants/assets';
import {
  GET_ASSET_BALANCE_REQUEST,
  GET_ASSET_BALANCE_SUCCESS,
  GET_ASSET_BALANCE_FAILURE,

  GET_IS_ADDRESS_APPROVED_ON_ASSET_REQUEST,
  GET_IS_ADDRESS_APPROVED_ON_ASSET_SUCCESS,
  GET_IS_ADDRESS_APPROVED_ON_ASSET_FAILURE,

  APPROVE_ADDRESS_ON_ASSET_REQUEST,
  APPROVE_ADDRESS_ON_ASSET_SUCCESS,
  APPROVE_ADDRESS_ON_ASSET_FAILURE,

  GET_ASSET_PRICE_REQUEST,
  GET_ASSET_PRICE_SUCCESS,
  GET_ASSET_PRICE_FAILURE,
} from 'redux/actionTypes/assetsActionTypes';
import { CLEAR_ACCOUNT, CONNECT_WALLET_PROVIDER_SUCCESS } from 'redux/actionTypes/walletActionTypes';

const INITIAL_SINGLE_ASSET_STATE = {
  balance: '0',
  prices: {},
};

const INITIAL_STATE = ASSETS.reduce((acc, t) => {
  acc[t.symbol] = INITIAL_SINGLE_ASSET_STATE;

  return acc;
}, {});

export default (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
  case GET_ASSET_BALANCE_REQUEST:
    return {
      ...state,
      [action.asset]: { ...state[action.asset], gettingBalance: true, gettingBalanceError: '' },
    };

  case GET_ASSET_BALANCE_SUCCESS:
    return {
      ...state,
      [action.asset]: {
        ...state[action.asset],
        gettingBalance: false,
        gettingBalanceError: '',
        balance: payload,
      },
    };

  case GET_ASSET_BALANCE_FAILURE:
    return {
      ...state,
      [action.asset]: {
        ...state[action.asset],
        gettingBalance: false,
        gettingBalanceError: payload,
      },
    };

  case GET_IS_ADDRESS_APPROVED_ON_ASSET_REQUEST:
    return {
      ...state,
      [action.asset]: {
        ...state[action.asset],
        [action.gettingPropName]: true,
        [`${action.gettingPropName}Error`]: '',
      },
    };

  case GET_IS_ADDRESS_APPROVED_ON_ASSET_SUCCESS:
    return {
      ...state,
      [action.asset]: {
        ...state[action.asset],
        [action.gettingPropName]: false,
        [`${action.gettingPropName}Error`]: '',
        [action.isApprovedPropName]: payload,
      },
    };

  case GET_IS_ADDRESS_APPROVED_ON_ASSET_FAILURE:
    return {
      ...state,
      [action.asset]: {
        ...state[action.asset],
        [action.gettingPropName]: true,
        [`${action.gettingPropName}Error`]: payload,
      },
    };

  case APPROVE_ADDRESS_ON_ASSET_REQUEST:
    return {
      ...state,
      [action.asset]: {
        ...state[action.asset],
        [action.account]: {
          ...state[action.asset][action.account],
          [action.propName]: true,
          [`${action.propName}Error`]: '',
        },
      },
    };

  case APPROVE_ADDRESS_ON_ASSET_SUCCESS:
    return {
      ...state,
      [action.asset]: {
        ...state[action.asset],
        [action.isApprovedPropName]: true,

        [action.account]: {
          ...state[action.asset][action.account],
          [action.propName]: false,
          [`${action.propName}Error`]: '',
        },
      },
    };

  case APPROVE_ADDRESS_ON_ASSET_FAILURE:
    return {
      ...state,
      [action.asset]: {
        ...state[action.asset],
        [action.account]: {
          ...state[action.asset][action.account],
          [action.propName]: false,
          [`${action.propName}Error`]: payload,
        },
      },
    };

  case GET_ASSET_PRICE_REQUEST:
    return {
      ...state,
      [action.asset]: {
        ...state[action.asset],
        prices: {
          ...state[action.asset].prices,
          [action.currency]: {
            ...(state[action.asset].prices[action.currency] || {}),
            gettingPrice: true,
            gettingPriceError: '',
          },
        },
      },
    };

  case GET_ASSET_PRICE_SUCCESS:
    return {
      ...state,
      [action.asset]: {
        ...state[action.asset],
        prices: {
          ...state[action.asset].prices,
          [action.currency]: {
            ...(state[action.asset].prices[action.currency] || {}),
            gettingPrice: false,
            gettingPriceError: '',
            price: payload,
          },
        },
      },
    };

  case GET_ASSET_PRICE_FAILURE:
    return {
      ...state,
      [action.asset]: {
        ...state[action.asset],
        prices: {
          ...state[action.asset].prices,
          [action.currency]: {
            ...(state[action.asset].prices[action.currency] || {}),
            gettingPrice: false,
            gettingPriceError: payload,
          },
        },
      },
    };

  case CLEAR_ACCOUNT:
  case CONNECT_WALLET_PROVIDER_SUCCESS: {
    const _state = { ...state };

    Object.keys(state).forEach((asset) => {
      const accountKeys = Object.keys(_state[asset]).filter((key) => window._web3.utils.isAddress(key));

      const persistState = accountKeys.reduce((acc, accountKey) => ({
        ...acc,
        [accountKey]: _state[asset][accountKey],
      }), {});

      _state[asset] = { ...persistState, ...INITIAL_SINGLE_ASSET_STATE };
    });

    return _state;
  }

  default:
    return state;
  }
};
