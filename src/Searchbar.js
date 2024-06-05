import React, { useState } from 'react';
import { searchSpotify } from './services/spotify'; // Import the search function
import './Searchbar.css';

function Searchbar({ token, onSelectTrack }) { // Accept onSelectTrack as a prop
    const [userInput, setUserInput] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

    const handleChange = ({ target }) => {
        setUserInput(target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        try {
            const results = await searchSpotify(token, userInput);
            setSearchResults(results.tracks.items); // Assuming the response has the format { tracks: { items: [...] } }
        } catch (error) {
            console.error('Error searching Spotify:', error);
        }
    };

    const selectTrack = (track) => {
        onSelectTrack(track); // Call the handler passed from App
    };

    return (
        <div className='searchComponent'>
            <form className={`formInput ${submitted ? 'formSubmitted' : ''}`} onSubmit={handleSubmit}>
                <input 
                    className='formInput'
                    id='search'
                    name='search'
                    type='text'
                    onChange={handleChange}
                    value={userInput}
                    placeholder="What do you want to add?"
                />
                <button className='formInput' type='submit'><span className="material-symbols-outlined">search</span></button>
            </form>
            <div className='searchResults'>
                {searchResults.map(track => (
                    <div key={track.id} className='trackSearch'>
                        <p className='trackSearchName'>{`${track.name}\xa0-\xa0`}</p>
                        <p className='trackSearchArtist'>{track.artists.map(artist => artist.name).join(', ')}</p>
                        <button className='trackSearch' onClick={() => selectTrack(track)}><span className="trackSearch material-symbols-outlined">attach_file</span></button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Searchbar;
