import React from 'react';

const UserProfile = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    const separateProfiles = () => {
      switch (user.type) {
        
        
        case 'individual':
          return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <img
            src="https://servicios.intec.santafe-conicet.gov.ar/grupos/iayb/wp-content/uploads/2015/04/Generic-avatar-2.png"
            alt="Profile"
            style={{ borderRadius: '50%' }}
          />
          <h1>Individual: {user.name}</h1>
          <p>Email: {user.email}</p>
          <button onClick={() => window.location.href = '/donationhistory'}>
            View Donation History
          </button>
          <button onClick={() => window.location.href = '/permissions'}>
            View Pending Permissions
          </button>
        </div>
        );

        
        
        case 'company':
          return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <img
            src="https://servicios.intec.santafe-conicet.gov.ar/grupos/iayb/wp-content/uploads/2015/04/Generic-avatar-2.png"
            alt="Profile"
            style={{ borderRadius: '50%' }}
          />
          <h1>Company: {user.name}</h1>
          <p>Email: {user.email}</p>
          <button onClick={() => window.location.href = '/donationhistory'}>
            View Donation History
          </button>
          <button onClick={() => window.location.href = '/permissions'}>
            View Pending Permissions
          </button>
        </div>
        );

        
        
        case 'organization':
          return (
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <img
            src="https://servicios.intec.santafe-conicet.gov.ar/grupos/iayb/wp-content/uploads/2015/04/Generic-avatar-2.png"
            alt="Profile"
            style={{ borderRadius: '50%' }}
          />
          <h1>Organization: {user.name}</h1>
          <p>Email: {user.email}</p>
          <button onClick={() => window.location.href = '/donationhistory'}>
            View Donation History
          </button>
          <button onClick={() => window.location.href = '/'}>
            Approve/Deny Donation Applications
          </button>
          <button onClick={() => window.location.href = '/'}>
            View Grant Status
          </button>
          <button onClick={() => window.location.href = '/'}>
            Donations Received
          </button>
        </div>
        );


        default:
          return <p>Profile Error</p>
      }
    };

    return (
      <div>
        {separateProfiles()}
      </div>
    );

}

export default UserProfile;
