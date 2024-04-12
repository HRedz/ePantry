import { useCompaniesContext } from '../hooks/CompanyContextHook'
import { useAuthContext } from '../hooks/AuthContextHook'

const CompanyCards = ({ company }) => {
  const { dispatch } = useCompaniesContext()
  const { user } = useAuthContext()


  return (
    <div className='companyCardContents'>
      <div className="companyName">{company.name}</div>
      {company.description &&  (
        <p className="companyBody">{company.description}</p>  
      )}
      {!company.description &&  (
        <p className="companyBody">Lorem ipsum dolor sit amet, consectetur adipiscing elit. In magna nulla, efficitur eu risus feugiat, vestibulum convallis ipsum. Nam in justo nulla. Curabitur sed tortor justo. Sed quis tristique tortor, at tincidunt turpis. In rhoncus, nunc sed finibus dignissim, dui metus sodales ante, fringilla pellentesque ante lorem vitae justo. Duis a massa quam. Morbi vel sem fermentum, placerat magna pretium, sagittis est.</p>  
      )}
    </div>
  )
}

export default CompanyCards