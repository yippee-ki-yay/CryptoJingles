import { MarketplaceV1Contract } from './contractsRegistryService';
import { formatSalePrice } from '../actions/utils';

export const sortMarketplaceJingles = (selectedSort, basicJingles) => {
  if (selectedSort.includes('jingleId')) {
    if (selectedSort.includes('-')) return basicJingles.sort((a, b) => (b[0] - a[0]));
    return basicJingles.sort((a, b) => (a[0] - b[0]));
  }

  if (selectedSort.includes('price')) {
    if (selectedSort.includes('-')) return basicJingles.sort((a, b) => (parseFloat(b[1]) - parseFloat(a[1])));
    return basicJingles.sort((a, b) => (parseFloat(a[1]) - parseFloat(b[1])));
  }
};

export const getMarketplaceJinglesIdsWithPrices = async () => {
  const contract = await MarketplaceV1Contract();

  let ids = await contract.methods.getAllJinglesOnSale().call();
  ids = ids.map((id) => parseInt(id, 10));

  const promises = ids.map((id) => contract.methods.sellOrders(id).call());

  const res = await Promise.all(promises);
  return res.map(({ price }, index) => [ids[index], formatSalePrice(price)]);
};
