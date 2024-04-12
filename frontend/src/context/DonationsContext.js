import { createContext, useReducer } from 'react'

export const DonationsContext = createContext()

export const donationsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DONATIONS': 
      return {
        donations: action.payload
      }
    case 'CREATE_GRANT':
        return {
            donations: [action.payload, ...state.donations]
        }
    default:
      return state
  }
}

export const DonationsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(donationsReducer, {
    donations: null
  })

  return (
    <DonationsContext.Provider value={{...state, dispatch}}>
      { children }
    </DonationsContext.Provider>
  )
}