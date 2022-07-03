import { ethers } from "ethers";
import disperse from "../disperse";
import provider from "../provider";

const ch_approve = async(address) => {
    const responce = "";
    //try{
    const abi = ["function allowance(address owner, address spender) external view returns (uint256)"];
    const accounts = await ethereum.request({method: "eth_requestAccounts"});
    const contract = new ethers.Contract(address, abi, provider);
    responce = await contract.allowance(accounts[0],disperse.address);
    responce = ethers.utils.formatEther(responce);
    //}catch(error)
  //  {
   //         console.error(error);
   // }finally{
    return (responce);
   // }
}
 
export default ch_approve;