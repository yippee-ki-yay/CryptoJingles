import { JingleV1ViewContract } from './contractsRegistryService';
import { NUM_V0_OG_JINGLES, NUM_V1_OG_JINGLES } from '../constants/general';

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

export const getAllV0UserJingles = async (address) => {
  const res = await getAllV1UserJingles(address);
  return res.map((jingle) => ({ ...jingle, version: 0 }));
};

export const wrapJingle = () => {};

export const filterOGJingles = (jingles) => jingles.filter(({ jingleId, version }) => {
  const isV0OG = version === 0 && jingleId < NUM_V0_OG_JINGLES;
  const isV1OG = version === 1 && jingleId < NUM_V1_OG_JINGLES;

  return isV0OG || isV1OG;
});

export const filterNonOGJingles = (jingles) => jingles.filter(({ jingleId, version }) => {
  const isV0OG = version === 0 && jingleId >= NUM_V0_OG_JINGLES;
  const isV1OG = version === 1 && jingleId >= NUM_V1_OG_JINGLES;

  return isV0OG || isV1OG;
});
