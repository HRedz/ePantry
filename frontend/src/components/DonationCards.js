import { useDonationsContext } from '../hooks/DonationContextHook'
import { useAuthContext } from '../hooks/AuthContextHook'
import { useEffect, useState }from 'react'
import { useNavigate } from 'react-router-dom'

const DonationCards = ({ donation }) => {
  const { dispatch } = useDonationsContext()
  const { user } = useAuthContext()
  //var filteredReqs = []
  const [reqsAccepted, setReqsAccepted] = useState([])
  const [reqsPending, setReqsPending] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchReqs = async () => {
      const response = await fetch('/api/donor-history/outbound', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        var filteredReqs = json.filter((req) => req.approved == true)
        filteredReqs = filteredReqs.filter((req) => req.userRecvReq._id == donation.donationID)
        //console.log(filteredReqs)
        setReqsAccepted(filteredReqs)
        var filteredReqsPending = json.filter((req) => req.approved == false)
        filteredReqsPending = filteredReqsPending.filter((req) => req.userRecvReq._id == donation.donationID)
        setReqsPending(filteredReqsPending)
        //console.log(filteredReqsPending)
      }
    }

    if (user) {
      fetchReqs()
    }
  }, [user])


  const approve = async (e) => {
    e.preventDefault()


    const status = 'Approved'
    //console.log(donation)

    const patchdonation = await fetch('/api/donate/' + donation._id, {
        method: 'PATCH',
        body: JSON.stringify({'status' : 'Approved'}),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await patchdonation.json()

      window.location.reload();

  }

  const reject = async (e) => {
    e.preventDefault()


    const status = 'Rejected'
    //console.log(donation)

    const patchdonation = await fetch('/api/donate/' + donation._id, {
        method: 'PATCH',
        body: JSON.stringify({'status' : 'Rejected'}),
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        }
      })
      const json = await patchdonation.json()

      window.location.reload();

  }

  const reqInfo = async(e) => {
    e.preventDefault()
    //console.log('req info')
    const histReq = await fetch('/api/donor-history/' + donation.donationID, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await histReq.json()
    window.location.reload();
    //console.log(json)
  }

  const goToHistReqPage = async (e) => {
    e.preventDefault()
    navigate('/donorhistoryreq/' + donation.donationID); 
  }

  return (
    <div className='donationCardContents'>
      <div className="donorName">Donor Name: {donation.donorName}</div>
      <div className="donationBody">Type: {donation.donationType}</div>
      <div className="donationBody">Status: {donation.status}</div>
      {donation.donationType == 'Monetary' && (
        <div>
          <div className="donationBody">Amount: {donation.amount}</div>
          <div className="donationBody">Payment Date: {donation.paymentDate}</div>
        </div>
      )}
      {donation.donationType == 'Non-monetary' && (
        <div>
          <div className="donationBody">Items: {donation.donatedItems}</div>
          <div className="donationBody">Weight: {donation.itemWeight}</div>
          <div className="donationBody">Number of Packages: {donation.noOfPackages}</div>
          <div className="donationBody">Dropoff Date: {donation.dropoffDate}</div>
        </div>
      )}
      <div className='approveButton' onClick={approve}>
        <span className="approveButtonText" >Approve</span>
      </div>
      <div className='rejectButton' onClick={reject}>
        <span className="rejectButtonText" >Reject</span>
      </div>
      {!reqsAccepted.length > 0 && !reqsPending.length > 0 && (
        <div className='moreInfoButton' onClick={reqInfo}>
        <span className="moreInfoButtonText" >Request Donor History</span>
      </div>
      )} 
      {reqsPending.length > 0 && (
        <p>Donor History Request Pending</p>
      )} 
      {reqsAccepted.length > 0 && (
        <div>
          <p>History Request Accepted by Donor</p>
          <div className='viewHistButton' onClick={goToHistReqPage}>
            <span className="viewHistButtonText" >View Donor History</span>
          </div>
        </div>
      )} 
    </div>
  )
}

export default DonationCards