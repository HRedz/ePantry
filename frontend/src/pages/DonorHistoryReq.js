import { useEffect, useState }from 'react'
import { useParams } from 'react-router-dom'
//import { useDonationsContext } from "../hooks/DonationContextHook"
import { useAuthContext } from "../hooks/AuthContextHook"
import DonationCardsHistReq from '../components/DonationCardsHistReq'

const DonorHistoryReqViewer = () => {
    //const {donations, dispatch} = useDonationsContext()
    const {user} = useAuthContext()
    const [donations, setDonations] = useState([])
    const [donorName, setDonorName] = useState([])
    let { donorIdParam } = useParams();
  

  useEffect(() => {
    const fetchDonations = async () => {
      const response = await fetch('/api/donate/histreq/' + donorIdParam, {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        //console.log(json)
        setDonations(json)
      }
    }

    if (user) {
      fetchDonations()
    }
  }, [user])

  return (
    <div>
      {user && user.type == 'organization' && (
        <div className="pendingdonations">
            <div>
                <p>Donor History</p>
            </div>
            <div >
                {donations && donations.map((donation) => (
                    <div className="donationcards">
                        <DonationCardsHistReq key={donation._id} donation={donation} />
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

export default DonorHistoryReqViewer