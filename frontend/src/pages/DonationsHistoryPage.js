import React from 'react';

const DonationsHistoryPage = () => {

  const user = JSON.parse(localStorage.getItem('user'));

  if(!user){
    return (
        <p>Please log in or sign up.</p>
    )
  }
  
  const separateDonationHistory = () => {

    switch (user.type) {

      
      case 'individual':
        return (
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h2>Donation History</h2>
            <table border="1" style={{ margin: 'auto' }}>
              <thead>
                <tr>
                  <th>Organization</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr><td>pull from individual database</td><td>pull from individual database</td><td>pull from individual database</td></tr>
                <tr><td>pull from individual database</td><td>pull from individual database</td><td>pull from individual database</td></tr>
                <tr><td>pull from individual database</td><td>pull from individual database</td><td>pull from individual database</td></tr>
                <tr><td>pull from individual database</td><td>pull from individual database</td><td>pull from individual database</td></tr>
                <tr><td>pull from individual database</td><td>pull from individual database</td><td>pull from individual database</td></tr>
              </tbody>
            </table>
      
            <button onClick={() => window.location.href = '/user-profile'}>
              Go Back
            </button>
      
          </div>
        );

      
        case 'company':
          return (
            <div style={{ textAlign: 'center', marginTop: '20px' }}>
              <h2>Donation History</h2>
              <table border="1" style={{ margin: 'auto' }}>
                <thead>
                  <tr>
                    <th>Organization</th>
                    <th>Date</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>pull from company database</td><td>pull from company database</td><td>pull from company database</td></tr>
                  <tr><td>pull from company database</td><td>pull from company database</td><td>pull from company database</td></tr>
                  <tr><td>pull from company database</td><td>pull from company database</td><td>pull from company database</td></tr>
                  <tr><td>pull from company database</td><td>pull from company database</td><td>pull from company database</td></tr>
                  <tr><td>pull from company database</td><td>pull from company database</td><td>pull from company database</td></tr>
                </tbody>
              </table>
        
              <button onClick={() => window.location.href = '/user-profile'}>
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
