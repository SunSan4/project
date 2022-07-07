//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


//import '../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol';


contract TestToken is ERC20 {
    uint256 public _totalSupply;
    string public name;
    string public symbol;
        mapping (address => uint256) private _balances;

constructor() ERC20(_name,_symbol)  {
        _mint(msg.sender, 1*10**18);
        name = _name;
        symbol = _symbol;

       
        
    }


}