import React from 'react';
import axios from 'axios';
import './SelectedTrack.css';

const SelectedTrack = ({ track, playlist, token, onUpdatePlaylist }) => {
    if (!track) {
        return null;
    }

    const handleAddition = async () => {
        if (!playlist) {
            alert('Please select a playlist first.');
            return;
        }

        try {
            const response = await axios.post(
                `https://api.spotify.com/v1/playlists/${playlist.id}/tracks`,
                {
                    uris: [track.uri]
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (response.status === 201) {
                alert('Track added to playlist!');
                onUpdatePlaylist(); // Call the function to update the playlist
            }
        } catch (error) {
            console.error('Error adding track to playlist:', error);
            alert('Failed to add track to playlist.');
        }
    };

    return (
        <div className='rightSelectedTrack'>
            <h3 className='rightSelectedTrackH'>Selected Track:</h3>
            {track.album.images && track.album.images.length > 0 && (
                <img
                    className='rightSelectedTrackImage'
                    src={track.album.images[0].url}
                    alt={`${track.name} album cover`}
                />
            )}
            <p className='rightSelectedTrackName'>{track.name}</p>
            <p className='rightSelectedTrackArtist'>{track.artists.map(artist => artist.name).join(', ')}</p>
            <p className='rightSelectedTrackAlbum'>{`Album: ${track.album.name}`}</p>
            <button className='addToPlayList' onClick={handleAddition}>Add to Playlist</button>
            {playlist ? (
                <p style={{ color: '#1ED760' }}>Selected Playlist: {playlist.name}</p>
            ) : (
                <p style={{ color: 'red' }}>No playlist selected</p>
            )}
        </div>
    );
};

export default SelectedTrack;
