import { ethers, utils } from "ethers";
import { setConfig } from "next/config";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Form, FormButton, FormGroup, FormInput, FormTextArea, Grid, Input, Menu, Message, Segment, SegmentGroup } from "semantic-ui-react";
import Layout from "../components/Layout";
import disperse from "../disperse";
import provider from "../provider";

const Emergency = () => {

    const [addressToken,setaddressToken]= useState("");
    const [amount,setamount] =useState(0);
    const [BalanceETH,setBalanceETH] =useState(0);
    const [BalanceTokens,setBalanceTokens] = useState(0);
    const [SuccessMessage,setSuccessMessage] =useState ("");
    const [ErrorMessage ,setErrorMessage] = useState ("");
    const [Confirm,setConfirm] = useState("");

    const singer = provider.getSigner();
    const SenderSinger = disperse.connect(singer);

useEffect(()=>{

    const checker = async () =>{
        try{
    const balance_ETH  = await provider.getBalance(disperse.address);
          balance_ETH  = ethers.utils.formatEther(balance_ETH);
          
        if(!!addressToken){
        const balance_Tok = await disperse.Chckbalance(addressToken);
          balance_Tok = ethers.utils.formatEther(balance_Tok);
        setBalanceTokens(balance_Tok);
        }
          setBalanceETH(balance_ETH);
          
        }
        catch(error){
            setErrorMessage(error);
        }

    }




    checker();
},[addressToken,Confirm])

    //withdrawl native token
    const handWeth = async(event)=>{
        event.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");
        
        try{
        const balance = await provider.getBalance(disperse.address);
        balance = ethers.utils.formatEther(balance);

        const responce = await SenderSinger.WithdrawalETH();
        setSuccessMessage("hash: " + responce.hash);
        const Confirmation = await provider.waitForTransaction(responce.hash, 1);
        setSuccessMessage("Confirmed " + Confirmation.confirmations +" BlockNumber : " + Confirmation.blockNumber);
        setConfirm(Confirmation);
        setBalanceETH("");
        }
        catch(error){
            setErrorMessage(error);
        }

    }
//withdrawl all tokens
    const handWalltok = async(event)=>{
        event.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");

        try{
        const balance = await disperse.Chckbalance(addressToken);
        const responce = await SenderSinger.WithdrawalToken(addressToken,balance);
        setSuccessMessage("hash: " + responce.hash);
        const Confirmation = await provider.waitForTransaction(responce.hash, 1);
        setConfirm(Confirmation);
        setSuccessMessage("Confirmed " + Confirmation.confirmations +" BlockNumber : " + Confirmation.blockNumber);
        setBalanceTokens("");
        }
        catch(error){
            setErrorMessage(error);
        }

    }
//withdrawl some tokens
    const handWtok = async(event)=>{
        event.preventDefault();
        setSuccessMessage("");
        setErrorMessage("");


        try{
        const balance = amount.toString();
        balance = utils.parseEther(balance);
        balance = balance.toString();
        console.log("balance",balance);
        const responce = await SenderSinger.WithdrawalToken(addressToken,balance);
        setSuccessMessage("hash: " + responce.hash);
        const Confirmation = await provider.waitForTransaction(responce.hash, 1);
        setConfirm(Confirmation);
        setSuccessMessage("Confirmed " + Confirmation.confirmations +" BlockNumber : " + Confirmation.blockNumber);
        setBalanceTokens("");
        }
        catch(error){
            setErrorMessage(error);
        }
        setBalanceTokens("");

    }


    return ( 
        <Layout>
            <Grid>
    <Grid.Row columns={3}>
      <Grid.Column textAlign='center'>
        <Menu fluid vertical>

          <Menu.Item>Balance NativeToken : <b>{BalanceETH}</b></Menu.Item>
          <Button color="black" onClick={handWeth}>WithdrawalNativeToken</Button>
          
        </Menu>
      </Grid.Column>
      <Grid.Column textAlign='center'>
        <Menu fluid vertical>
        <Input label="Token Address" value={addressToken} placeholder='0x..' onChange={event => setaddressToken(event.target.value)}/> 
          <Menu.Item >Balance Tokens : <b>{BalanceTokens}</b></Menu.Item>
          <Button color="black" onClick={handWalltok}>WithdrawalAllToken</Button>
        </Menu>
      </Grid.Column>
      <Grid.Column textAlign='center'> 
        <Menu fluid vertical>
        <Menu.Item>
        <Input label="Tokens WithDrawl" value={amount} placeholder='amount' onChange={event => setamount(event.target.value)}/> 
        <Button color="black"onClick={handWtok}>WithdrawalTokens</Button>
        </Menu.Item>
        </Menu>
      </Grid.Column>
    </Grid.Row>
  </Grid>
 
  <Form success={!!SuccessMessage} error={!!ErrorMessage}>
        <Message  success header="Success" content={SuccessMessage}/>
        <Message  error header="Errors" content ={ErrorMessage}/>
        </Form>

        </Layout>
     );
}
 
export default Emergency;