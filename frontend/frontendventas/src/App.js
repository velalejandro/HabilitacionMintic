import './App.css';
import { GoogleLogin} from 'react-google-login';
import axios from 'axios';

function App() {

  const responseGoogle = async (resp) =>{
    //console.log(resp);
    try {
      const {data} = await axios({
        method: 'POST',
        url: 'http://localhost:4001/api/auth/google/login',
        headers: {
          'Authorization': `Bearer ${resp.tokenId}`
        }
      });
     console.log(data); 
      
    } catch (error) {
      //console.log(error.toJSON());
      console.log(error.response.data);
    }
  } 


  return (
    <GoogleLogin
      clientId="1001858888851-vj8amkbf92ph64lqmsrklsmvi45r82ck.apps.googleusercontent.com"
      buttonText="Login con Google"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  );
}

export default App;
