import { Button, GridRow, Label, Menu, Segment, SegmentGroup } from "semantic-ui-react";
import Link from "next/link";
import MenuExampleInvertedSecondary from "./menu";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "./Layout";
import provider from "../provider";
import disperse from "../disperse";


const Header = () => {

  const [currentAccount,setCurrentAccount] = useState("");
  const [currentNetwork,setcurrentNetwork] = useState("");
  const [currentOwnerDisperse,setcurrentOwnerDisperse] = useState(false);
  const router = useRouter();
  const [butclr,setbutclr] = useState("black");

useEffect(()=>{
  //if(!currentAccount){
    login();
   // }

  async function login(){   
      
    try{
    const accounts = await ethereum.request({method: "eth_requestAccounts"});
    const network = await provider.getNetwork();
    const ownerdisperse = await disperse.owner();
    accounts[0] = accounts[0].toUpperCase();
    ownerdisperse = ownerdisperse.toUpperCase();
    setCurrentAccount(accounts[0]);
    setcurrentNetwork(network);
    if(currentAccount == ownerdisperse){
    setcurrentOwnerDisperse(true);}
    else{setcurrentOwnerDisperse(false); }
console.log("network.chainId",network.chainId);
    switch (network.chainId) {
 
      case 1://eth
      setbutclr("grey")
        break;
      case 4: //rinkeby
      setbutclr("black")
        break;
      case 56: //bnb
      setbutclr("yellow")
        break;
      case 43114: //avax
      setbutclr("red")
        break;
      case 137: //matic
      setbutclr("purple")
        break;
      case 250: //fantom
      setbutclr("blue")
        break;
      case 42161: //arbitrum
      setbutclr("violet")
        break;
      case 10: //optimism
      setbutclr("red")
        break;
      case 1284: //Moonbeam
      setbutclr("teal")
        break;
      case 1285: //Moonriver
      setbutclr("teal")
        break;
      case 66: //OKXChain
      setbutclr("blue")
        break;
    }
 
    }
    catch(error)
    {
  console.error(error);
    }
};

},[currentAccount]);


  const hanleLogInClick = async () =>{
    try{
      const accounts = await ethereum.request({method: "eth_requestAccounts"});
      setCurrentAccount(accounts[0]);
      const network = await provider.getNetwork(); 
      
      setcurrentNetwork(network);
     // console.log("network",network);
    // console.log("network.chainID", network.chainId);

      }
      catch(error)
      {
    console.error(error);

      }
    }

    return ( 
      <Segment inverted>
               <Menu  inverted>  
               
               <h1 style = {{margin: 20}}>LOGOS</h1>
               
      <Menu floated="right" inverted>
                  {/* убрать ошикбу 404 favicon */}
                  <link rel="icon" href="data:;base64,="/>
                  
      <Menu.Item>

            {!currentOwnerDisperse?"":
            
            <Button negative onClick={()=>router.push("/emergency")} style = {{margin: 20}}>emergency</Button>
            } 

             {!currentAccount?<Button loading style = {{margin: 20}}>Connect</Button>:
            
            <Button positive onClick={()=>router.push("/")} style = {{margin: 20}}>Dispers</Button>
            } 
              {!currentAccount?<Button loading style = {{margin: 20}}>Connect</Button>:
            
            <Button positive onClick={()=>router.push("/SimSender")} style = {{margin: 20}}>Simple Sender</Button>

            } 
            
            <Button.Group vertical>
      
  
            {!currentAccount?<Button primary onClick={hanleLogInClick} style = {{margin: 0}} >Connect</Button>:
            
            <Button color={butclr} style = {{margin: 0}} onClick={hanleLogInClick} >{currentAccount}</Button>
            }
            {/* <Button style = {{margin: 0}} disabled primary> Chain Id : {currentNetwork.chainId}</Button> */}
            <Button style = {{margin: 0}} disabled color={butclr}> {currentNetwork.name}</Button>
           
            
            </Button.Group >
            

           </Menu.Item>
           </Menu>
           </Menu>
           </Segment>
           

      );
}
 
export default Header;