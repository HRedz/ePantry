import { useEffect }from 'react'
import { useOrgsContext } from "../hooks/OrgsContextHook"
import { useAuthContext } from "../hooks/AuthContextHook"
import OrgCards from '../components/OrgCards'

const Orgs = () => {
  const {orgs, dispatch} = useOrgsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchOrgs = async () => {
      const response = await fetch('/api/users', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_ORGS', payload: json})
        console.log(json)
      }
    }

    if (user) {
      fetchOrgs()
    }
  }, [user, dispatch])

  return (
    <div className="orgs">
        <div>
            <p>Available Organizations</p>
        </div>
        <div >
            {orgs && orgs.map((org) => (
                <div className="orgcards">
                    <OrgCards key={org._id} org={org} />
                </div>
            ))}
        </div>
    </div>
  )
}

export default Orgs