import React, { useState } from 'react';
import Login from './Login';
import UserProfile from './UserProfile';
import Playlist from './PlayLists';

const App = () => {
  const [token, setToken] = useState(null);

  const handleAuthenticated = (token) => {
    setToken(token);
  };

  return (
    <div>
      {!token ? (
        <Login onAuthenticated={handleAuthenticated} />
      ) : (<>
        <UserProfile token={token} />
        <Playlist token={token} />
        </>
      )}
    </div>
  );
};

export default App;
