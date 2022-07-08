import { ethers } from "ethers";
import disperse from "../disperse";
import provider from "../provider";

const read_checktoken = async(address) => {
    const Allow = "";
    const BalanceOf = "";
    const TotalSup = "";
    const Name = "";
    const Sym = "";
    const abi = [
        "function allowance(address owner, address spender) external view returns (uint256)",
        "function balanceOf(address owner) public view returns (uint256)",
        "function totalSupply() public view returns (uint256)",
        "function name() view returns (string)",
        "function symbol() view returns (string)"];
    const accounts = await ethereum.request({method: "eth_requestAccounts"});
    const contract = new ethers.Contract(address, abi, provider);
    Allow = await contract.allowance(accounts[0],disperse.address);
    BalanceOf = await contract.balanceOf(accounts[0]);
    TotalSup = await contract.totalSupply();
    Allow = ethers.utils.formatEther(Allow);
    Allow = Number(Allow);
    BalanceOf = ethers.utils.formatEther(BalanceOf);
    TotalSup = ethers.utils.formatEther(TotalSup);
    Name = await contract.name();
    //console.log("contract.functions",contract.functions)
    Sym = await contract.symbol();
    

    
    return {Allow,BalanceOf,TotalSup,Name,Sym};
}
 
export default read_checktoken;