import { useDonationsContext } from '../hooks/DonationContextHook'
import { useAuthContext } from '../hooks/AuthContextHook'

const DonationCards = ({ donation }) => {
  const { dispatch } = useDonationsContext()
  const { user } = useAuthContext()


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
    </div>
  )
}

export default DonationCards