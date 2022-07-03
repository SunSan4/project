const { Signer } = require("ethers");
const { default: disperse } = require("../disperse");

const try_show =async (address) =>{
    const NameD = await disperse.Name();
            //throw new Error("ошибка");
    //const sending = await Signer.disperseToken();
    //console.log("getContract: ",getContract);
    //console.log("sending",sending);
    return {NameD}
}
export default try_show;