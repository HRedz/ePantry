import { createContext, useReducer } from 'react'

export const OrgsContext = createContext()

export const orgsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ORGS': 
      return {
        orgs: action.payload
      }
    default:
      return state
  }
}

export const OrgsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(orgsReducer, {
    orgs: null
  })

  return (
    <OrgsContext.Provider value={{...state, dispatch}}>
      { children }
    </OrgsContext.Provider>
  )
}