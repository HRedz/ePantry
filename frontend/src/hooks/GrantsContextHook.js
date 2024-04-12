import { GrantsContext } from '../context/GrantContext'
import { useContext } from 'react'

export const useGrantsContext = () => {
  const context = useContext(GrantsContext)

  if (!context) {
    throw Error('useGrantsContext must be used inside an GrantsContextProvider')
  }

  return context
}