import 'semantic-ui-css/semantic.min.css'
import {Button, Container, Grid, Menu, Segment} from 'semantic-ui-react'
import Header from './header';
import MenuExampleInvertedSecondary from './menu';



const Layout =   ({children}) => {
    



    return ( 
      
        <Container fluid style={{margin:0}}>



             <Header/> 
        
           

            
          <Segment inverted tertiary style={{margin:40}}>
          
    {children}
    
    </Segment>

    </Container>

    
    
 
    
  
  
    );
}
 
export default Layout;