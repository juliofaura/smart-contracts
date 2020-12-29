pragma solidity ^0.8;

contract mytoken {
    event functionCalled(address whoCalled, int param, int callsSoFar);

    int public manyCalls;

    function nothing(int param) external pure returns (int) {
        return param;
    }

    function callFunction(int param) external {
        manyCalls++;
        emit functionCalled(msg.sender, param, manyCalls);
    }

    function viewCalls() external view returns (int) {
        return manyCalls;
    }
}

