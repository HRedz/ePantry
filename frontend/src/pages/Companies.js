import { useEffect }from 'react'
import { useCompaniesContext } from "../hooks/CompanyContextHook"
import { useAuthContext } from "../hooks/AuthContextHook"
import CompanyCards from '../components/CompanyCards'

const Companies = () => {
  const {companies, dispatch} = useCompaniesContext()
  const {user} = useAuthContext()

  useEffect(() => {
    const fetchCompanies = async () => {
      const response = await fetch('/api/users', {
        headers: {'Authorization': `Bearer ${user.token}`},
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_COMPANIES', payload: json})
        console.log(json)
      }
    }

    if (user && user.type == 'organization') {
      fetchCompanies()
    }
  }, [user, dispatch])

  return (
    <div>
      {user &&  user.type == 'organization' && (
        <div className="companies">
          <div>
              <p>Available Companies</p>
          </div>
          <div >
              {companies && companies.map((company) => (
                  <div className="companycards">
                      <CompanyCards key={company._id} company={company} />
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

export default Companies