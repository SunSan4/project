import { useRef, useState } from "react";
import { Form,Button,Checkbox, Message } from "semantic-ui-react";
import Layout from "../components/Layout";
import {BigNumber, ethers, utils} from "ethers";
import provider from "../provider";
import disperse from "../disperse";
import try_show from "../utils/try_show";
import try_approve from "../utils/try_approve";
import ch_approve from "../utils/ch_approve";

const show = () => {


    const addressRef = useRef();
    const [erroMessage,setErrorMessage] = useState("");

    const walletsRef = useRef();
    const [NameD,setName] =useState();

   



    const handleSubmit = async (event)=>{
        event.preventDefault();
        const address = addressRef.current.value;
        const wallets = walletsRef.current.value.toString().split('\n'); 
        const wallet=[];
        const value=[];
        const totaltokens =0;
        wallets.forEach(w1 => {
            const t1=w1.split(' ');
            const v1 =utils.parseEther(t1[1]);
            
            wallet.push(t1[0]);
            value.push(v1.toString());
            totaltokens +=parseInt(t1[1]);

            console.log("v1",value);
            
            
        });
            // toString().replace(/ /g, ',')];
       // wallets = wallets.includes("0x");
        
        
        console.log("address:",address);
        console.log("wallet:",wallet, "value:",value);
        //сброс ошибки
        setErrorMessage();
        //если пусто то ошибка
        if(!address){
                setErrorMessage("Пустой адрес");
        return;
        }
        //start connect to mm
        
        const singer = provider.getSigner();
        //console.log(provider.functions);
        const disperseSinger = disperse.connect(singer);
        //console.log("disperseSinger",disperseSinger);
        //connect to contract



        try{
            //просмотреть контракт на название
            const show = await try_show(address);
            setName(show.NameD);
            console.log("totaltokens",totaltokens.toString());
           

            //проверка контракта на апрув токенов
            const ch_allows = await ch_approve(address);
            console.log("ch_allows",ch_allows);

            // если токенов разрешено меньше то апрувить ещё
            if (ch_allows < totaltokens) {
            const approve = await try_approve(address,totaltokens.toString());
            console.log("approve",approve);
            }


            const response = await disperseSinger.disperseToken(address,wallet,value);
            console.log("response",response);


            setSuccessMessage("hash:" + response.hash);

            
           

        }catch(error){
            console.error(error);
            setErrorMessage(error.message);
        }
    


    }
    return (<Layout>
        
        <Form error={!!erroMessage} onSubmit={handleSubmit}>
        <Form.Field>
          <label>Рассылка перебором(простая)</label>
          <input ref={addressRef} placeholder='адрес токена' />
          </Form.Field>
          <Form.Field>
          <textarea ref={walletsRef} label='wallets' placeholder='address value' >
  
          </textarea>
        </Form.Field>

        
        <Form.Field>
          <Checkbox label='чек бокс test' />
        </Form.Field>
        <Button primary type='submit'>Submit</Button>
        <Message error
            header = 'Error:'
            content = {erroMessage}
          />        

       
      </Form>
      
      {/* отобразить если есть */}
      {NameD && <h2>Name:{NameD}</h2>}

      </Layout>  );
}
 
export default show;