import { useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useAuthContext } from '../hooks/AuthContextHook'

const FoodDonation = () => {
    const [items, setItems] = useState('')
    const [weight, setWeight] = useState('')
    const [num, setNum] = useState('')
    const [origin, setOrigin] = useState('')
    const [dest, setDest] = useState('')
    const [date, setDate] = useState('')
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

        const donorName = user.name
        const donationID = user.id
        const phone = '1234567890'
        const address = 'address'
        const donationType = 'Non-monetary'
        //const orgId = org._id
        const orgId = orgIdParam

        if (items.trim() === "" ||
            weight.trim() === "" ||
            num.trim() === ""||
            origin.trim() === ""||
            dest.trim() === ""||
            date.trim() === "") {
        let errorString = 'Please fill in all fields correctly.'
        }
        else {
        setItems('')
        setWeight('')
        setNum('')
        setOrigin('')
        setDest('')
        setDate('')
        let destination = '/donationSubmit'
        }

        const donatedItems = items
        const itemWeight = weight
        const noOfPackages = num
        const originZipcode = origin
        const destZipcode = dest
        const dropoffDate = date

        const donation = {donationID, donorName, phone, address, donationType, orgId, donatedItems, itemWeight, noOfPackages, originZipcode, destZipcode, dropoffDate}

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
        <h2>Food Donation</h2>
            <label>Donation Items</label>
            <input
                type="text" 
                onChange={(e) => setItems(e.target.value)} 
                value={items}
            ></input>

            <split>
                <container>
                    <label>Weight (lbs)</label>
                    <input
                        type="number" 
                        onChange={(e) => setWeight(e.target.value)} 
                        value={weight}
                    ></input>
                </container>
                <container>
                    <label># Of Packages</label>
                    <input
                        type="number" 
                        onChange={(e) => setNum(e.target.value)} 
                        value={num}
                    ></input>
                </container>
            </split>

            <split>
                <container>
                    <label>Origin Zipcode</label>
                    <input
                        type="number" 
                        onChange={(e) => setOrigin(e.target.value)} 
                        value={origin}
                    ></input>
                </container>
                <container>
                    <label>Dest Zipcode</label>
                    <input
                        type="number" 
                        onChange={(e) => setDest(e.target.value)} 
                        value={dest}
                    ></input>
                </container>
            </split>

            <label>Dropoff Date</label>
            <input
                type="date" 
                onChange={(e) => setDate(e.target.value)} 
                value={date}
            ></input>

            <container2>
                <button onClick={handleSubmit}>Submit</button>
            </container2>
            {error && <div className="error">{error}</div>}
       </form>
    )
 }
 
 export default FoodDonation