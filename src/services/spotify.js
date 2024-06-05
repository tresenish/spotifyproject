import axios from 'axios';

// API endpoint
const apiEndpoint = 'https://api.spotify.com/v1';

export const getUserProfile = async (token) => {
    try {
        const response = await axios.get(`${apiEndpoint}/me`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user profile:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        }
        throw error; // Re-throw the error to handle it further up the call stack if needed
    }
};

export const getUserPlaylists = async (token) => {
    try {
        const response = await axios.get(`${apiEndpoint}/me/playlists`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user playlists:', error.response ? error.response.data : error.message);
        throw error; // Re-throw the error to handle it further up the call chain if needed
    }
};

export const getPlaylistTracks = async (token, playlistId) => {
    try {
        const response = await axios.get(`${apiEndpoint}/playlists/${playlistId}/tracks`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error fetching user tracks:', error.response ? error.response.data : error.message);
        throw error; // Re-throw the error to handle it further up the call chain if needed
    }
};

export const searchSpotify = async (token, query) => {
    try {
        const response = await axios.get(`${apiEndpoint}/search`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                q: query,
                type: 'track',
                limit: 20, // You can adjust the limit as needed
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error searching Spotify:', error.message);
        if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
        }
        throw error; // Re-throw the error to handle it further up the call stack if needed
    }
};

export const addTrackToPlaylist = async (token, playlistId, trackUri) => {
    try {
        const response = await axios.post(
            `${apiEndpoint}/playlists/${playlistId}/tracks`,
            {
                uris: [trackUri]
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
        console.log(response)
        return response;
    } catch (error) {
        console.error('Error adding track to playlist:', error);
        throw error; // Re-throw the error to handle it further up the call stack if needed
    }
};
