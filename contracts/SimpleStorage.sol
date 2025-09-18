// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SimpleStorage {
    uint256 private value;

    event ValueChanged(uint256 newValue, address indexed changer);

    function set(uint256 newValue) external {
        value = newValue;
        emit ValueChanged(newValue, msg.sender);
    }

    function get() external view returns (uint256) {
        return value;
    }
}


