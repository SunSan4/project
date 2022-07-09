import Layout from "../components/Layout";
import disperse from "../disperse";

const Emergency = () => {

    const singer = provider.getSigner();
    const SenderSinger = disperse.connect(singer);


    SenderSinger.WithdrawalToken(addressToken,amount);
    SenderSinger.WithdrawalETH();
    disperse.Chckbalance(addressToken);


    return ( 
        <Layout>



        </Layout>
     );
}
 
export default Emergency;