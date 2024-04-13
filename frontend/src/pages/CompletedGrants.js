import { useEffect, useState } from 'react'
import GrantCards from '../components/GrantCards'
import { useAuthContext } from '../hooks/AuthContextHook'
import { useGrantsContext } from '../hooks/GrantsContextHook'

const MyGrants = () => {
    const { user } = useAuthContext()
    console.log(user)
    const { grants, dispatch } = useGrantsContext()
    const [applications, setApplications] = useState([])
    const [appliedGrants, setApplied] = useState([])
    
    useEffect(() => {

        const fetchData = async () => {
            const appsResponse = await fetch('/api/grantapplications', {
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const appsJson = await appsResponse.json()

            const grantsResponse = await fetch('/api/grants', {
                headers: {'Authorization': `Bearer ${user.token}`},
            })
            const grantsJson = await grantsResponse.json()

            if(appsResponse.ok && grantsResponse.ok) {
                setApplications(appsJson)
                console.log(appsJson)
                dispatch({type: 'SET_GRANTS', payload: grantsJson})
                console.log(grantsJson)
            }

            if(applications && grants) {
                setApplied(
                    grants.filter( grant => {
                        return applications.some(application => {
                            return application.grantId === grant._id
                        })
                    })
                )
            }
        }

        
        
        if(user) {
            fetchData()
        }

    }, [grants, dispatch, applications, user, appliedGrants])
    console.log(applications)
    console.log(grants)

    return (
        <div>
            {user && user.type === 'organization' && (
                <div>
                    <div className='completedApplications'>
                        <div>
                            <p>My Applications</p>
                        </div>
                        <div>
                            {appliedGrants && appliedGrants.map((grant) => (
                                <div className="grantcards">
                                    <GrantCards key={grant._id} grant={grant} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MyGrants