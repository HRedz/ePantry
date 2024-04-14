import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CashDonation = () => {
    const [name, setName] = useState('')
    const [cardnum, setCardnum] = useState('')
    const [exp, setExp] = useState('')
    const [cvv, setCVV] = useState('')
    const [zip, setZip] = useState('')
    let destination = '/donationsubmit'
    let navigate = useNavigate()
      
    const handleSubmit = async (e) => {
        e.preventDefault()
        navigate(destination)
    }

    return (
       <form className="donation" onSubmit={handleSubmit}>
        <h2>Cash Donation</h2>
            <label>Full Name</label>
            <input
                type="text" 
                onChange={(e) => setName(e.target.value)} 
                value={name}
            ></input>

            <label>Credit Card Number</label>
            <input
                type="number" 
                onChange={(e) => setCardnum(e.target.value)} 
                value={cardnum}
            ></input>

            <split>
                <container>
                    <label>Exp Date</label>
                    <input
                        type="date" 
                        onChange={(e) => setExp(e.target.value)} 
                        value={exp}
                    ></input>
                </container>
                <container>
                    <label>CVV</label>
                    <input
                        type="number" 
                        onChange={(e) => setCVV(e.target.value)} 
                        value={cvv}
                    ></input>
                </container>
            </split>

            <label>Zip Code</label>
            <input
                type="number" 
                onChange={(e) => setZip(e.target.value)} 
                value={zip}
            ></input>

            <container2>
                <button type="submit">Submit</button>
            </container2>
       </form>
    )
 }
 
 export default CashDonation