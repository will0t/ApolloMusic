const Demo = artifacts.require("Demo");

const DEFAULT_NAME = "demo | " + Date(Date.now()).toString();

module.exports = function(deployer) {
  deployer.deploy(Demo, DEFAULT_NAME);
};