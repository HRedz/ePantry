import React, { useState } from 'react';

const PendingApplications = () => {
  // fill space until backend is added
  const [grants, setGrants] = useState([
    { id: 1, name: "Grant 1 will pull from database" },
    { id: 2, name: "Grant 2 will pull from database" },
    { id: 3, name: "Grant 3 will pull from database" },
    { id: 4, name: "Grant 4 will pull from database" },
    { id: 5, name: "Grant 5 will pull from database" }
  ]);

  // generic action for approve button
  const handleApprove = id => {
    const newGrants = grants.map(grant => {
      if (grant.id === id) {
        return { ...grant, status: "Approved" };
      }
      return grant;
    });
    setGrants(newGrants);
  };

  // generic action for deny button
  const handleDeny = id => {
    const newGrants = grants.map(grant => {
      if (grant.id === id) {
        return { ...grant, status: "Denied" };
      }
      return grant;
    });
    setGrants(newGrants);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Grants Pending Approval/Denial</h2>
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {grants.map(grant => (
          <li key={grant.id} style={{ margin: '10px', padding: '10px' }}>
            {grant.name} - Status: {grant.status}
            <div style={{ marginTop: '10px' }}>
              <button onClick={() => handleApprove(grant.id)} style={{ display: 'block', margin: '5px auto' }}>Approve</button>
              <button onClick={() => handleDeny(grant.id)} style={{ display: 'block', margin: '5px auto' }}>Deny</button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => window.location.href = '/user-profile'}>
        Go Back
      </button>
    </div>
  );
}

export default PendingApplications;
