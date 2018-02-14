/**
 * Converts price in wei to price in ETH without web3
 * @param price
 */
export const formatSalePrice = (price) => (String(parseFloat(price) / 1000000000000000000)).slice(0, 8);
