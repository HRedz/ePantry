const CashDonation = () => {
    return (
       <div className="cashDonation">
        <h2>Cash Donation</h2>
            <label>Full Name</label>
            <input></input>

            <label>Credit Card Number</label>
            <input></input>

            <split>
                <container>
                    <label>Exp Date</label>
                    <input></input>
                </container>
                <container>
                    <label>CVV</label>
                    <input></input>
                </container>
            </split>

            <label>Zip Code</label>
            <input></input>

            <container2>
                <button>Submit</button>
            </container2>
       </div>
    )
 }
 
 export default CashDonation