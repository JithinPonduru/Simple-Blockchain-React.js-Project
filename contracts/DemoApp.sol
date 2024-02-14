// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <=0.9.0;

contract DemoApp {
    struct Memo  {
        string name;
        string message;
        uint time;
        address from;
    }
    
    Memo[] memo;
    address payable owner;
    address payable zithin = payable(0xc6eE3A2b3Db0f58B91B16DA71105d51628b8d294);
    
    constructor() {
        owner = payable(msg.sender);
    }

    function buyChai(string memory name, string memory message) public payable {
        require(msg.value > 0, "Please send ether greater than 0");
        owner.transfer(msg.value);
        memo.push(Memo(name, message, block.timestamp, msg.sender));
    }

    function getMemo() public view returns (Memo[] memory) {
        return memo;
    }

    function transferToZithin() public payable {
        uint256 balanceToTransfer = address(owner).balance;
        require(balanceToTransfer > 0, "No balance to transfer");
        owner.transfer(balanceToTransfer);
    }

    function showBalance() public view returns (uint256) {
        return address(owner).balance;
    }
}
