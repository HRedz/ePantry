import React from 'react';
import { useEffect } from 'react';
import { useAuthContext } from '../hooks/AuthContextHook';
import { useDonationsContext } from '../hooks/DonationContextHook';
import { useNavigate } from 'react-router-dom';

const ReceivedDonations = () => {
  const { donations, dispatch } = useDonationsContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonations = async () => {
      const response2 = await fetch('/api/donate/', {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${user.token}` }
      })
      const json2 = await response2.json()
      if (response2.ok) {
        dispatch({ type: 'SET_DONATIONS', payload: json2 })
        console.log(json2)
      }
    }

    if (user) {
      fetchDonations()
    }
  }, [user, dispatch])

  return (
    <div>
      {user && user.type == 'organization' && (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <div className="donation-table-container">
            <h2>Received Donations</h2>
            <table className="donation-table">
              <thead>
                <tr>
                  <th>Donor</th>
                  <th>Date</th>
                  <th>Donation</th>
                </tr>
              </thead>
              <tbody>
                {donations?.map((donation) => (
                  <tr key={donation._id}>
                    <td>{donation.donorName}</td>
                    <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
                    <td data-title="Donation">
                      {donation.donationType === 'Monetary' ? `$${donation.amount}` : donation.donatedItems}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button className="navButton" onClick={() => navigate('/user-profile')}>
            Go Back
          </button>
        </div>
      )}
      {user && user.type != 'organization' && (
        <p>Not Authorized</p>
      )} 
      {!user && (
        <p>Please log in or sign up.</p>
      )}
    </div>
  );
};

export default ReceivedDonations;
