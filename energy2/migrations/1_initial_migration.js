const Migrations = artifacts.require("Migrations");
const placa = artifacts.require("placa");

module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(placa);
};
