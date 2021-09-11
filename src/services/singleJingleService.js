import {
  JingleV0ViewContract,
  JingleV1ViewContract,
  MarketplaceV0Contract,
  MarketplaceV1Contract,
  WrappedNewJinglesContract,
  WrappedOGJinglesContract,
} from './contractsRegistryService';
import { formatViewJingle } from '../actions/utils';
import {
  JingleAddress,
  JingleV0Address,
  MarketplaceAddress,
  MarketplaceV0Address,
  WrappedNewJingleAddress,
  WrappedOGJingleAddress,
} from '../util/config';
import callTx from './txService';

export const getSingleJingle = async (version, id) => {
  // FIRST get data from the corresponding jingle contract
  const viewContractCreator = version === 0 ? JingleV0ViewContract : JingleV1ViewContract;
  const viewContract = await viewContractCreator();

  const jingleData = await viewContract.methods.getFullJingleData(id).call();
  const formattedJingleData = formatViewJingle(version, jingleData);

  if (formattedJingleData.owner === MarketplaceV0Address.toLowerCase()) {
    formattedJingleData.marketplaceV0 = true;
    formattedJingleData.externalOwner = true;

    const contract = await MarketplaceV0Contract();
    const sellOrder = await contract.methods.sellOrders(id).call();

    formattedJingleData.realOwner = sellOrder.seller.toLowerCase();
  }

  if (formattedJingleData.owner === MarketplaceAddress.toLowerCase()) {
    formattedJingleData.marketplaceV1 = true;
    formattedJingleData.externalOwner = true;

    const contract = await MarketplaceV1Contract();
    const sellOrder = await contract.methods.sellOrders(id).call();

    formattedJingleData.realOwner = sellOrder.seller.toLowerCase();
  }

  if (formattedJingleData.owner === WrappedOGJingleAddress.toLowerCase()) {
    formattedJingleData.ogWrapped = true;
    formattedJingleData.wrapped = true;
    formattedJingleData.externalOwner = true;

    const addressToCheck = version === 0 ? JingleV0Address : JingleAddress;

    const contract = await WrappedOGJinglesContract();
    const wrappedTokenId = await contract.methods.unwrappedToWrapped(formattedJingleData.jingleId, addressToCheck).call();

    formattedJingleData.wrappedTokenId = wrappedTokenId;
    formattedJingleData.realOwner = await contract.methods.ownerOf(wrappedTokenId).call();
  }

  if (formattedJingleData.owner === WrappedNewJingleAddress.toLowerCase()) {
    formattedJingleData.newWrapped = true;
    formattedJingleData.wrapped = true;
    formattedJingleData.externalOwner = true;

    const addressToCheck = version === 0 ? JingleV0Address : JingleAddress;

    const contract = await WrappedNewJinglesContract();
    const wrappedTokenId = await contract.methods.unwrappedToWrapped(formattedJingleData.jingleId, addressToCheck).call();

    formattedJingleData.wrappedTokenId = wrappedTokenId;
    formattedJingleData.realOwner = await contract.methods.ownerOf(wrappedTokenId).call();
  }

  return formattedJingleData;
};

export const purchaseJingle = async (version, id, price, address) => {
  const contract = await MarketplaceV1Contract();
  return callTx(contract, 'buy', [id], { from: address, value: price.toString() });
};

export const sellJingle = async (version, id, price, address) => {
  const contract = await MarketplaceV1Contract();
  return callTx(contract, 'approveAndSell', [id, price], { from: address });
};

export const cancelJingleSale = async (version, id, address) => {
  const contract = await MarketplaceV1Contract();
  return callTx(contract, 'cancel', [id], { from: address });
};
