import React from 'react';
import { useEffect } from 'react';
import { useDonorHistReqsContext } from '../hooks/DonorHistReqContextHook';
import { useAuthContext } from "../hooks/AuthContextHook";
import DonorHistReqCards from '../components/DonorHistReqCards';
import { useNavigate } from 'react-router-dom';

const PendingPermissions = () => {
  const { donorHistReqs, dispatch } = useDonorHistReqsContext();
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDonorHistReqs = async () => {
      const response = await fetch('/api/donor-history/inbound', {
        headers: { 'Authorization': `Bearer ${user.token}` },
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({ type: 'SET_DonorHistReqs', payload: json })
        console.log(json)
      }
    }

    if (user) {
      fetchDonorHistReqs()
    }
  }, [user, dispatch])

  return (
    <div>
      {user && user.type != 'organization' && (
        <div>
          <div className='pendingPermTextContainer'>
            <p>Organizations requesting to view your history:</p>
            <p>Organizations approved to view your history:</p>
          </div>
          <div className="donorHistReqCardsContainer">
            <div className="falseApprovalContainer">
              {donorHistReqs && donorHistReqs
                .filter(donorHistReq => donorHistReq.approved === false) // Filtering condition
                .map(donorHistReq => (
                  <DonorHistReqCards key={donorHistReq._id} donorHistReq={donorHistReq} />
                ))
              }
            </div>
            <div className="trueApprovalContainer">
              {donorHistReqs && donorHistReqs
                .filter(donorHistReq => donorHistReq.approved === true) // Filtering condition
                .map(donorHistReq => (
                  <DonorHistReqCards key={donorHistReq._id} donorHistReq={donorHistReq} />
                ))
              }
            </div>
          </div>
            <button className="navButton" onClick={() => navigate('/user-profile')}>
              Go Back
            </button>
        </div>
      )}
      {user && user.type == 'organization' && (
        <p>Not Authorized</p>
      )} 
      {!user && (
        <p>Please log in or sign up.</p>
      )} 
    </div>

  );
}

export default PendingPermissions;
