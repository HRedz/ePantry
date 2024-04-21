import React, { useEffect, useState } from "react";
import axios from 'axios';

const ReceivedDonations = () => {
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await axios.get('/api/donations');
        setDonations(response.data);
      } catch (error) {
        console.error('Failed to fetch donations:', error);
      }
    };

    fetchDonations();
  }, []);

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
          {donations.map((donation) => (
            <tr key={donation.id}>
              <td>{donation.donorName}</td>
              <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
              <td>{donation.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="navButton" onClick={() => window.location.href = '/user-profile'}>
        Go Back
      </button>
    </div>
  );
};

export default ReceivedDonations;
