const Migrations = artifacts.require("Migrations");
const mytoken = artifacts.require("mytoken");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(Migrations);
  deployer.deploy(mytoken);
};
