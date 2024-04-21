import { useNavigate } from 'react-router-dom'
import { useGrantsContext } from '../hooks/GrantsContextHook'
import { useAuthContext } from '../hooks/AuthContextHook'
import { useLocation } from 'react-router-dom'

const GrantCards = ({ grant }) => {
  const { dispatch } = useGrantsContext()
  const { user } = useAuthContext()
  const naviagate = useNavigate()
  const location = useLocation()

  const handleSubmit = async (e) => {
    if (!user) {
      return
    }
    e.preventDefault();

    const userId = user.id
    const grantId = grant._id
    const companyId = grant.companyId
    const applicationText = 'test app'
    const companyName = grant.companyName
    const grantTitle = grant.grantTitle
    const grantAmount = grant.amount
    const status = 'Applied'

    const application = {userId, grantId, companyId, applicationText, status, companyName, grantTitle, grantAmount}
    console.log(application)

    const response = await fetch('/api/grantapplications/' + grant._id, {
      method: 'POST',
      body: JSON.stringify(application),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (response.ok) {
      dispatch({type: 'CREATE_APPLICATION', payload: json})
      console.log(json)
      naviagate('/applied')
    }

  }

  return (
    <div className='grantCardContents'>
      <form onSubmit={handleSubmit}>
        <div className="grantName">{grant.title}</div>
        <div className="grantInfo">Offered By: {grant.companyName}</div>
        <div className="grantInfo">Amount: {grant.amount}</div>
        <div className="grantInfo">Closes On: {grant.closeDate}</div>
        {grant.description &&  (
        <p className="grantBody">{grant.description}</p>  
        )}
        {!grant.description &&  (
        <p className="grantBody">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna nulla, efficitur eu risus feugiat, vestibulum convallis ipsum. Nam in justo nulla. Curabitur sed tortor justo. Sed quis tristique tortor, at tincidunt turpis. In rhoncus, nunc sed finibus dignissim, dui metus sodales ante, fringilla pellentesque ante lorem vitae justo. Duis a massa quam. Morbi vel sem fermentum, placerat magna pretium, sagittis est.</p>  
        )}
        {user && user.type === 'organization' && (location.pathname === "/grants") &&  (
          <button type="submit">Apply</button>
        )}
      </form>
      
    </div>
  )
}

export default GrantCards