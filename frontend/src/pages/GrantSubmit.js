import { useNavigate } from "react-router-dom"
import React from "react";

const GrantSubmit = () => {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault()
        navigate('/grants')
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="grantSubmit">
                    <bodytext>
                        Thank you for applying to our grant!<br></br>
                        Your application will be processed within the next 48 hours.
                    </bodytext>
                </div>
                <button type="submit">Back to Browse Grants</button>
            </form>
        </div>
    )
}

export default GrantSubmit
