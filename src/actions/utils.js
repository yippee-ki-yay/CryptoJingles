/**
 * Converts price in wei to price in ETH without web3
 * @param price - ether
 */
export const formatSalePrice = (price) => (String(parseFloat(price) / 1000000000000000000)).slice(0, 8);

/**
 * Converts price in ethers to price in wei without web3
 * @param price - wei
 */
export const formatToWei = (price) => (parseFloat(price) * 1000000000000000000);
