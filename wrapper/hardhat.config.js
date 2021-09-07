require('@nomiclabs/hardhat-waffle');

module.exports = {
  networks: {
    local: {
      url: 'http://127.0.0.1:8545',
      timeout: 1000000,
    },
  },
  solidity: '0.8.4',
};
