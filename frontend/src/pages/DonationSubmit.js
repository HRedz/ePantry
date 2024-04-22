import { useAuthContext } from '../hooks/AuthContextHook'

const DonationSubmit = () => {
    const { user } = useAuthContext()
    
    return (
        <div>
            {user && (
                <div className="donationSubmit">
                    <bodytext>
                        Thank you for submitting your information. <br /> <br />
                        Your donation will be processed within the next 48 hours.
                    </bodytext>
                </div>
            )}
            {!user && (
                <p>Please log in or sign up.</p>
            )} 
       </div>
    )
 }
 
 export default DonationSubmit