import { utils } from "ethers";

const SendList =  (Array) => {
    
    if(Array){
    const wallets = Array.trim().split('\n');
    const wallet = [];
    const value = [];
    const TotalTokes = 0;
    const TextRender = "";

    wallets.forEach(w1 => {
            
        const t1 = w1.replace(/['\t':,]/g," ").split(" ");
       // console.log("t1",t1);
        const v1 = utils.parseEther(t1[1]);
        wallet.push(t1[0]);
        value.push(v1.toString());
       
        TotalTokes += Number(t1[1]);
        TextRender += t1[0]+"----------------"+t1[1]+" ";

    });

    
    return {wallet,value,TotalTokes,TextRender};
    }
}
 
export default SendList;