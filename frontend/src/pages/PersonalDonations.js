import React from 'react';

const PersonalDonations = () => {
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
          <tr><td>pull from database</td><td>pull from database</td><td>pull from database</td></tr>
          <tr><td>pull from database</td><td>pull from database</td><td>pull from database</td></tr>
          <tr><td>pull from database</td><td>pull from database</td><td>pull from database</td></tr>
          <tr><td>pull from database</td><td>pull from database</td><td>pull from database</td></tr>
          <tr><td>pull from database</td><td>pull from database</td><td>pull from database</td></tr>
        </tbody>
      </table>

      <button onClick={() => window.location.href = '/user-profile'}>
        Go Back
      </button>

    </div>
  );
}

export default PersonalDonations;
