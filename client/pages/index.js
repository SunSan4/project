import { allowedStatusCodes } from "next/dist/lib/load-custom-routes";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Button, Checkbox, Form, GridRow, Input, Menu, Message, TextArea } from "semantic-ui-react";
import Layout from "../components/Layout";
import SendList from "../utils/ArraySendList";
import read_checktoken from "../utils/read_checktoken";



const Index = () => {
  const [checkApprove, setcheckApprove] = useState(false);
  const [tokenAddress, settokenAddress] = useState("");
  const [arrayWA, setarrayWA] = useState("");
  const [chboxRevoke, setchboxRevoke] = useState(false);





  // state
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [infoMessage, setInfoMessage] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const [ConfirmationList, setConfirmationList] = useState("");



  const pretokenAddress = "";
  const prearrayWA = "";
  if (tokenAddress != pretokenAddress && tokenAddress != "") {
    if (!tokenAddress) { setInfoMessage(""); }
    console.log("pretokenAddress", pretokenAddress);
    console.log("tokenAddress", tokenAddress)
    pretokenAddress = tokenAddress;


    //infos(tokenAddress);


  }
  //const preConf = "";

//list array
  useEffect(() => {
    if (arrayWA != "") {
      try{
      setConfirmationList(SendList(arrayWA));
      }
      catch (error) {
        console.error(error);
        setErrorMessage(error.message);
      }
    }
  }, [arrayWA]);

//info token
  useEffect(() => {
    if (tokenAddress != "") {

     
        const fetchData = async () => {
          try {
          const resp = await read_checktoken(tokenAddress);
          setInfoMessage(resp);
          setErrorMessage("");
          }
          catch (error) {
            console.error(error);
            setErrorMessage(error.message);
            setInfoMessage("");
          }
    
        }
        fetchData();
      




      
    }
  }, [tokenAddress]);


  //function about token-info
  async function infos(address) {

    try {
      const resp = await read_checktoken(address);
      //console.log("resp",resp); 
      if (!infoMessage) {
        setInfoMessage(resp);
        // console.log("infoMessage",infoMessage);
      }
    }
    catch (error) {
      console.error(error);
      setErrorMessage(error.message);
    }
  }
  async function checkers() {

  }


  const router = useRouter();

  const [currentAccount, setCurrentAccount] = useState();
  const hanleLogInClick = async () => {



    try {

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });
      setCurrentAccount(accounts[0]);

    }
    catch (error) {
      console.error(error);

    }
  }

  return (<Layout>

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
        <Form.Field control={Button}>Send</Form.Field>

        {!chboxRevoke ? <Form.Field control={Button}>Approve</Form.Field> :
          <Form.Field control={Button}>Revoke</Form.Field>}

        <Form.Checkbox control={Checkbox} label="Revoke" checked={chboxRevoke ? true : false} onChange={() => setchboxRevoke(!chboxRevoke)} />
      </Form.Group>
      <Form.Group widths='equal'>
        <Form.Field >

          <Message error header='Error:' style={{ wordBreak: 'break-word' }} content={errorMessage} />
          <Message success header='success:' content={successMessage} />
          <Message color="olive" size="big" >
            <Message.Header>Info:</Message.Header>

            <br />Name: {infoMessage.Name}
            <br />Symbol: {infoMessage.Sym}
            <br />
            <br />Разрешено для отправки: {infoMessage.Allow}
            <br />Токенов в кошельке: {infoMessage.BalanceOf}
            <br /><p>0xa34ddb7393706CB3C8c4232839DCc033ECFbD0a5</p>


          </Message>

        </Form.Field>
        <Form.Field>
          <Message color="yellow" size="big" >
            <Message.Header>Confirmation List: </Message.Header>
            <p>TotalTokes for Send:<b> {ConfirmationList.TotalTokes}</b></p>
            <p>remaining {Number(ConfirmationList.TotalTokes) - Number(ConfirmationList.BalanceOf)}</p>
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
