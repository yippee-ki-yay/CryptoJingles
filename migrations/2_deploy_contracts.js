const Ownable = artifacts.require("./zeppelin/ownership/Ownable.sol");

const CryptoJingles = artifacts.require("./CryptoJingles.sol");
const Jingle = artifacts.require("./Jingle.sol");
const Sample = artifacts.require("./Sample.sol");
const Marketplace = artifacts.require("./Marketplace.sol");

module.exports = function(deployer) {
  deployer.deploy(Ownable);
  deployer.deploy(CryptoJingles);
  deployer.deploy(Jingle);
  deployer.deploy(Sample);
  deployer.deploy(Marketplace);
};
