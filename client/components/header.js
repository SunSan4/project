import { Button, Menu, Segment, } from "semantic-ui-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import provider from "../provider";
import disperse from "../disperse";


const Header = () => {

  const [currentAccount,setCurrentAccount] = useState("");
  const [currentNetwork,setcurrentNetwork] = useState("");
  const [currentOwnerDisperse,setcurrentOwnerDisperse] = useState(false);
  const router = useRouter();
  const [butclr,setbutclr] = useState("black");

useEffect(()=>{
  if(!currentAccount){
    login;
      }
   //ethereum.on('chainChanged', (_chainId) => window.location.reload()); 
  
  
   
   const login = async()=>{ 
    //setCurrentAccount("");
    //setcurrentNetwork("");
    try{
    const accounts = await ethereum.request({method: "eth_requestAccounts"});
    accounts[0] = accounts[0].toUpperCase();
    const network = await provider.getNetwork();
    
    setcurrentNetwork(network);
    const ownerdisperse = await disperse.owner();
    ownerdisperse = ownerdisperse.toUpperCase();
    setCurrentAccount(accounts[0]);
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

    if(currentAccount == ownerdisperse){
    setcurrentOwnerDisperse(true);}
    else{setcurrentOwnerDisperse(false); }
 
    }
    catch(error)
    {
  console.error(error);
  
  //setcurrentNetwork("");
  //setCurrentAccount("");
    }
   
};
login();
//ethereum.on('chainChanged', login);


},[currentAccount,currentNetwork]);
//console.log("currentAccount",currentAccount);
//const ch_acc = ethereum.on('chainChanged', login);//ethereum;//'chainChanged'
//console.log("ch_acc",ch_acc);

  const hanleLogInClick = async (event) =>{
    event.preventDefault();
    
    try{

      const accounts = await ethereum.request({method: "eth_requestAccounts"});
      setCurrentAccount(accounts[0]);
      //const chainId = await ethereum.request({ method: 'eth_chainId' });
      //chainId = ethers.utils.formatUnits(chainId,0);
      const chainId = await ethereum.request({ method: 'net_version' });
     // console.log("netw",netw);
 
      

      const network = await provider.getNetwork(); 
      //network2 = ethers.utils.formatEther(network2);

      setcurrentNetwork(network);
      console.log("network",network);

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
        setbutclr("red");
        network.name = "Avax";
        setcurrentNetwork(network.name);
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
        network.name = "Moonriver";
        setcurrentNetwork(network.name);
          break;
        case 66: //OKXChain
        setbutclr("blue")
          break;
        case 11155111: //Groerly
          setbutclr("black")
          break;
      }

      
     console.log("network.chainID", network.chainId);

      }
      catch(error)
      {
    console.error(error);

      }
    }

    return ( 
      <Segment inverted>
               <Menu  inverted>  
               
               <h1 style = {{margin: 20}}>WLV</h1>
               
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