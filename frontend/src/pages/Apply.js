import { useEffect }from 'react'
import { useGrantsContext } from "../hooks/GrantsContextHook"
import { useAuthContext } from "../hooks/AuthContextHook"
import GrantCards from '../components/GrantCards'
import GrantForm from '../components/GrantForm'

const Grants = () => {
  const {grants, dispatch} = useGrantsContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchGrants = async () => {
      const response = await fetch('/api/grants', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_GRANTS', payload: json})
        console.log(json)
      }
    }

    if (user) {
      fetchGrants()
    }
  }, [user, dispatch])

  return (
    <div>
      {user && user.type == 'company' && (
          <div>
            <div className='grantForm'>
                <GrantForm />
            </div>
            <div className="grantsCompanyView">
                <div>
                    <p>My Grants</p>
                </div>
                <div >
                    {grants && grants.map((grant) => (
                        <div className="grantcards">
                            <GrantCards key={grant._id} grant={grant} />
                        </div>
                    ))}
                </div>
            </div> 
          </div> 
      )}
      {user && user.type == 'organization' && (
          
        <div className="grantsOrgView">
            <div>
                <p>Available Grants</p>
            </div>
            <div >
                {grants && grants.map((grant) => (
                    <div className="grantcards">
                        <GrantCards key={grant._id} grant={grant} />
                    </div>
                ))}
            </div>
        </div> 
      )}
      
    </div>
  )
}

export default Grants