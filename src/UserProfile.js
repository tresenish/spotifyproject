
// UserProfile.js
import React, { useEffect, useState } from 'react';
import { getUserProfile } from './services/spotify';
import './UserProfile.css'

const UserProfile = ({ token }) => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const profileData = await getUserProfile(token);
            setProfile(profileData);
        };

        fetchProfile();
    }, [token]);

        return (
            <div>
                {profile ? (
                <div>
                    <h1 className='profile'> <span className='profile'>Welcome,</span> {profile.display_name}</h1>
                    <img className='profile' src={profile.images[0]?.url} alt="Profile" />
                    <p className='profile'>
                        1. Choose one of your playlists by clicking on its name.<br/>
                        2. Search for a track by name using the search bar.<br/>
                        3. Click on the <span className="profileAttach material-symbols-outlined">attach_file</span> icon to select the track.<br/>
                        4. Add the selected track to the selected playlist by <br/> clicking the "Add to Playlist" button.<br/>
                    </p>

                </div>
                ) : (<p>Loading...</p>)}
            </div>
        );
};

export default UserProfile;
