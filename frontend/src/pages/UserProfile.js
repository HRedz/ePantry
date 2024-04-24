import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    if(!user){
      return (
          <p>Please log in or sign up.</p>
      )
    }

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
          <button className="navButton" onClick={() => navigate('/editaccount')}>
            Edit Account Info
          </button>
          <button className="navButton" onClick={() => navigate('/donationhistory')}>
            View Donation History
          </button>
          <button className="navButton" onClick={() => navigate('/permissions')}>
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
          <button className="navButton" onClick={() => navigate('/editaccount')}>
            Edit Account Info
          </button>
          <button className="navButton" onClick={() => navigate('/donationhistory')}>
            View Donation History
          </button>
          <button className="navButton" onClick={() => navigate('/pendingapplications')}>
            Approve/Deny Grant Applications
          </button>
          <button className="navButton" onClick={() => navigate('/permissions')}>
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
          <button className="navButton" onClick={() => navigate('/editaccount')}>
            Edit Account Info
          </button>
          <button className="navButton" onClick={() => navigate('/grantstatus')}>
            View Grant Status
          </button>
          <button className="navButton" onClick={() => navigate('/receiveddonations')}>
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
