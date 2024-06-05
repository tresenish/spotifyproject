import React, { useEffect, useState } from 'react';
import { getUserPlaylists, getPlaylistTracks } from './services/spotify';
import './PlayList.css';

const Playlist = ({ token, onSelectPlaylist }) => {
  const [playlists, setPlaylists] = useState([]);
  const [tracks, setTracks] = useState({});
  const [error, setError] = useState(null);
  const [visibleTracks, setVisibleTracks] = useState({});
  const [isExpanded, setIsExpanded] = useState({});
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null); // State to track selected playlist

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const playListData = await getUserPlaylists(token);
        setPlaylists(playListData.items);
      } catch (error) {
        console.error('Error fetching playlists:', error);
        setError('Failed to fetch playlists.');
      }
    };
    fetchPlaylists();
  }, [token]);

  const fetchTracks = async (playlistId) => {
    try {
      const tracksData = await getPlaylistTracks(token, playlistId);
      setTracks((prevTracks) => ({
        ...prevTracks,
        [playlistId]: tracksData.items,
      }));
      setVisibleTracks((prevVisibleTracks) => ({
        ...prevVisibleTracks,
        [playlistId]: 5, // Show first 5 tracks initially
      }));
    } catch (error) {
      console.error('Error fetching tracks:', error);
      setError('Failed to fetch tracks.');
    }
  };

  const toggleTracksVisibility = (playlistId) => {
    setVisibleTracks((prevVisibleTracks) => ({
      ...prevVisibleTracks,
      [playlistId]: (prevVisibleTracks[playlistId] === 5) ? tracks[playlistId].length : 5,
    }));
    setIsExpanded((prevIsExpanded) => ({
      ...prevIsExpanded,
      [playlistId]: !prevIsExpanded[playlistId],
    }));
  };

  const displayTracks = (playlistId) => {
    if (!tracks[playlistId]) {
      fetchTracks(playlistId);
      return <p>Loading tracks...</p>;
    }

    const visibleCount = visibleTracks[playlistId] || 5;
    const trackItems = tracks[playlistId].slice(0, visibleCount);

    return (
      <>
        {tracks[playlistId].length === 0 ? (
          <p style={{ color: '#fff' }}>No tracks</p>
        ) : (
          <>
            {trackItems.map((trackItem) => (
              <div key={trackItem.track.id} className='track'>
                <p className='trackName'>{`${trackItem.track.name}\xa0-\xa0`}</p>
                <p className='trackAuthor'>{trackItem.track.artists.map((artist) => artist.name).join(', ')}</p>
              </div>
            ))}
            {tracks[playlistId].length > 5 && (
              <button className='seeMore' onClick={() => toggleTracksVisibility(playlistId)}>
                {isExpanded[playlistId] ? 'Show Less' : 'Show More'}
              </button>
            )}
          </>
        )}
      </>
    );
  };

  const displayAlbums = () => {
    return playlists.map((playlist) => (
      <div className='albumSingle' key={playlist.id}>
        <h2
          className='album'
          onClick={() => {
            onSelectPlaylist(playlist);
            setSelectedPlaylistId(playlist.id); // Set selected playlist ID
          }}
          style={{
            color: selectedPlaylistId === playlist.id ? '#1ED760' : '#fff' // Apply color conditionally
          }}
        >
          {playlist.name}
        </h2>
        <section className='playlist'>
          {playlist.images && playlist.images.length > 0 ? (
            <img className='album' src={playlist.images[0].url} alt="Playlist logo" />
          ) : (
            <div style={{ color: '#fff' }} className='albumPlaceholder'>No Image</div>
          )}
          <div className='tracks'>{displayTracks(playlist.id)}</div>
        </section>
      </div>
    ));
  };

  return (
    <div>
      {error ? (
        <p>{error}</p>
      ) : playlists.length > 0 ? (
        <div className='albumTotal'>
          <h1 className='album'>Playlists:</h1>
          <div className='albumList'>{displayAlbums()}</div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Playlist;
