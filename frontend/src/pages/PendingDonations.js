import { useEffect }from 'react'
import { useDonationsContext } from "../hooks/DonationContextHook"
import { useAuthContext } from "../hooks/AuthContextHook"
import DonationCards from '../components/DonationCards'

const PendingDonations = () => {
  const {donations, dispatch} = useDonationsContext()
  const {user} = useAuthContext()

  var filteredDonations = donations
  if(donations){
    filteredDonations = donations.filter((donation) => donation.status == 'Pending')
  }
  

  useEffect(() => {
    const fetchDonations = async () => {
      const response = await fetch('/api/donate', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_DONATIONS', payload: json})
        console.log(json)
      }
    }

    if (user) {
      fetchDonations()
    }
  }, [user, dispatch])

  return (
    <div>
      {user && user.type == 'organization' && (
        <div className="pendingdonations">
          <div>
              <p>Pending Donations</p>
          </div>
          <div >
              {filteredDonations && filteredDonations.map((donation) => (
                  <div className="donationcards">
                      <DonationCards key={donation._id} donation={donation} />
                  </div>
              ))}
          </div>
      </div>
      )}
      {user && user.type != 'organization' && (
        <p>Not Authorized</p>
      )} 
      {!user && (
        <p>Please log in or sign up.</p>
      )} 
    </div>
  )
}

export default PendingDonations