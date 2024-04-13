import React from 'react';

const PendingPermissions = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Organizations Requesting to See Your Donation History</h2>
      
      <button onClick={() => window.location.href = '/user-profile'}>
        Go Back
      </button>

    </div>
  );
}

export default PendingPermissions;
