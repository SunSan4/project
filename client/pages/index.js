
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Message, TextArea } from "semantic-ui-react";
import Layout from "../components/Layout";
import SendList from "../utils/ArraySendList";
import read_checktoken from "../utils/read_checktoken";
import disperse from "../disperse";
import provider from "../provider";
import try_approve from "../utils/try_approve";


const Index = () => {
  const [checkApprove, setcheckApprove] = useState(true);
  const [tokenAddress, settokenAddress] = useState("");
  const [arrayWA, setarrayWA] = useState("");
  const [chboxRevoke, setchboxRevoke] = useState(false);


  const singer = provider.getSigner();
  const SenderSinger = disperse.connect(singer);
 // const [, forceRender] = useState({});

  // state
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [ConfirmationList, setConfirmationList] = useState("");
  const [Remaining,setRemaining] = useState("");


//list array
  useEffect(() => {
    if (arrayWA != "") {
      setErrorMessage("");
      try{
      setConfirmationList(SendList(arrayWA));


      }
      catch (error) {
      //  console.error(error);
        setErrorMessage(error.message);
        setConfirmationList("");
        setRemaining("");
      }
    }
  }, [arrayWA]);


//info token
  useEffect(() => {
    if (tokenAddress != "") {
      setErrorMessage("");
        const fetchData = async () => {
          try {
          const resp = await read_checktoken(tokenAddress);
          setInfoMessage(resp);
       //   console.log("infoMessage.Allow",infoMessage.Allow);
       //   if(infoMessage.Allow>0){setcheckApprove(false);
       //     console.log("set>0");
       //   }
         // else{setcheckApprove(true)};
         
        }

          catch (error) {
           // console.error(error);
            setErrorMessage(error.message);
            setInfoMessage("");
          }
        }
        fetchData();
     }
 
  }, [tokenAddress,checkApprove]);


// take remaining
  useEffect(() => {
    if(ConfirmationList && infoMessage){
    setRemaining(infoMessage.BalanceOf-ConfirmationList.TotalTokens);

    if(infoMessage.Allow>=ConfirmationList.TotalTokens){setcheckApprove(false);
      
    }else{setcheckApprove(true);};
  }
  },[ConfirmationList,infoMessage,checkApprove]);


//approving
const handApprove = async (event) => {
  event.preventDefault();
  setErrorMessage("");
  setSuccessMessage("");

          try {
              const List = SendList(arrayWA);
              const toks = 0;
              if(!chboxRevoke){
                 toks = "99999999999999999999999999";
                 const approve = await try_approve(tokenAddress,toks); 
                 setSuccessMessage("hash: " + approve.response.hash);
                 const Confirmation = await provider.waitForTransaction(approve.response.hash, 1);
                 setSuccessMessage("Confirmed " + Confirmation.confirmations +" BlockNumber : " + Confirmation.blockNumber);
                 if(Confirmation){setcheckApprove(false);}
               
              }
              else{
                 toks = "0";
                // toks = List.TotalTokens.toString();    
                const approve = await try_approve(tokenAddress,toks); 
                setSuccessMessage("hash: " + approve.response.hash);
                const Confirmation = await provider.waitForTransaction(approve.response.hash, 1);
                setSuccessMessage("Confirmed " + Confirmation.confirmations +" BlockNumber : " + Confirmation.blockNumber);
                if(Confirmation){setcheckApprove(true);}
              }



          } catch (error) {
             // console.error(error);
              setErrorMessage(error.message);
          } finally {
              setisLoading(false);
          }
          
}

  //send dispers
const handleSublit = async (event) => {
  event.preventDefault();
  setErrorMessage("");
  setSuccessMessage("");
  try {    
      const List = SendList(arrayWA);
      const response = await SenderSinger.disperseToken(tokenAddress, List.wallet, List.value); 
      
     // const approve = await try_approve(tokenAddress,toks); 

      setSuccessMessage("hash: " + response.hash);
      const Confirmation = await provider.waitForTransaction(response.hash, 1);
      setSuccessMessage("Confirmed " + Confirmation.confirmations +" BlockNumber : " + Confirmation.blockNumber);

      
  }
  catch (error) {
      console.error(error);
      setErrorMessage(error.message);
  } finally {
    setisLoading(false);
  }
  
}

  return (
  
  <Layout>
            <Button.Group basic vertical>
      <Button color='yellow' onClick={()=>settokenAddress("0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56")} >BUSD</Button> 
      <Button color='yellow' onClick={()=>settokenAddress("0x55d398326f99059fF775485246999027B3197955")} >USDT</Button> 
      <Button color='yellow' onClick={()=>settokenAddress("0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d")} >USDC</Button> 
    </Button.Group>

    {/* <Button.Group>
  
        {!currentAccount?
        <Button primary onClick={hanleLogInClick}>Connect</Button>:
        <Button positive onClick={()=>router.push("/show")}>disperse</Button>
    }

        </Button.Group>
        


        <Button.Group floated="right">
            <Button onClick={()=>router.push("/add")}>sending</Button>
            <Button.Or text="||"/>
            <Button positive onClick={()=>router.push("/show")}>disperse</Button>

            
            {!currentAccount?<Button primary onClick={hanleLogInClick}>Connect</Button>:
            <Link href="/user">
            <Button primary onClick={hanleLogInClick}>{currentAccount}</Button>
            </Link>}
            
        </Button.Group> */}

    <Form error={!!errorMessage} success={!!successMessage}>

      <Form.Group widths='equal' unstackable>
        <Form.Field control={Input} label="Token Address" value={tokenAddress} placeholder='0x...' onChange={event => settokenAddress(event.target.value)} />

        <Form.Field control={TextArea} label="Wallets & Amounts" value={arrayWA} placeholder='Wallets & Amounts' onChange={event => setarrayWA(event.target.value)} />
      </Form.Group>



      <Form.Group >
      {!checkApprove?<Form.Field control={Button} onClick={handleSublit} loading={isLoading} >Send</Form.Field>:
      <Form.Field control={Button} onClick={handleSublit} loading={isLoading} disabled>Send</Form.Field>}

        {!chboxRevoke ? <Form.Field onClick={handApprove} control={Button} loading={isLoading} >Approve</Form.Field> :
          <Form.Field control={Button} onClick={handApprove} loading={isLoading} >Revoke</Form.Field>}

        <Form.Checkbox control={Checkbox} label="Revoke" checked={chboxRevoke ? true : false} onChange={() => setchboxRevoke(!chboxRevoke)} />
        <Form.Field onClick={()=>{settokenAddress("");setarrayWA("")}} control={Button} color='grey'>Clear Forms</Form.Field> 
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field >

          <Message error header='Error:' style={{ wordBreak: 'break-word' }} content={errorMessage} />
          <Message success header='success:' content={successMessage} />
          <Message color="olive" size="big" >
            <Message.Header>Info:</Message.Header>

            <br />Name: <b style = {{color:"black"}}>{infoMessage.Name}</b>
            <br />Symbol: <b style = {{color:"black"}}>{infoMessage.Sym}</b>
            <br />
            <br />Разрешено для отправки: <b style = {{color:"black"}}>{infoMessage.Allow}</b>
            <br />Токенов в кошельке: <b style = {{color:"black"}}>{infoMessage.BalanceOf}</b>



          </Message>

        </Form.Field>
        <Form.Field>
          <Message color="yellow" size="big" >
            <Message.Header>Confirmation List: </Message.Header>
            <p>Токенов на отправку : <b style = {{color:"black"}}> {ConfirmationList.TotalTokens}</b></p>
            <p>Остаток после отправки: <b style = {{color:"black"}}>{Remaining}</b> </p>
            <p>{ConfirmationList.TextRender}
            </p>
          </Message>



        </Form.Field>
      </Form.Group>





    </Form>
  </Layout>


  );
}

export default Index;
