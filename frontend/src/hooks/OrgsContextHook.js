import { OrgsContext } from '../context/OrgContext'
import { useContext } from 'react'

export const useOrgsContext = () => {
  const context = useContext(OrgsContext)

  if (!context) {
    throw Error('useOrgsContext must be used inside an OrgsContextProvider')
  }

  return context
}