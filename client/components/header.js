import { Button, GridRow, Menu, Segment, SegmentGroup } from "semantic-ui-react";
import Link from "next/link";
import MenuExampleInvertedSecondary from "./menu";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "./Layout";
import provider from "../provider";


const Header = () => {

  const [currentAccount,setCurrentAccount] = useState();
  const [currentNetwork,setcurrentNetwork] = useState("");
  const router = useRouter();


  async function login(){      
    try{
    const accounts = await ethereum.request({method: "eth_requestAccounts"});
    const network = await provider.getNetwork();
    setCurrentAccount(accounts[0]);
    setcurrentNetwork(network);
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
    try{
      const accounts = await ethereum.request({method: "eth_requestAccounts"});
      setCurrentAccount(accounts[0]);
      const network = await provider.getNetwork(); 
      
      setcurrentNetwork(network);
     // console.log("network",network);
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
            
            <Button.Group vertical>
      
  
            {!currentAccount?<Button primary onClick={hanleLogInClick} style = {{margin: 0}} >Connect</Button>:
            
            <Button primary style = {{margin: 0}} onClick={hanleLogInClick} >{currentAccount}</Button>
            }
            {/* <Button style = {{margin: 0}} disabled primary> Chain Id : {currentNetwork.chainId}</Button> */}
            <Button style = {{margin: 0}} disabled primary> {currentNetwork.name}</Button>
           
            
            </Button.Group >
            

           </Menu.Item>
           </Menu>
           </Menu>
           </Segment>
           

      );
}
 
export default Header;