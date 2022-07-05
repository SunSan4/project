import { ethers, utils } from "ethers";
import disperse from "../disperse";
import provider from "../provider";

const try_approve = async (address,amount) => {

    const response= "";
    let abi = ["function approve(address _spender, uint256 _value) public returns (bool success)",
    "function allowance(address owner, address spender) external view returns (uint256)"];
    const singer = provider.getSigner();
    let contract = new ethers.Contract(address, abi, provider);
    let constractsinger = contract.connect(singer);
    response = await constractsinger.approve(disperse.address, utils.parseEther(amount).toString());
       

    return {response};
}
 
export default try_approve;