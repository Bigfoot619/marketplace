import { GoogleOAuthProvider } from "@react-oauth/google";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

const Google = () => {

  const [responseMessage, setResponseMessage] = useState('');
  
  const handleSuccess  = async (credentialResponse: any) => {
    const token: any = await credentialResponse.credential;
    localStorage.setItem('token', token);
      setResponseMessage("Login successful. Welcome back!");
      setTimeout(() => {
          window.location.href = '/home';
      }, 1200);
  }

  return (
    <div className='google'>
    <GoogleOAuthProvider clientId="289225902977-odfetegoe49tv7qjfmbbhriqbu518kc1.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={(credentialResponse) => {handleSuccess(credentialResponse)}}
        onError={() => {setResponseMessage("Invalid credentials. Try again!")}}
        />
    </GoogleOAuthProvider>
    {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default Google;