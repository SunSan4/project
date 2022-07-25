import { ethers } from "ethers";
import { formatEther, formatUnits, parseEther, parseUnits } from "ethers/lib/utils";
import disperse from "../disperse";
import provider from "../provider";

const read_checktoken = async(address) => {
    const Allow = "";
    const BalanceOf = "";
    const TotalSup = "";
    const Name = "";
    const Sym = "";
    const Dec = "";
    const abi = [
        "function allowance(address owner, address spender) external view returns (uint256)",
        "function balanceOf(address owner) public view returns (uint256)",
        "function totalSupply() public view returns (uint256)",
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function decimals() view returns (uint8)"];
    const accounts = await ethereum.request({method: "eth_requestAccounts"});
    const contract = new ethers.Contract(address, abi, provider);
    Dec = await contract.decimals();
    Allow = await contract.allowance(accounts[0],disperse.address);
    BalanceOf = await contract.balanceOf(accounts[0]);
    TotalSup = await contract.totalSupply();
    TotalSup = formatUnits(TotalSup.toString(),Dec);
    //TotalSup = formatEther(TotalSup.toString());
    Allow = formatUnits(Allow.toString(),Dec);
    Allow = Number(Allow);
    BalanceOf = formatUnits(BalanceOf.toString(),Dec);
    
    
    console.log("total",TotalSup);
    Name = await contract.name();
    //console.log("contract.functions",contract.functions)
    Sym = await contract.symbol();

    

    
    return {Allow,BalanceOf,TotalSup,Name,Sym,Dec};
}
 
export default read_checktoken;