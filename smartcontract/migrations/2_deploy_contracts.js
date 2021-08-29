const ApolloAgreement = artifacts.require("ApolloAgreement");

const DEFAULT_NAME = "AA | " + Date(Date.now()).toString();

module.exports = function(deployer) {
  deployer.deploy(ApolloAgreement, DEFAULT_NAME);
};
