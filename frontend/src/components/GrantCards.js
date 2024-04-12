import { useGrantsContext } from '../hooks/GrantsContextHook'
import { useAuthContext } from '../hooks/AuthContextHook'

const GrantCards = ({ grant }) => {
  const { dispatch } = useGrantsContext()
  const { user } = useAuthContext()

  const handleClick = async () => {
    if (!user) {
      return
    }

    const userId = user.id
    const grantId = grant._id
    const companyId = grant.companyId
    const applicationText = 'test app'

    const application = {userId, grantId, companyId, applicationText}
    console.log(application)

    const response = await fetch('/api/grantapplications/apply/' + grant._id, {
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
    }
  }

  return (
    <div className='grantCardContents'>
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
      {user && user.type == 'organization' &&  (
        <span className="applyLink" onClick={handleClick}>Apply</span>
        )}
      
    </div>
  )
}

export default GrantCards