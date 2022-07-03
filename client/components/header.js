import { Button, Menu, Segment } from "semantic-ui-react";
import Link from "next/link";
import MenuExampleInvertedSecondary from "./menu";
import { useState } from "react";
import { useRouter } from "next/router";


const Header = () => {

  const [currentAccount,setCurrentAccount] = useState();
  const router = useRouter();
  
  async function login(){
    const {ethereum} = window;
    if(!ethereum) {
      alert("install MM");
              }
              try{
              const accounts = await ethereum.request({method: "eth_requestAccounts"});
              setCurrentAccount(accounts[0]);
              }
              catch(error)
              {
            console.error(error);
        
              }
          
  };

  if(!currentAccount){
    login();
  }

  const hanleLogInClick = async () =>{
    
  
 
  

  }

    return ( 
        <Segment inverted>
          {/* убрать ошикбу 404 favicon */}
          <link rel="icon" href="data:;base64,="/>

      
                   
                 
      <Menu.Item position='left'>
            {!currentAccount?<Button primary onClick={hanleLogInClick}>Connect</Button>:
            
            <Button primary >{currentAccount}</Button>
            }
            {!currentAccount?<Button loading >Connect</Button>:
            
            <Button positive onClick={()=>router.push("/sender")}>Sender</Button>
            }
        

           </Menu.Item>
      </Segment>
      );
}
 
export default Header;