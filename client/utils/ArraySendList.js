import { utils } from "ethers";
import { parseUnits } from "ethers/lib/utils";

const SendList =  (Array,Dec) => {
    
    if(Array){
    const wallets = Array.trim().split('\n');
    const wallet = [];
    const value = [];
    const TotalTokens = 0;
    const TextRender = "";

    wallets.forEach(w1 => {
            
        const t1 = w1.replace(/[\t:,]/g," ");
        t1 = t1.replace(/ +/g,' ');
        t1 = t1.split(" ");
        //console.log("t1",t1);
       // console.log("t1",t1);
       //t1[0] = t1[0].replace(/ +/g, '').trim();
       //t1[1] = t1[1].replace(/ +/g, '').trim();
       //console.log("t1-0",t1[0]);
        const v1 = parseUnits(t1[1].toString(),Dec);
        wallet.push(t1[0]);
        value.push(v1.toString());
       
        TotalTokens += Number(t1[1]);
        TextRender += t1[0]+">>>>>>>>>>"+t1[1]+" ";

    });

    
    return {wallet,value,TotalTokens,TextRender};
    }
}
 
export default SendList;