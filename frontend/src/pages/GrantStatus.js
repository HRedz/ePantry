import React, { useState } from 'react';

const GrantStatus = () => {
  // State to store grant data
  const [grants] = useState([
    { id: 1, name: "Grant 1", status: "Approved" },
    { id: 2, name: "Grant 2", status: "Denied" },
    { id: 3, name: "Grant 3", status: "Pending" },
    { id: 4, name: "Grant 4", status: "Approved" }
  ]);

  // colored dots
  const statusStyles = {
    Approved: { color: 'green', backgroundColor: 'lightgreen', borderRadius: '50%' },
    Denied: { color: 'red', backgroundColor: 'pink', borderRadius: '50%' },
    Pending: { color: 'gray', backgroundColor: 'lightgray', borderRadius: '50%' }
  };

  // style to display a grant
  const Grant = ({ name, status }) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{
          height: '15px',
          width: '15px',
          marginRight: '10px',
          ...statusStyles[status]
        }}></span>
        <span>{name} - {status}</span>
      </div>
    );
  };

  
  return (
    <div style={{ margin: '20px' }}>
      <h1>Grant Status</h1>
      {grants.map(grant => (
        <Grant key={grant.id} name={grant.name} status={grant.status} />
      ))}

    <button onClick={() => window.location.href = '/user-profile'}>
    Go Back
    </button>

    </div>
  );
}

export default GrantStatus;
