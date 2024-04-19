import React from "react";

const ReceivedDonations = () => {

    return (
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <h2>Received Donations</h2>
          <table border="1" style={{ margin: 'auto' }}>
            <thead>
              <tr>
                <th>Donor</th>
                <th>Date</th>
                <th>Donation</th>
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

}

export default ReceivedDonations;