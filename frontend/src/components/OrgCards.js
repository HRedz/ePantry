import { useOrgsContext } from '../hooks/OrgsContextHook'
import { useAuthContext } from '../hooks/AuthContextHook'

const OrgCards = ({ org }) => {
  const { dispatch } = useOrgsContext()
  const { user } = useAuthContext()


  return (
    <div className='orgCardContents'>
      <div className="orgName">{org.name}</div>
      {org.description &&  (
        <p className="orgBody">{org.description}</p>  
      )}
      {!org.description &&  (
        <p className="orgBody">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna nulla, efficitur eu risus feugiat, vestibulum convallis ipsum. Nam in justo nulla. Curabitur sed tortor justo. Sed quis tristique tortor, at tincidunt turpis. In rhoncus, nunc sed finibus dignissim, dui metus sodales ante, fringilla pellentesque ante lorem vitae justo. Duis a massa quam. Morbi vel sem fermentum, placerat magna pretium, sagittis est.</p>  
      )}
    </div>
  )
}

export default OrgCards