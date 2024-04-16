import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../hooks/AuthContextHook'

const CashDonation = () => {
    const [name, setName] = useState('')
    const [cardnum, setCardnum] = useState('')
    const [exp, setExp] = useState('')
    const [cvv, setCVV] = useState('')
    const [zip, setZip] = useState('')
    const [amount, setAmount] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    let errorString = ''
    let destination = '/donationsubmit'

    const { user } = useAuthContext()
    const location = useLocation();
    const navigate = useNavigate()
    //let { org } = location.state;
    let { orgIdParam } = useParams();

    if(!user){
        return (
            <p>Please log in or sign up.</p>
        )
    }
      
    const handleSubmit = async (e) => {
        e.preventDefault()

        const donationID = user.id
        var phone
        if(user.phone){
            phone = user.phone
        }
        else{
            phone = '1234567890'
        }
        var address
        if(user.address){
            address = user.address
        }
        else{
            address = 'address'
        }
        
        const donationType = 'Monetary'
        //const orgId = org._id
        const orgId = orgIdParam
        // makes date todays date
        const paymentDate = new Date()

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
        setAmount('')
        let destination = '/cashsubmit'
        }

        const donorName = name
        const creditCardNum = cardnum
        const creditCardExp = exp
        const creditCardCVV = cvv
        const zipcode = zip

        const donation = {donationID, donorName, phone, address, donationType, orgId, amount, paymentDate, creditCardNum, creditCardExp, creditCardCVV, zipcode}
        console.log(donation)

        const response = await fetch('/api/donate', {
            method: 'POST',
            body: JSON.stringify(donation),
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

        if(response.ok){
            navigate('/donationsubmit')
        }
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

            <label>Amount</label>
                <input
                    type="number" 
                    onChange={(e) => setAmount(e.target.value)} 
                    value={amount}
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
                <button onClick={handleSubmit}>Submit</button>
            </container2>
            {error && <div className="error">{error}</div>}
       </form>
    )
 }
 
 export default CashDonation