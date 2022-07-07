import { Button, Menu, Segment, SegmentGroup } from "semantic-ui-react";
import Link from "next/link";
import MenuExampleInvertedSecondary from "./menu";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "./Layout";


const Header = () => {

  const [currentAccount,setCurrentAccount] = useState();
  const router = useRouter();
 

  const hanleLogInClick = async () =>{
    try{
      const accounts = await ethereum.request({method: "eth_requestAccounts"});
      setCurrentAccount(accounts[0]);
      }
      catch(error)
      {
    console.error(error);

      }
    }

    return ( 
      <Segment inverted>
               <Menu  inverted>  
      <Menu floated="right" inverted>
                  {/* убрать ошикбу 404 favicon */}
                  <link rel="icon" href="data:;base64,="/>
                  
      <Menu.Item>

             {!currentAccount?<Button loading style = {{margin: 20}}>Connect</Button>:
            
            <Button positive onClick={()=>router.push("/")} style = {{margin: 20}}>Dispers</Button>
            } 
              {!currentAccount?<Button loading style = {{margin: 20}}>Connect</Button>:
            
            <Button positive onClick={()=>router.push("/sender")} style = {{margin: 20}}>Sender</Button>

            } 
            {!currentAccount?<Button primary onClick={hanleLogInClick} style = {{margin: 20}}>Connect</Button>:
            
            <Button primary style = {{margin: 20}}>{currentAccount}</Button>
            }        

           </Menu.Item>
           </Menu>
           </Menu>
           </Segment>
           

      );
}
 
export default Header;