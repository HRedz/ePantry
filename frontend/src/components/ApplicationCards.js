const ApplicationCards = ({ application }) => {
    return (
        <div className='appCardContents'>
            <div className="grantTitle">{application.grantTitle}</div>
            <div className="grantInfo">Offered By: {application.companyName}</div>
            <div className="grantInfo">Amount: {application.grantAmount}</div>
            <div className="grantInfo">Reason: 
                <p className="applicationBody">{application.applicationText}</p>
            </div>
            <div className="applicationStatus">Status: {application.status}</div>

        </div>
    )
}

export default ApplicationCards