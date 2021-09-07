import { wrappedOGJingleContract } from './contractsRegistryService';

export const getAllV1UserJingles = async (address) => {
  const contract = await wrappedOGJingleContract();

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

export const wrapJingle = () => {};
