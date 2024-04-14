import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const FoodDonation = () => {
    const [items, setItems] = useState('')
    const [weight, setWeight] = useState('')
    const [num, setNum] = useState('')
    const [origin, setOrigin] = useState('')
    const [dest, setDest] = useState('')
    const [date, setDate] = useState('')
    let destination = '/donationsubmit'
    let navigate = useNavigate()
      
    const handleSubmit = async (e) => {
        e.preventDefault()
        navigate(destination)
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
                    <label>Weight</label>
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
                <button type="submit">Submit</button>
            </container2>
       </form>
    )
 }
 
 export default FoodDonation