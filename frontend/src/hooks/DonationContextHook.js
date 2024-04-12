import { DonationsContext } from '../context/DonationsContext'
import { useContext } from 'react'

export const useDonationsContext = () => {
  const context = useContext(DonationsContext)

  if (!context) {
    throw Error('useDonationsContext must be used inside an DonationsContextProvider')
  }

  return context
}