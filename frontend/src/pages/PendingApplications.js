import React, { useEffect } from 'react';
import { useAuthContext } from "../hooks/AuthContextHook";
import { useGrantsContext } from "../hooks/GrantsContextHook";
import { useNavigate } from 'react-router-dom';

const GrantStatus = () => {
  const { user } = useAuthContext();
  const { grants, dispatch } = useGrantsContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApps = async () => {
      const response = await fetch('/api/grantapplications/', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      });
      const json = await response.json();

      // Display the latest five applications
      if (response.ok) {
        dispatch({ type: 'SET_GRANTS', payload: json });
        console.log(json);
      }
    };

    if (user) {
      fetchApps();
    }
  }, [user, dispatch]);

  const handleApprove = async (id) => {
    const response = await fetch(`/api/grantapplications/approve/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      }
    });
    if (response.ok) {
      dispatch({ type: 'SET_GRANTS', payload: grants.map(grant => grant.id === id ? { ...grant, status: 'Approved' } : grant) });
    } else {
      const error = await response.json();
      alert(error.message || 'Failed to approve application');
    }
  };

  const handleReject = async (id) => {
    const response = await fetch(`/api/grantapplications/reject/${id}`, {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json',
      }
    });
    if (response.ok) {
      dispatch({ type: 'SET_GRANTS', payload: grants.map(grant => grant.id === id ? { ...grant, status: 'Rejected' } : grant) });
    } else {
      const error = await response.json();
      alert(error.message || 'Failed to reject application');
    }
  };


  if (!grants) return <p>Loading applications...</p>;


  return (
    <div>
      {user && user.type == 'company' && (
        <div style={{ textAlign: 'left', marginTop: '20px' }}>
          <div className="grant-application-container">
            <h2>Grant Application Status</h2>
            <table className="grant-table">
              <thead>
                <tr>
                  <th>Grant Title</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {
                  grants?.filter(grant => grant.status === 'Applied').map((grant) => (
                    <tr key={grant._id}>
                      <td data-title="Grant Title">{grant.grantTitle}</td>
                      <td data-title="Amount">{`$${grant.grantAmount}`}</td>
                      <td>
                        <button className="navButton" onClick={() => handleApprove(grant._id)} style={{ margin: '5px' }}>Approve</button>
                        <button className="navButton" onClick={() => handleReject(grant._id)} style={{ margin: '5px' }}>Deny</button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
          <button className="navButton" onClick={() => navigate('/user-profile')} style={{ marginTop: '20px' }}>
            Go Back
          </button>
        </div>
      )}
      {user && user.type != 'company' && (
        <p>Not Authorized</p>
      )} 
      {!user && (
        <p>Please log in or sign up.</p>
      )} 
    </div>
  );
};

export default GrantStatus;
