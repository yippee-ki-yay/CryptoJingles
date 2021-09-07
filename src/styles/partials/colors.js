const PALLET = {
  brown: '#8D6752',
  brownHover: '#b28e7a',

  brown2: '#3C3D3C',

  brown3: '#8D6752',
  brown3Hover: '#b28e7a',

  white: '#fff',
  whiteHover: '#bfbfbf',
  whiteDisabled: '#b3b3b3',

  red: '#FF6B6B',
  red2: '#FF8989',
  redOpacity: 'rgba(255, 107, 107, 0.2)',

  green: '#16C79A',
  greenHover: '#29e7b7',

  black: '#000',
  blackHover: 'rgba(0, 0, 0, 0.5)',
  blackLight: 'rgba(0, 0, 0, 0.15)',

  gray: '#A5A5A5',
  grayHover: '#fff',

  gray2: '#4b4c56',
  gray3: '#313131',
  gray4: '#2D2E34',
  gray5: '#494949',
  gray6: '#656565',
  darkGray: '#27282D',
  darkGrayHover: '#656565',
  darkGray2: '#212227',
};

export default {
  main: {
    '--link': PALLET.black,
    '--link-hover': PALLET.blackHover,

    '--connect-wallet-button': PALLET.black,
    '--connect-wallet-button-bg': PALLET.white,
    '--connect-wallet-button-border': PALLET.darkGray,
    '--connect-wallet-button-hovered': PALLET.whiteHover,
    '--connect-wallet-button-connected': PALLET.green,
    '--connect-wallet-button-disconnected': PALLET.gray5,

    '--button-white': PALLET.white,
    '--button-red': PALLET.red,
    '--button-red-hover': PALLET.red2,

    '--wallet-connect-modal-new-to-eth-link': PALLET.white,
    '--wallet-connect-modal-new-to-eth-link-hover': PALLET.whiteHover,

    '--header-navicon': PALLET.black,
    '--header-border': PALLET.gray,
    '--header-navicon-bg': PALLET.white,
    '--header-navicon-hover': PALLET.blackHover,
    '--header-links-mobile-bg': PALLET.white,

    '--box-item-box-shadow': PALLET.blackLight,

    // OLD

    '--color-main': PALLET.brown,
    '--color-bg': PALLET.darkGray2,
    '--color-bg-hover': PALLET.darkGrayHover,
    '--color-title': PALLET.white,

    '--color-link': PALLET.green,
    '--color-link-hover': PALLET.greenHover,

    '--color-button': PALLET.white,
    '--color-button-hover': PALLET.whiteHover,

    '--header-box': PALLET.white,

    '--footer-text': PALLET.gray,

    '--modal-box-shadow': PALLET.black,
    '--modal-box-bgd': PALLET.darkGray,
    '--modal-header-title': PALLET.white,
    '--modal-header-close': PALLET.gray,
    '--modal-header-line': PALLET.gray3,
    '--modal-provider-bgd': PALLET.gray4,
    '--modal-white': PALLET.white,
    '--modal-gray': PALLET.gray,

    '--message-box-text': PALLET.white,
    '--message-box-error-bgd': PALLET.red,
    '--message-box-success-bgd': PALLET.green,
    '--message-box-status-icon-border': PALLET.white,

    '--tooltip-bg-before': PALLET.gray2,
    '--tooltip-bg': PALLET.darkGray,
    '--tooltip-bg-border': PALLET.brown,
    '--tooltip-text': PALLET.white,

    '--loader-circle': PALLET.white,

    '--header-link': PALLET.brown3,
    '--header-link-hover': PALLET.brown3Hover,

    '--box-item-bg': PALLET.darkGray,
    '--box-item-title': PALLET.brown,
    '--box-item-value': PALLET.white,
    '--box-item-value-err': PALLET.red,
    '--box-item-small-num': PALLET.gray,
    '--box-item-small-num-error': PALLET.red,
    '--box-item-small-num-border': PALLET.gray3,
    '--box-item-additional': PALLET.white,

    '--input-bg': PALLET.gray4,
    '--input-text': PALLET.white,
    '--input-text-placeholder': PALLET.gray6,
    '--input-text-label': PALLET.gray6,
    '--input-label': PALLET.brown,
    '--input-label-hover': PALLET.brownHover,
    '--input-max-loading': PALLET.white,
    '--input-max-error': PALLET.red,
    '--input-max-label': PALLET.green,
    '--input-max-label-hover': PALLET.greenHover,
    '--input-max-label-disabled': PALLET.gray,
    '--input-error-border': PALLET.red,
    '--input-error-bg': PALLET.redOpacity,
    '--input-error-text': PALLET.red2,

    '--graph-bg': PALLET.darkGray,
    '--graph-axis': PALLET.brown2,
    '--graph-line': PALLET.green,
    '--graph-title': PALLET.brown,
    '--graph-switcher': PALLET.white,
    '--graph-switcher-border': PALLET.brown,
    '--graph-switcher-active': PALLET.brown,
    '--graph-points': PALLET.brown,
    '--graph-tooltip-top': PALLET.gray,
    '--graph-tooltip-title': PALLET.brown,
    '--graph-tooltip-value': PALLET.white,

    '--single-wrap-button': PALLET.green,
    '--single-wrap-button-hover': PALLET.greenHover,

    '--join-text': PALLET.white,
    '--join-general': PALLET.gray,

    '--form-submit-bg': PALLET.green,
    '--form-submit-bg-hover': PALLET.greenHover,
    '--form-submit-disabled': PALLET.gray,
    '--forms-rewards-box-bg': PALLET.gray4,
  },
};
