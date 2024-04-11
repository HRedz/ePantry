import { useState } from 'react'

const CashDonation = () => {
    const [name, setName] = useState('')
    const [cardnum, setCardnum] = useState('')
    const [exp, setExp] = useState('')
    const [cvv, setCVV] = useState('')
    const [zip, setZip] = useState('')
    let errorString = ''
    let destination = '/cashsubmit'
      
    const handleSubmit = async (e) => {
        e.preventDefault()

        if (name.trim() === "" ||
            cardnum.trim() === "" ||
            exp.trim() === "" ||
            cvv.trim() === "" ||
            zip.trim() === "") {
        let errorString = 'Please fill in all fields correctly.'
        }
        else {
        setName('')
        setCardnum('')
        setExp('')
        setCVV('')
        setZip('')
        let destination = '/cashsubmit'
        }

    }

    return (
       <div className="cashDonation" onSubmit={handleSubmit}>
        <h2>Cash Donation</h2>
            <label>Full Name</label>
            <input
                type="name" 
                onChange={(e) => setName(e.target.value)} 
                value={name}
            ></input>

            <label>Credit Card Number</label>
            <input
                type="cardnum" 
                onChange={(e) => setCardnum(e.target.value)} 
                value={cardnum}
            ></input>

            <split>
                <container>
                    <label>Exp Date</label>
                    <input
                        type="exp" 
                        onChange={(e) => setExp(e.target.value)} 
                        value={exp}
                    ></input>
                </container>
                <container>
                    <label>CVV</label>
                    <input
                        type="cvv" 
                        onChange={(e) => setCVV(e.target.value)} 
                        value={cvv}
                    ></input>
                </container>
            </split>

            <label>Zip Code</label>
            <input
                type="zip" 
                onChange={(e) => setZip(e.target.value)} 
                value={zip}
            ></input>

            <container2>
                <button><a href={destination}>Submit</a></button>
            </container2>
       </div>
    )
 }
 
 export default CashDonation