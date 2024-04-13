import React from 'react';

const UserProfile = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <img
        src="https://servicios.intec.santafe-conicet.gov.ar/grupos/iayb/wp-content/uploads/2015/04/Generic-avatar-2.png"
        alt="Profile"
        style={{ borderRadius: '50%' }}
      />
      <h1>{user.name}</h1>
      <p>Email: {user.email}</p>
      <button onClick={() => window.location.href = '/DonationHistory'}>
        View Donation History
      </button>
      <button onClick={() => window.location.href = '/Permissions'}>
        View Pending Permissions
      </button>
    </div>
    );
}

export default UserProfile;
