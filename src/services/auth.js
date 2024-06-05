// auth.js
import axios from 'axios';
import queryString from 'query-string';

const authEndpoint = 'https://accounts.spotify.com/authorize';
const tokenEndpoint = 'https://accounts.spotify.com/api/token';

const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
const redirectUri = process.env.REACT_APP_SPOTIFY_REDIRECT_URI;
const scopes = [
  'user-read-private',
  'user-read-email',
  'playlist-read-private',
  'playlist-read-collaborative',
  'playlist-modify-public',
  'playlist-modify-private'
];

export const getAuthUrl = () => {
  return `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}&response_type=code&show_dialog=true`;
};

export const getToken = async (code) => {
  try {
    const response = await axios.post(
      tokenEndpoint, 
      queryString.stringify({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
        client_id: clientId,
        client_secret: clientSecret,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    console.log('Response data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching the token:', error.message);
    // if (error.response) {
    //   console.error('Response data:', error.response.data);
    //   console.error('Response status:', error.response.status);
    //   console.error('Response headers:', error.response.headers);
    // }
    // Handle the error appropriately
    throw error; // Re-throw the error if you want to handle it further up the call stack
  }
};
