pragma solidity ^0.8;

contract placa {

    event energyAdded(address who, uint howMuch, uint howMuchCumulative);

    mapping (address => uint) energias;
    mapping (address => bool) registered;

    address owner;

    constructor() {
        owner = msg.sender;
    }

    function register(address who) external {
        require(msg.sender == owner, "Only the owner can register una placa");
        registered[who] = true;
    }

    function add(uint amount) external {
        require(registered[msg.sender], "You are an impostor!");
        energias[msg.sender]+=amount;
        emit energyAdded(msg.sender, amount, energias[msg.sender]);
    }

    function lookup(address who) external view returns (uint) {
        return energias[who];
    }

}