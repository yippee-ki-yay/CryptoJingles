import {
  JingleAddress,
  JingleV0Address,
} from '../util/config';
import { JingleV0Contract, JingleV1Contract } from '../services/contractsRegistryService';

export const APPROVE_TYPES = {
  WRAPPING_OG: (id) => `WrappingOg${id}`,
  WRAPPING_NON_OG: (id) => `WrappingNonOg${id}`,
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
  {
    ...DEFAULT_ASSET,
    symbol: 'JINGLE_V0',
    label: 'JINGLE_V0',
    fromBlock: 5025886,
    contract: JingleV0Contract,
    address: JingleV0Address,
  },
  {
    ...DEFAULT_ASSET,
    symbol: 'JINGLE_V1',
    label: 'JINGLE_V1',
    fromBlock: 5113554,
    contract: JingleV1Contract,
    address: JingleAddress,
  },
];

export const ASSETS = [
  ...SINGLE_ASSETS,
];
