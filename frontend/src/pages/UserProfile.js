import React from 'react';

const UserProfile = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div className="user-profile">
            <h1>User Profile</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    );
}

export default UserProfile;
