import { ethers } from "ethers";
import provider from "./provider";


//const address = "0xea66a12206cF53Fdaf1C01f427338579dc6d89d7"; rinkeby
//const address = "0x0E1eaD5e2C7D321351163817d53524073B4A6127";rinkeby new constract
const getaddress = async () => {

  try {
    const addy = "";
    const network = await provider.getNetwork();
    //console.log("network.chainID", network.chainId);
    switch (network.chainId) {

      case 1://eth
        addy = "0xB2BbA1701110dca7eC810C56679Da3736Cae3B30"
        break;
      case 4: //rinkeby
        addy = "0x8b6FF6006bd04bF0338CE5D4684Ff3dad60c26b3"
        break;
      case 56: //bnb
        addy = "0xCCA18F5B214668a7b8006fB57EA60d8cb61D78B1"
        break;
      case 43114: //avax
        addy = "0x181f6B747F709F82d89e6Ba56CF1CdA9e16F5364"
        break;
      case 137: //matic
        addy = "0x181f6B747F709F82d89e6Ba56CF1CdA9e16F5364"
        break;
      case 250: //fantom
        addy = ""
        break;
      case 42161: //arbitrum
        addy = "0x181f6B747F709F82d89e6Ba56CF1CdA9e16F5364"
        break;
      case 10: //optimism
        addy = ""
        break;
      case 1284: //Moonbeam
        addy = ""
        break;
      case 1285: //Moonriver
        addy = "0x181f6B747F709F82d89e6Ba56CF1CdA9e16F5364"
        break;
      case 66: //OKXChain
        addy = ""
        break;
      case 5: //Goerly
        addy = "0x2737E352B8dc154483Bd3e9Ab128B68F029B436B"
        break;
      case 1388: //AmStar(SINSO)
        addy = "0x0cd1DCA87166307fdBE5d83057788b6aDB77B4c1"
        break;
      case 185: //AmStar(SINSO)
        addy = "0x181f6B747F709F82d89e6Ba56CF1CdA9e16F5364"
        break;
    }

    return addy
  } catch (error) { console.error(error); }

}
//const address = getaddress();
//const address2 ="";
//console.log("address", getaddress());


const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      }
    ],
    "name": "Chckbalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "Name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "WithdrawalETH",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "WithdrawalToken",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "recipients",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "values",
        "type": "uint256[]"
      }
    ],
    "name": "disperseEther",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "recipients",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "values",
        "type": "uint256[]"
      }
    ],
    "name": "disperseToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "contract IERC20",
        "name": "token",
        "type": "address"
      },
      {
        "internalType": "address[]",
        "name": "recipients",
        "type": "address[]"
      },
      {
        "internalType": "uint256[]",
        "name": "values",
        "type": "uint256[]"
      }
    ],
    "name": "disperseTokenSimple",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

const ethABI = [
 // "function disperseEther(address[],uint256[])public"

]
const disperse = new ethers.Contract(getaddress(), abi, provider);

export default disperse;
