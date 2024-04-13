import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/AuthContextHook'

const Navbar = () => {

   const { user } = useAuthContext()

   return (
      <header>
         <div className="container">
            <nav1>
            <Link to="/">
               <title1><h1>ePantry</h1></title1>
            </Link>
            <Link to="/create-account">
               <div className="nav-link">Sign Up</div>
            </Link>
            <Link to="/login">
               <div className="nav-link">Login</div>
            </Link>
            {user && (user.type === 'company' || user.type === 'individual' )  && (
               <Link to="/orgs">
                  <div className="nav-link">Browse Not-For-Profits</div>
               </Link>
            )}
            {user && (user.type === 'organization' )  && (
               <Link to="/companies">
                  <div className="nav-link">Browse Companies</div>
               </Link>
            )}
            {user && (user.type === 'organization' )  && (
               <Link to="/grants">
                  <div className="nav-link">Browse Grants</div>
               </Link>
            )}
            {user && (user.type === 'company' )  && (
               <Link to="/grants">
                  <div className="nav-link">My Grants</div>
               </Link>
            )}
            {user && (user.type === 'organization' )  && (
               <Link to="/pendingdonations">
                  <div className="nav-link">Pending Donations</div>
               </Link>
            )}
            {user && (user.type === 'organization') && (
               <Link to="/completedgrants">
                  <div className="nav-link">Completed Applications</div>
               </Link>
            )}

            </nav1>
         </div>
      </header>
   )
}

export default Navbar