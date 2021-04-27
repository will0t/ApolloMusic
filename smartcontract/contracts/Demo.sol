// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

contract Demo {
    address private _owner;
    string public name;

    constructor(string memory _name) {
        name = _name;
        _owner = msg.sender;
    }

    function getOwner() public view returns (address) {
        return _owner;
    }

    function setName(string memory _name) public {
        require(
            msg.sender == _owner,
            "Error: only the contract owner can change the name"
        );
        name = _name;
    }
}
