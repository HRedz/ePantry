import React, { useState } from 'react';
import { useAuthContext } from '../hooks/AuthContextHook'
import { useDonorHistReqsContext } from '../hooks/DonorHistReqContextHook';

const DonorHistReqCards = ({ donorHistReq }) => {
  const { user } = useAuthContext();
  const { dispatch } = useDonorHistReqsContext();
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isFading, setIsFading] = useState(false);

  const patchApprovalStatus = async (status) => {

    const bodyContent = JSON.stringify({
      _id: donorHistReq._id,
      approvalStatus: status
    });

    const response = await fetch('/api/donor-history/', {
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${user.token}`,
        'Content-Type': 'application/json'
      },
      body: bodyContent  // Include the body in the fetch call
    });
    const json = await response.json()

    if (response.ok) {
      console.log(json)
      setConfirmationMessage('Status updated successfully!');
      setIsFading(true);
      setTimeout(() => {
        setConfirmationMessage('');
        dispatch({ type: 'REMOVE_DonorHistReq', payload: donorHistReq._id });
      }, 3000);
    }
    else {
      console.error('Failed to update status:', json);
    }
  };

  return (
      donorHistReq.approved ? 
      (
        <div className={'DonorHistReqCardContents' + (isFading ? ' fading' : '')} style={{ opacity: isFading ? 0 : 1 }}>
        <div className="DonorHistReqName">{donorHistReq.userSendingReq.name}</div>
        {confirmationMessage && <p>{confirmationMessage}</p>}
        <div className="button-container"> 
              <div className='approveDonorHistReq' onClick={() => patchApprovalStatus(false)}>
                <span className="revokeDonorHistReqButtonText">Revoke</span>
              </div>
        </div>
      </div>
      )
      :
      (
        <div className={'DonorHistReqCardContents' + (isFading ? ' fading' : '')} style={{ opacity: isFading ? 0 : 1 }}>
        <div className="DonorHistReqName">{donorHistReq.userSendingReq.name}</div>
        {confirmationMessage && <p>{confirmationMessage}</p>}
        <div className="button-container"> 
                <div className='approveDonorHistReq' onClick={() => patchApprovalStatus(true)}>
                  <span className="approveDonorHistReqButtonText">Approve</span>
                </div>
                <div className='denyDonorHistReq' onClick={() => patchApprovalStatus(false)}>
                  <span className="denyDonorHistReqButtonText">Deny</span>
                </div>
        </div>
      </div>
      )
  )
}

export default DonorHistReqCards