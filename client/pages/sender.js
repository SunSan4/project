import { utils } from "ethers";
import { useState } from "react";
import { Button, Checkbox, Form, Input, Message, Select, TextArea } from "semantic-ui-react";
import Layout from "../components/Layout";
import disperse from "../disperse";
import provider from "../provider";
import SendList from "../utils/ArraySendList";
import ch_approve from "../utils/ch_approve";
import try_approve from "../utils/try_approve";


const sender = () => {
    const [CheckApprove, setCheckApprove] = useState(false);
    const [Token, setToken] = useState("");
    const [AreaWA, setAreaWA] = useState("");
   // const [stoper,setStoper] = useState(0);
    const [Chbox,SetChbox] = useState(false);




    const [erroMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [Information,setInformMessage] = useState("");

    const [isLoading, setLoading] = useState(false);
    const TokenAddress = Token;
    const preTokenA = "";
    
    

    const singer = provider.getSigner();
    const SenderSinger = disperse.connect(singer);



    
    const wallets = AreaWA.trim().split('\n');

    const wallet = [];
    const amount = [];
    const totaltokens = 0;
    const preTokens = 0;
    const preWA = 0;


    const options = [
        { key: 'E', text: 'ETH', value: 'eth' },
        { key: 'B', text: 'BSC', value: 'bsc' },
        { key: 'M', text: 'MATIC', value: 'matic' },
    ]
    
 
    if (TokenAddress !== preTokenA ) {
        
        checkers(TokenAddress);
      //  console.log("preTokenA",preTokenA);
       // console.log("TokenAddress",TokenAddress);
        //console.log("Chbox",Chbox);
        
        
    }
  




    async function checkers(adress) {

        preTokenA = adress;

            


       try{
        //if unlim
        if(Chbox && CheckApprove){setCheckApprove(false)};

        const ch_allows = await ch_approve(adress);
        console.log("ch_allows",ch_allows);
        //console.log("wallets",wallets);
        
        if((AreaWA && AreaWA !== preWA)){
            const List = await SendList(AreaWA);

        preWA = AreaWA;
        preTokens = List.TotalTokes;
        console.log("preTokens",preTokens);
        
        setInformMessage("TotalTokens for send :" + List.TotalTokes);
       // setErrorMessage("");
            }


       if(ch_allows <preTokens){

       //reset error && active button
        
        setCheckApprove(false);
       }else{setCheckApprove(true);} 
        
    }     
           catch (error) {
                setErrorMessage("");     
                console.error(error);
                 setErrorMessage("проверь адрес токена  -  Ошибка :" + error.message);
                 setCheckApprove(false);
                 
           }
      


        return;
    }




    const handApprove = async (event) => {
            event.preventDefault();
            setErrorMessage("");
            setSuccessMessage("");

                    try {
                        const List = await SendList(AreaWA);
                        
                        const tok = 0;
                        if(Chbox){
                            //tok = "999999999999999999".toString();
                            tok = "999999999999999999";
                        }
                        else{

                           // tok = utils.parseEther(List.TotalTokes).toString();
                           tok =List.TotalTokes.toString();
                            
                        }
                      //  console.log("tok",tok);
                        const approve = await try_approve(TokenAddress,tok);
                        
                        setSuccessMessage("hash: " + approve.response.hash);
                        if(setSuccessMessage){setCheckApprove(true);}
                       // console.log("approve", approve);
                        
                    } catch (error) {
                        console.error(error);
                        setErrorMessage(error.message);
                    } finally {
                        setLoading(false);
                    }


        }


        const handleSublit = async (event) => {
            event.preventDefault();
            setErrorMessage("");
            setSuccessMessage("");


            try {
                
                const List = await SendList(AreaWA);


                const response = await SenderSinger.disperseToken(TokenAddress, List.wallet, List.value);
                
                setSuccessMessage("hash: " + response);
            }
            catch (error) {
                console.error(error);
                setErrorMessage(error.message);
            } finally {
                setLoading(false);
            }


        }


        return (<Layout>
            <Form error={!!erroMessage} success={!!successMessage} onSubmit={handleSublit}>
                <Form.Group>
                    {/* <Form.Field control={Select} label='Chain' options={options} placeholder='Chain' /> */}
                </Form.Group>
                <Form.Group widths='equal'>
                    <Form.Field control={Input} label='Token' value={Token} placeholder='0x...' onChange={event => setToken(event.target.value)} />

                    <Form.Field control={TextArea} label="Wallets Tokens" value={AreaWA} placeholder='Wallets Tokens' onChange={event => setAreaWA(event.target.value)} />


                </Form.Group>
                <Form.Checkbox label='Unlimitted Approve' control={Checkbox} checked={Chbox?true:false} onChange={() =>SetChbox(!Chbox)}/>
                {CheckApprove ?<Button loading={isLoading} primary>Send</Button>:
                <Button loading={isLoading}  disabled primary>Send</Button>}

                {!CheckApprove ? <Button loading={isLoading} primary type='submit' onClick={handApprove}>Approve</Button> :
                    <Button loading={isLoading} disabled type='submit' onClick={handApprove}>Approve</Button>}

                <Message style={{ wordBreak: 'break-word' }} error header='Error:' content={erroMessage} />
                <Message success header='success:' content={successMessage} />
                <Message info>
                <Message.Header>Info: </Message.Header>
                <p>{Information}</p>
                </Message>
            </Form>
            <p></p>
            <p>test tokens:</p>
            <p>0xa34ddb7393706CB3C8c4232839DCc033ECFbD0a5</p>



        </Layout>);
    }

    export default sender;