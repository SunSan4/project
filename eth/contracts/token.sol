//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


//import '../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol';


contract TestToken is ERC20 {
    uint256 public _totalSupply;
        mapping (address => uint256) private _balances;

constructor() ERC20("TestToken", "TestToken")  {
        _mint(msg.sender, 1*10**18);
       
        
    }


}