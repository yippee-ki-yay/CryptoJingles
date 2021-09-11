import {
  JingleV0Contract,
  JingleV0ViewContract,
  JingleV1Contract,
  JingleV1ViewContract,
  MarketplaceV0Contract,
  MarketplaceV1Contract,
  WrappedNewJinglesContract,
  WrappedOGJinglesContract,
} from './contractsRegistryService';
import { NUM_V0_OG_JINGLES, NUM_V1_OG_JINGLES } from '../constants/general';
import callTx from './txService';
import { getJingleMetadata } from '../constants/getMockData';
import {
  JingleAddress,
  MarketplaceAddress,
  MarketplaceV0Address,
  WrappedNewJingleAddress,
  WrappedOGJingleAddress,
} from '../util/config';
import { handleResponse } from './apiService';
import { formatViewJingle } from '../actions/utils';

export const getAllV1UserJingles = async (address) => {
  const contract = await JingleV1ViewContract();

  const res = await contract.methods.getFullJingleDataForUser(address).call();
  return res.map((jingle) => formatViewJingle(1, jingle));
};

export const getAllV0UserJingles = async (address) => {
  const contract = await JingleV0ViewContract();

  const res = await contract.methods.getFullJingleDataForUser(address).call();
  return res.map((jingle) => formatViewJingle(0, jingle));
};

// set wrapped prop or for these 2 methods
const getWrappedJinglesForUserForWrapper = async (address, assetContractAdress, contractCreatorFunc) => {
  const { assets } = await fetch(`https://api.opensea.io/api/v1/assets?owner=${address.toLowerCase()}&asset_contract_address=${assetContractAdress.toLowerCase()}`).then((res) => handleResponse(res));

  const tokenIds = assets.map(({ token_id }) => parseInt(token_id, 10)); // eslint-disable-line

  const contract = await contractCreatorFunc();

  const promises = tokenIds.map((tokenId) => contract.methods.wrappedToUnwrapped(tokenId).call()); // eslint-disable-line

  const realTokensBasicData = await Promise.all(promises);

  const promises2 = realTokensBasicData.map(async ({ tokenId, jingleContract }) => {
    const version = jingleContract.toLowerCase() === JingleAddress ? 1 : 0;
    const contractCreator = version === 1 ? JingleV1ViewContract : JingleV0ViewContract;
    const contract = await contractCreator();

    const data = await contract.methods.getFullJingleData(parseInt(tokenId, 10)).call();
    return formatViewJingle(version, data);
  });

  return Promise.all(promises2);
};

export const getAllOgWrappedUserJingles = (address) => getWrappedJinglesForUserForWrapper(address, WrappedOGJingleAddress, WrappedOGJinglesContract);
export const getAllNewWrappedUserJingles = (address) => getWrappedJinglesForUserForWrapper(address, WrappedNewJingleAddress, WrappedNewJinglesContract);

// ALL MARKETPLACE
const getUserJinglesFromMarketplace = async (address, jinglesContract, marketplaceAddress, marketplaceContract, viewContractCreator, version) => {
  const idsOnSale = await jinglesContract.methods.getAllJingles(marketplaceAddress).call();

  const promises = idsOnSale.map((id) => marketplaceContract.methods.sellOrders(parseInt(id, 10)).call());

  const res = await Promise.all(promises);

  const resWithIds = res.map((item, index) => ({ ...item, id: parseInt(idsOnSale[index], 10) }));

  const userJingles = resWithIds.filter(({ seller }) => seller === address);

  const viewContract = await viewContractCreator();
  const promises2 = userJingles.map(({ id }) => viewContract.methods.getFullJingleData(id).call());

  const payload = await Promise.all(promises2);
  return payload.map((jingle) => formatViewJingle(version, jingle));
};

export const getAllV0MarketplaceUserJingles = async (address) => {
  const marketplaceContract = await MarketplaceV0Contract();
  const jingleContract = await JingleV0Contract();

  return getUserJinglesFromMarketplace(address, jingleContract, MarketplaceV0Address, marketplaceContract, JingleV0ViewContract, 0);
};

export const getAllV1MarketplaceUserJingles = async (address) => {
  const marketplaceContract = await MarketplaceV1Contract();
  const jingleContract = await JingleV1Contract();

  return getUserJinglesFromMarketplace(address, jingleContract, MarketplaceAddress, marketplaceContract, JingleV1ViewContract, 1);
};

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
  const isV0OG = version === 0 && jingleId <= NUM_V0_OG_JINGLES;
  const isV1OG = version === 1 && jingleId <= NUM_V1_OG_JINGLES;

  return (isV0OG || isV1OG) && !wrapped;
});

export const filterNonOGJingles = (jingles) => jingles.filter(({ jingleId, wrapped, version }) => version === 1 && jingleId >= NUM_V1_OG_JINGLES && !wrapped);

export const getUserSamples = async (address) => {
  const contract = await JingleV1ViewContract();

  const res = await contract.methods.getSamplesForUser(address).call();

  // TODO - rename to sample id everywhere
  return res.map(({ sampleId: id, sampleType: jingleType }) => ({
    id: parseInt(id, 10),
    jingleType: parseInt(jingleType, 10),
    ...getJingleMetadata(jingleType),
  }));
};

export const createJingle = (settings, sampleIds, name, address) => window.contract.composeJingle(name, sampleIds, settings, { from: address });

export const getJinglesV1FullData = async (jingleIds) => {
  const contract = await JingleV1ViewContract();

  const res = await Promise.all(jingleIds.map((id) => contract.methods.getFullJingleData(id).call()));
  return res.map((jingle) => formatViewJingle(1, jingle));
};

export const getJinglesFullData = async (idsAndVersions) => {
  const contract1 = await JingleV1ViewContract();
  const contract = await JingleV0ViewContract();

  const v0JinglesIdsAndVersions = idsAndVersions.filter((idAndVer) => idAndVer[1] === 0);
  const v0JinglesPromises = v0JinglesIdsAndVersions.map((idAndVer) => contract.methods.getFullJingleData(idAndVer[0]).call());

  const v1JinglesIdsAndVersions = idsAndVersions.filter((idAndVer) => idAndVer[1] === 1);
  const v1JinglesPromises = v1JinglesIdsAndVersions.map((idAndVer) => contract1.methods.getFullJingleData(idAndVer[0]).call());

  const promiseAll0 = Promise.all(v0JinglesPromises);
  const promiseAll1 = Promise.all(v1JinglesPromises);

  const [v0Jingles, v1Jingles] = await Promise.all([promiseAll0, promiseAll1]);

  const formattedV0Jingles = v0Jingles.map((jingle) => formatViewJingle(0, jingle));
  const formattedV1Jingles = v1Jingles.map((jingle) => formatViewJingle(1, jingle));

  return [...formattedV1Jingles, ...formattedV0Jingles];
};
