import React, { useState } from 'react';
import './App.css';

import Login from './Login';
import UserProfile from './UserProfile';
import Playlist from './PlayLists';
import Searchbar from './Searchbar';
import SelectedTrack from './SelectedTrack'; // Import the SelectedTrack component

const App = () => {
  const [token, setToken] = useState(null);
  const [selectedTrack, setSelectedTrack] = useState(null); // Add state for selected track
  const [selectedPlaylist, setSelectedPlaylist] = useState(null); // Add state for selected playlist

  const handleAuthenticated = (token) => {
    setToken(token);
  };

  const handleSelectTrack = (track) => {
    setSelectedTrack(track);
  };

  const handleSelectPlaylist = (playlist) => {
    setSelectedPlaylist(playlist);
  };

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
              onUpdatePlaylist={handleSelectPlaylist}
            /> {/* Render SelectedTrack here */}
          </div>
        </>
      )}
    </div>
  );
};

export default App;
