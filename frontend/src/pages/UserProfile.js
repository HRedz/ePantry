import React from 'react';
import { useLocation } from 'react-router-dom';     // Import useLocation

const UserProfile = () => {
    const location = useLocation();                 // Access location object
    const user = location.state.user;               // Retrieve user data passed from Login component

    return (
        <div className="user-profile">
            <h1>User Profile</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    );
}

export default UserProfile;
