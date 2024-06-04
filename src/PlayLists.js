import React, { useEffect, useState } from 'react';
import { getUserPlaylists, getPlaylistTracks } from './services/spotify';
import './PlayList.css';

const Playlist = ({ token }) => {
    const [playlists, setPlaylists] = useState([]);
    const [tracks, setTracks] = useState({});
    const [error, setError] = useState(null);

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
        } catch (error) {
            console.error('Error fetching tracks:', error);
            setError('Failed to fetch tracks.');
        }
    };

    const displayTracks = (playlistId) => {
        if (!tracks[playlistId]) {
            fetchTracks(playlistId);
            return <p>Loading tracks...</p>;
        }

        return tracks[playlistId].map((trackItem) => (
            <div key={trackItem.track.id} className='track'>
                <p className='trackName' >{`${trackItem.track.name}\xa0-\xa0`}</p>
                
                <p className='trackAuthor'> {trackItem.track.artists.map((artist) => artist.name).join(', ')}</p>
            </div>
        ));
    };

    const displayAlbums = () => {
        return playlists.map((playlist) => (
            <div className='albumSingle' key={playlist.id}>
                <h2 className='album'>{playlist.name}</h2>
                <section className='playlist'>
                    <img className='album' src={playlist.images[0]?.url} alt="Playlist logo" />
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
            ) : (<p>Loading...</p>)}
        </div>
    );
};

export default Playlist;
