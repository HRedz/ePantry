import { useState } from "react"
import { useGrantsContext } from "../hooks/GrantsContextHook"
import { useAuthContext } from '../hooks/AuthContextHook'

const GrantForm = () => {
  const { dispatch } = useGrantsContext()
  const { user } = useAuthContext()

  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [closeDate, setCloseDate] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)
  const [emptyFields, setEmptyFields] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!user) {
      setError('You must be logged in')
      return
    }

    const companyId = user.id
    const companyName = user.name

    const grant = { companyId, companyName, title, amount, closeDate, description }
    console.log(grant)

    const response = await fetch('/api/grants', {
      method: 'POST',
      body: JSON.stringify(grant),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyFields(json.emptyFields)
    }
    if (response.ok) {
      setTitle('')
      setAmount('')
      setCloseDate('')
      setDescription('')
      setError(null)
      setEmptyFields([])
      dispatch({ type: 'CREATE_GRANT', payload: json })
    }
  }

  return (
    <div className="login-container">
      <form className="create" onSubmit={handleSubmit}>
        <h3>Post a New Grant</h3>

        <label>Grant Title:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes('title') ? 'error' : ''}
        />

        <label>Grant Amount (in USD):</label>
        <input
          type="number"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
          className={emptyFields.includes('amount') ? 'error' : ''}
        />

        <label>Close Date:</label>
        <input
          type="date"
          onChange={(e) => setCloseDate(e.target.value)}
          value={closeDate}
          className={emptyFields.includes('closeDate') ? 'error' : ''}
        />

        <label>Description:</label>
        <input
          type="text"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          className={emptyFields.includes('description') ? 'error' : ''}
        />

        <button className="navButton">Post Grant</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default GrantForm