
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input, Message, TextArea } from "semantic-ui-react";
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

                   
          
          }
          catch (error) {
           // console.error(error);
            setErrorMessage(error.message);
            setInfoMessage("");
          }
    
        }
        fetchData();
     }
  }, [tokenAddress]);
// take remaining
  useEffect(() => {
    if(ConfirmationList && infoMessage){
    setRemaining(infoMessage.BalanceOf-ConfirmationList.TotalTokens);
    }
  },[ConfirmationList,infoMessage]);


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

            <br />Name: <b style = {{color:"black"}}>{infoMessage.Name}</b>
            <br />Symbol: <b style = {{color:"black"}}>{infoMessage.Sym}</b>
            <br />
            <br />Разрешено для отправки: <b style = {{color:"black"}}>{infoMessage.Allow}</b>
            <br />Токенов в кошельке: <b style = {{color:"black"}}>{infoMessage.BalanceOf}</b>
            <br /><p>0xa34ddb7393706CB3C8c4232839DCc033ECFbD0a5</p>


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
