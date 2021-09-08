import { JingleV1ViewContract, WrappedNewJinglesContract, WrappedOGJinglesContract } from './contractsRegistryService';
import { NUM_V0_OG_JINGLES, NUM_V1_OG_JINGLES } from '../constants/general';
import callTx from './txService';

export const getAllV1UserJingles = async (address) => {
  const contract = await JingleV1ViewContract();

  const res = await contract.methods.getFullJingleDataForUser(address).call();
  // TODO - change jingleId everywhere
  return res.map((jingle) => ({
    ...jingle,
    jingleId: parseInt(jingle.id, 10),
    version: 1,
    liked: false,
    likeCount: 0,
    price: parseFloat(jingle.price),
    type: '',
  }));
};

export const getAllV0UserJingles = (address) => [];

// set wrapped prop or for these 2 methods
export const getAllOgWrappedUserJingles = (address) => [];

export const getAllNewWrappedUserJingles = (address) => [];

export const wrapJingle = async (id, version, address, isOg) => {
  const contractCreator = isOg ? WrappedOGJinglesContract : WrappedNewJinglesContract;
  const contract = await contractCreator();

  return callTx(contract, 'wrap', [id, version], { from: address });
};

export const unwrapJingle = async (id, version, address, isOg) => {
  const contractCreator = isOg ? WrappedOGJinglesContract : WrappedNewJinglesContract;
  const contract = await contractCreator();

  return callTx(contract, 'unwrap', [id, version], { from: address });
};

export const filterOGJingles = (jingles) => jingles.filter(({ jingleId, version, wrapped }) => {
  const isV0OG = version === 0 && jingleId < NUM_V0_OG_JINGLES;
  const isV1OG = version === 1 && jingleId < NUM_V1_OG_JINGLES;

  return (isV0OG || isV1OG) && !wrapped;
});

export const filterNonOGJingles = (jingles) => jingles.filter(({ jingleId, wrapped, version }) => version === 1 && jingleId >= NUM_V1_OG_JINGLES && !wrapped);
