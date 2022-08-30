pragma solidity ^0.8.9;

contract Transactions {

    struct TransferStruct {
        address sender;
        address receiver;
        uint amount;
    }

    TransferStruct[] transactions;

    event Transfer(address from, address receiver, uint amount);

    function addToBlockChain(address payable receiver, uint amount) public {
        transactions.push(TransferStruct(msg.sender, receiver, amount));
        emit Transfer(msg.sender, receiver, amount);
    }
}
