export const APPROVE_TYPES = {
  WRAPPING: 'wrapping',
};

export const DEFAULT_ASSET = {
  symbol: '?',
  label: '',
  decimals: 18,
  address: '0x0',
  icon: () => {},
};

export const SINGLE_ASSETS = [
  {
    ...DEFAULT_ASSET,
    symbol: 'ETH',
    label: 'ETH',
  },
];

export const ASSETS = [
  ...SINGLE_ASSETS,
];
