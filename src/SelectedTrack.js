import React from 'react';
import { addTrackToPlaylist } from './services/spotify';
import './SelectedTrack.css';

const SelectedTrack = ({ track, playlist, token }) => {
    if (!track) {
        return null;
    }

    const handleAddition = async () => {
        if (!playlist) {
            alert('Please select a playlist first.');
            return;
        }

        try {
            const response = await addTrackToPlaylist(token, playlist.id, track.uri);
            if (response.status === 201) {
                alert('Track added to playlist!');
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
                <p className='selectedPlaylistMessage'>Selected Playlist: {playlist.name}</p>
            ) : (
                <p className='selectedPlaylistMessage' style={{ color: 'red' }}>No playlist selected</p>
            )}
        </div>
    );
};

export default SelectedTrack;
