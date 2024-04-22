import { useEffect, useState } from 'react'
import { useAuthContext } from '../hooks/AuthContextHook'

// components
import ApplicationCards from '../components/ApplicationCards'

const MyGrants = () => {
    const { user } = useAuthContext()
    console.log(user)
    const [applications, setApplications] = useState([])
    
    useEffect(() => {

        const fetchData = async () => {
            const response = await fetch('/api/grantapplications', {
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const json = await response.json()


            if(response.ok) {
                setApplications(json)
                console.log(json)

            }
            }
     
        if(user) {
            fetchData()
        }

    }, [user])
    console.log(applications)

    return (
        <div>
            {user && user.type === 'organization' && (
                <div>
                    <div className='applications'>
                        <div>
                            <p>My Applications</p>
                        </div>
                        <div>
                            {applications && applications.map((application) => (
                                <div className="applicationcards">
                                    <ApplicationCards key={application._id} application={application} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            {user && user.type != 'organization' && (
                <p>Not Authorized</p>
            )} 
            {!user && (
                <p>Please log in or sign up.</p>
            )} 
        </div>
    )
}

export default MyGrants