import React, { useState, useEffect } from 'react';
import { useAuthContext } from "../hooks/AuthContextHook"
import { useNavigate } from 'react-router-dom';

const GrantStatus = () => {
  const {user} = useAuthContext();
  const navigate = useNavigate();

  // State to store grant data
  /*const [grants] = useState([
    { id: 1, name: "Grant 1", status: "Approved" },
    { id: 2, name: "Grant 2", status: "Denied" },
    { id: 3, name: "Grant 3", status: "Pending" },
    { id: 4, name: "Grant 4", status: "Approved" }
  ]);*/

  const [grants, setGrants] = useState(['']);

  // colored dots
  const statusStyles = {
    Approved: { color: 'green', backgroundColor: 'lightgreen', borderRadius: '50%' },
    Rejected: { color: 'red', backgroundColor: 'pink', borderRadius: '50%' },
    Applied: { color: 'gray', backgroundColor: 'lightgray', borderRadius: '50%' }
  };

  useEffect(() => {
    const fetchApps = async () => {
      const response = await fetch('/api/grantapplications', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        setGrants(json)
        console.log(json)
        
      }
    }

    if (user) {
      fetchApps()
    }
  }, [user])

  if(!user || user.type != 'organization'){
    return (
        <p>Please log in or sign up.</p>
    )
  }


  // style to display a grant
  const Grant = ({ name, status, company, amount }) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <span style={{
          height: '15px',
          width: '15px',
          marginRight: '10px',
          ...statusStyles[status]
        }}></span>
        {name && (
          <span>{name} - {status}</span>
        )}
        {!name && (
          <span>Grant Title - {status}</span>
        )}
        {company && (
          <span style={{margin: '0px 20px 0px 20px'}}>Offered By - {company}</span>
        )}
        {!company && (
          <span style={{margin: '0px 20px 0px 20px'}}>Offered By - Company Name</span>
        )}
        {amount && (
          <span style={{margin: '0px 20px 0px 20px'}}>Amount - {amount}</span>
        )}
        {!amount && (
          <span style={{margin: '0px 20px 0px 20px'}}>Amount - 10000</span>
        )}
      </div>
    );
  };

  
  return (
    <div style={{ margin: '20px' }}>
      <h1>Grant Application Status</h1>
      {grants.map(grant => (
        <Grant key={grant.id} name={grant.grantTitle} status={grant.status} company={grant.companyName} amount={grant.grantAmount} />
      ))}

    <button className="navButton" onClick={() => navigate('/user-profile')}>
    Go Back
    </button>

    </div>
  );
}

export default GrantStatus;
