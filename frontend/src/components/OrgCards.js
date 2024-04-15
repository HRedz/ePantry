import { useOrgsContext } from '../hooks/OrgsContextHook'
import { useAuthContext } from '../hooks/AuthContextHook'
import { useNavigate } from 'react-router-dom';

const OrgCards = ({ org }) => {
  const { dispatch } = useOrgsContext()
  const { user } = useAuthContext()
  const navigate = useNavigate()

  const donateCash = async (e) => {
    e.preventDefault()
    //console.log('donate')
    navigate('/cashdonation/' + org._id); 
  }

  const donateGoods = async (e) => {
    e.preventDefault()
    //console.log('donate')
    navigate('/fooddonation/' + org._id); 
  }

  return (
    <div className='orgCardContents'>
      <div className="orgName">{org.name}</div>
      {org.description &&  (
        <p className="orgBody">{org.description}</p>  
      )}
      {!org.description &&  (
        <p className="orgBody">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna nulla, efficitur eu risus feugiat, vestibulum convallis ipsum. Nam in justo nulla. Curabitur sed tortor justo. Sed quis tristique tortor, at tincidunt turpis. In rhoncus, nunc sed finibus dignissim, dui metus sodales ante, fringilla pellentesque ante lorem vitae justo. Duis a massa quam. Morbi vel sem fermentum, placerat magna pretium, sagittis est.</p>  
      )}
      <div className='donateButton' onClick={donateCash}>
        <span className="donateCashButtonText">Donate $$</span>
      </div>
      <div className='donateButton' onClick={donateGoods}>
        <span className="donateGoodsButtonText">Donate Goods</span>
      </div>
    </div>
  )
}

export default OrgCards