import { BigNumber } from "ethers";
import { hexConcat } from "ethers/lib/utils";
import { useState } from "react";
import { Button, Form, Input, Message, Select, TextArea } from "semantic-ui-react";
import Layout from "../components/Layout";
import disperse from "../disperse";
import provider from "../provider";

const addContract = () => {
    const [Tokens,setTokens] = useState("");
    const [AreaWA,setAreaWA] = useState("");
    const [erroMessage,setErrorMessage] = useState("");
    const [successMessage,setSuccessMessage] = useState("");
    const [isLoading,setLoading] = useState(false);



    const options = [
        { key: 'E', text: 'ETH', value: 'eth' },
        { key: 'B', text: 'BSC', value: 'bsc' },
        { key: 'M', text: 'MATIC', value: 'matic' },
      ]
      

    const handleSublit =async (event) =>{

        event.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
       // await window.ethereum.enable();  
        

        const singer = provider.getSigner();
        //console.log(provider.functions);
        const disperseSinger = disperse.connect(singer);
        //console.log(disperseSinger.functions);

        const wallets = AreaWA.split('\n'); 
        console.log("wallets",wallets);
         const wallet=[];
         const amount=[];
         wallets.forEach(w1 => {
             const t1=w1.split(' ');
             //console.log("t1",(t1[0]));
            
             
             const v1 =t1[1]*10**18;
            
             wallet.push(t1[0]);
             amount.push(v1.toLocaleString('fullwide', { useGrouping: false }));
  
             //console.log("amount",amount);
             
        });
        //wallet=hexConcat(wallet);
        //amount = BigNumber(amount);

        console.log("wallet:",wallet, "amount:",amount);
        
        try{
            //const response = await disperseSinger["disperseEther(address[],uint256[])"](wallet,amount);
            
            const response = await disperseSinger.disperseEther(wallet,amount);
            console.log("response",response);
            setSuccessMessage("hash:" + response.hash);

        }
        catch(error)
        {
        console.error(error);
        setErrorMessage(error.message);
        }finally{
            setLoading(false);
        }



    }
    return ( <Layout>
      <Form error={!!erroMessage} success={!!successMessage} onSubmit={handleSublit}>
        <Form.Group widths='equal'>
          <Form.Field control={Input} label='Token' value={Tokens} placeholder='Tokens Address' onChange = {event=>setTokens(event.target.value) }/>
          <TextArea label='Wallets' value={AreaWA} placeholder='Walets&Tokens'onChange = {event=>setAreaWA(event.target.value)} />
          <Form.Field control={Select} label='Chain' options={options} placeholder='Chain'/>
          
        </Form.Group>
        <Button loading={isLoading} primary>Send</Button>
        <Message style={{wordBreak: 'break-word'}} error header = 'Error:' content = {erroMessage}/> 
        <Message success header = 'success:' content = {successMessage}/> 
        </Form>


    </Layout> );
}
 
export default addContract;