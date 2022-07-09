import { ethers } from "ethers";
import provider from "./provider";


//const address = "0xea66a12206cF53Fdaf1C01f427338579dc6d89d7";
//const address = "0x0E1eaD5e2C7D321351163817d53524073B4A6127";
const getaddress = async () => {

  try {
    const addy = "";
    const network = await provider.getNetwork();
   // console.log("network.chainID", network.chainId);
    switch (network.chainId) {

      case 1://eth
        addy = "0x0E1eaD5e2C7D321351163817d53524073B4A6127"
        break;
      case 4: //rinkeby
        addy = "0x0E1eaD5e2C7D321351163817d53524073B4A6127"
        break;
      case 56: //bnb
        addy = "0x0E1eaD5e2C7D321351163817d53524073B4A6127"
        break;
      case 43114: //avax
        addy = "0x0E1eaD5e2C7D321351163817d53524073B4A6127"
        break;
      case 137: //matic
        addy = "0x0E1eaD5e2C7D321351163817d53524073B4A6127"
        break;
      case 250: //fantom
        addy = "0x0E1eaD5e2C7D321351163817d53524073B4A6127"
        break;
      case 42161: //arbitrum
        addy = "0x0E1eaD5e2C7D321351163817d53524073B4A6127"
        break;
      case 10: //optimism
        addy = "0x0E1eaD5e2C7D321351163817d53524073B4A6127"
        break;
      case 1284: //Moonbeam
        addy = "0x0E1eaD5e2C7D321351163817d53524073B4A6127"
        break;
      case 1285: //Moonriver
        addy = "0x0E1eaD5e2C7D321351163817d53524073B4A6127"
        break;
      case 66: //OKXChain
        addy = "0x0E1eaD5e2C7D321351163817d53524073B4A6127"
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
  "function disperseEther(address[],uint256[])public"

]
const disperse = new ethers.Contract(getaddress(), abi, provider);

export default disperse;