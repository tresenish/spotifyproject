// Login.js
import React, { useEffect, useState } from 'react';
import { getAuthUrl, getToken } from './services/auth';
import queryString from 'query-string';
import './Login.css';

const Login = ({ onAuthenticated }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const fetchToken = async (code) => {
      const tokenData = await getToken(code);
      setToken(tokenData.access_token);
      onAuthenticated(tokenData.access_token);
    };

    const parsed = queryString.parse(window.location.search);
    if (parsed.code) {
      fetchToken(parsed.code);
    }
  }, [onAuthenticated]);

  const handleLogin = () => {
    window.location.href = getAuthUrl();
  };

  return (
    <div>
        {!token ? (
          <>
            <div className='loginDiv'>
              <h1 className='loginH'>Mixer for Spotify</h1>
              <button className='loginButton' onClick={handleLogin}>Login with Spotify</button>
            </div>
            <p className='loginP'>© Volodymyr Korol, 2024. All rights reserved.</p>
          </>
          ) : (<div><h1>Authenticated</h1></div>)}
    </div>
);
};

export default Login;
