//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;


interface IERC20 {
    function transfer(address to, uint256 value) external returns (bool);
    function transferFrom(address from, address to, uint256 value) external returns (bool);
    function balanceOf(address owner) external view returns (uint256);
}
  

contract Disperse {
    string public Name = "Disperse";
    address public owner;

  constructor() {
    owner = msg.sender;
  }
    modifier onlyOwner() {
     
    require(msg.sender == address(owner));
    _;
  }



    function disperseEther(address[] memory recipients, uint256[] memory values) external payable {
        for (uint256 i = 0; i < recipients.length; i++)
            payable(recipients[i]).transfer(values[i]);
        uint256 balance = address(this).balance;
        if (balance > 0){
                payable(msg.sender).transfer(balance);
        }
    }

    function disperseToken(IERC20 token, address[] memory recipients, uint256[] memory values) external {
        uint256 total = 0;
        for (uint256 i = 0; i < recipients.length; i++)
            total += values[i];
        require(token.transferFrom(msg.sender, address(this), total));
        for (uint256 i = 0; i < recipients.length; i++)
            require(token.transfer(recipients[i], values[i]));
    }

    function disperseTokenSimple(IERC20 token, address[] memory recipients, uint256[] memory values) external {
        for (uint256 i = 0; i < recipients.length; i++)
            require(token.transferFrom(msg.sender, recipients[i], values[i]));
    }



      function WithdrawalToken(address tokenAddress, uint amount)public payable onlyOwner{ //снять весь объем токена с контракта себе на кошелек
//  ERC20(tracker_0x_address).approve(address spender, uint tokens)
    //if(Dec == 0){Dec=18;}
 
    IERC20(tokenAddress).transfer(msg.sender, amount);
    
    }
    
    function Chckbalance(address tokenAddress)public view returns (uint) { // проверка кол-во токенов на балансе контракта
        uint tokenAmount = IERC20(tokenAddress).balanceOf(address(this));
       return tokenAmount;
    }
    
    //снятие
    function WithdrawalETH() public payable onlyOwner returns (bool)
    {
        payable(msg.sender).transfer(address(this).balance);
        
        return true;
    }
    
}
