const Apollo = artifacts.require("ApolloAgreement");

const DEFAULT_NAME = "apollo | " + Date(Date.now()).toString();

module.exports = function(deployer) {
  deployer.deploy(Apollo, DEFAULT_NAME);
};