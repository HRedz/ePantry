import React from 'react';
import { useEffect } from 'react';
import { useAuthContext } from '../hooks/AuthContextHook';
import { useDonationsContext } from '../hooks/DonationContextHook';

const DonationsHistoryPage = () => {

  const { donations, dispatch } = useDonationsContext();
  const { user } = useAuthContext();
  const userLocal = JSON.parse(localStorage.getItem('user'));

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

  if (!userLocal) {
    return (
      <p>Please log in or sign up.</p>
    )
  }

  const separateDonationHistory = () => {

    switch (userLocal.type) {


      case 'individual':
        return (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <div className="donation-table-container">
              <h2>Donation History</h2>
              <table className="donation-table">
                <thead>
                  <tr>
                    <th>Organization</th>
                    <th>Type</th>
                    <th>Donation</th>
                  </tr>
                </thead>
                <tbody>
                  {donations?.map((item) => (
                    <tr key={item._id}>
                      <td data-title="Organization">
                        {item.orgName}
                      </td>
                      <td data-title="Type">
                        {item.donationType}
                      </td>
                      <td data-title="Donation">
                        {item.donationType === 'Monetary' ? `$${item.amount}` : item.donatedItems}  
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


            <button className="navButton" onClick={() => window.location.href = '/user-profile'}>
              Go Back
            </button>

          </div>
        );


      case 'company':
        return (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <div className="donation-table-container">
              <h2>Donation History</h2>
              <table className="donation-table">
                <thead>
                  <tr>
                    <th>Organization</th>
                    <th>Type</th>
                    <th>Donation</th>
                  </tr>
                </thead>
                <tbody>
                  {donations?.map((item) => (
                    <tr key={item._id}>
                      <td data-title="Organization">
                        {item.orgName}
                      </td>
                      <td data-title="Type">
                        {item.donationType}
                      </td>
                      <td data-title="Donation">
                        {item.donationType === 'Monetary' ? `$${item.amount}` : item.donatedItems}  
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <button className="navButton" onClick={() => window.location.href = '/user-profile'}>
              Go Back
            </button>

          </div>
        );

      default:
        return <p>Failed to pull history</p>
    }

  }

  return (
    <div>
      {separateDonationHistory()}
    </div>
  )

}

export default DonationsHistoryPage;
