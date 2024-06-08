import React, { useState, useCallback } from 'react';
import './App.css';

import Login from './Login';
import UserProfile from './UserProfile';
import Playlist from './PlayLists';
import Searchbar from './Searchbar';
import SelectedTrack from './SelectedTrack';

const App = () => {
  const [token, setToken] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null);
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const handleAuthenticated = (token) => {
    setToken(token);
  };

  const handleSelectTrack = (track) => {
    setSelectedTrack(track);
  };

  const handleSelectPlaylist = useCallback((playlist) => {
    setSelectedPlaylist(playlist);
  }, []);

  return (
    <div>
      {!token ? (
        <Login onAuthenticated={handleAuthenticated} />
      ) : (
        <>
          <UserProfile id='upElem' token={token} />
          <div className='componentManager'>
            <Playlist id='plElem' token={token} onSelectPlaylist={handleSelectPlaylist} /> {/* Pass handler to Playlist */}
            <Searchbar id='sbElem' token={token} onSelectTrack={handleSelectTrack} /> {/* Pass handler to Searchbar */}
            <SelectedTrack
              track={selectedTrack}
              playlist={selectedPlaylist}
              token={token}
              onUpdatePlaylist={() => handleSelectPlaylist(selectedPlaylist)} // Pass the update handler
            /> {/* Render SelectedTrack here */}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
