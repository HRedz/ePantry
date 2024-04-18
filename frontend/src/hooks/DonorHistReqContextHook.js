import { DonorHistReqsContext } from "../context/DonorHistReqContext"
import { useContext } from "react"

export const useDonorHistReqsContext = () => {
  const context = useContext(DonorHistReqsContext)

  if(!context) {
    throw Error('useDonorHistReqsContext must be used inside an DonorHistReqContextProvider')
  }

  return context
}