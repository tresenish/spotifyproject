
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
                </div>
                ) : (<p>Loading...</p>)}
            </div>
        );
};

export default UserProfile;
