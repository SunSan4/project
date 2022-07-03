//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ContractFactory{
    mapping (address=>address) public ownertoContract;
    function createContract()public{
        Sender newContract = new Sender();
        ownertoContract[msg.sender] = address(newContract);

    }
}

contract Sender{
    
    mapping(address => mapping (address=> uint)) public PaymentDetails;
    
    function AddMap(address token_addy,address[] memory user_wallet, uint[] memory ammont) public {
        for (uint256 i = 0; i < user_wallet.length; i++)
        {
             address uw = user_wallet[i];
             uint amm = ammont[i];
            PaymentDetails[token_addy][uw]= amm;
        }

    }
    struct Allocations{
        address token_addy;
        uint FT_tokens;
    }
    function add_alocation (address token_addy,uint full_tokens)public{
         
    }

}