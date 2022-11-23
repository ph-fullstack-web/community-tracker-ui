import React, { useState } from 'react'
import {LoginTemplate} from 'components';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from "contexts/auth/AuthContext";
import { useLogin, useGoogleLogin } from "hooks";

const Login = () => {
  const { mutate: loginMutate } = useLogin();
  const { mutate: googleLoginMutate } = useGoogleLogin();
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();  

  const [error, setError] = useState("");
  const [credentials, setCredentials] = useState({ id: "", password: "" });

  const handleCredentials = (e) => {
    const value = e.target.value;
    setCredentials({ ...credentials, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "AUTH_LOADING" });

    const args = {
      cognizant_id: credentials.id,
      password: credentials.password,
    }
    
    loginMutate(args, {
      onSuccess: (data) => {
        dispatch({
          type: "LOGIN",
          payload: { success: "success", data},
        });
        navigate('/communities');
      },
      onError: (error) => {
       setError(error.message);
      }
    });
  };

  const handleGoogleLogin = (response) => {
    const token = response?.credential;
    if(token) {
      googleLoginMutate({ token } , {
        onSuccess: ({ access_token, data: people }) => {
          dispatch({
            type: "LOGIN",
            payload: { success: "success", data: {
              access_token,
              data: {...people }
            }},
          });
          navigate('/communities');
        },
        onError: (error) => {
         setError(error.message);
        }
      })
    }   
  };

  return (
    <LoginTemplate
      handleCredentials={handleCredentials}
      credentials={credentials}
      handleGoogleLogin={handleGoogleLogin}
      handleSubmit={handleSubmit}
      error={error}
    />
  )
}

export default Login