import { createContext, useReducer } from 'react'

export const DonorHistReqsContext = createContext()

export const donorHistReqsReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DonorHistReqs': 
      return {
        donorHistReqs: action.payload
      }
    case 'REMOVE_DonorHistReq':
      return {
        ...state,
        donorHistReqs: state.donorHistReqs.filter(req => req._id !== action.payload)
      }
    default:
      return state
  }
}

export const DonorHistReqsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(donorHistReqsReducer, {
    donorHistReqs: null
  })

  return (
    <DonorHistReqsContext.Provider value={{...state, dispatch}}>
      { children }
    </DonorHistReqsContext.Provider>
  )
}