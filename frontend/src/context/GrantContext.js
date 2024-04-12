import { createContext, useReducer } from 'react'

export const GrantsContext = createContext()

export const grantsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_GRANTS': 
      return {
        grants: action.payload
      }
    case 'CREATE_GRANT':
        return {
            grants: [action.payload, ...state.grants]
        }
    default:
      return state
  }
}

export const GrantsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(grantsReducer, {
    orgs: null
  })

  return (
    <GrantsContext.Provider value={{...state, dispatch}}>
      { children }
    </GrantsContext.Provider>
  )
}