import React from 'react';

const PendingApplications = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Grants Pending Approval/Denial</h2>
      
      <button onClick={() => window.location.href = '/user-profile'}>
        Go Back
      </button>

    </div>
  );
}

export default PendingApplications;
