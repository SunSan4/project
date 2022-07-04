import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Menu } from "semantic-ui-react";
import Layout from "../components/Layout";


const Index = () => {
    const router = useRouter();

    const [currentAccount,setCurrentAccount] = useState();
    const hanleLogInClick = async () =>{


   
      try {
   
        const accounts = await ethereum.request({method: "eth_requestAccounts"});
        setCurrentAccount(accounts[0]);
      
          }
          catch(error)
          {
        console.error(error);
    
          }
    }

    return ( <Layout>
        
        <Button.Group>
  
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
            
        </Button.Group>
        </Layout>
    
    
    );
}
 
export default Index;
