import { useAuthContext } from './AuthContextHook'
import { useCompaniesContext } from './CompanyContextHook'
import { useDonationsContext } from './DonationContextHook'
import { useGrantsContext } from './GrantsContextHook'
import { useOrgsContext } from './OrgsContextHook'

export const useLogout = () => {
  const { dispatch } = useAuthContext()
  const { dispatch: dispatchCompanies } = useCompaniesContext()
  const { dispatch: dispatchDonations } = useDonationsContext()
  const { dispatch: dispatchGrants } = useGrantsContext()
  const { dispatch: dispatchOrgs } = useOrgsContext()

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user')

    // dispatch logout action
    dispatch({ type: 'LOGOUT' })
    dispatchCompanies({ type: 'SET_COMPANIES', payload: null })
    dispatchDonations({ type: 'SET_DONATIONS', payload: null })
    dispatchGrants({ type: 'SET_GRANTS', payload: null })
    dispatchOrgs({ type: 'SET_ORGS', payload: null })
  }

  return { logout }
}