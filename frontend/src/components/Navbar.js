import { Link } from 'react-router-dom'
import { useAuthContext } from '../hooks/AuthContextHook'
import { useLogout } from '../hooks/LogOutHook'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

   const { user } = useAuthContext()
   const { logout } = useLogout()
   const navigate = useNavigate()

   const handleClick = () => {
      logout()
      navigate('/')
    }

   return (
      <header>
         <div className="container">
            <nav1>
            <Link to="/">
               <title1><h1>ePantry</h1></title1>
            </Link>
            {!user && (
               <Link to="/create-account">
                  <div className="nav-link">Sign Up</div>
               </Link>
            )}
            {!user && (
               <Link to="/login">
                  <div className="nav-link">Login</div>
               </Link>
            )}
            {user && (
               <Link to="/user-profile">
                  <div className="nav-link">My Profile</div>
               </Link>
            )}
            {user && (
               <span onClick={handleClick}>
                  <Link to="/user-profile">Log Out</Link>
               </span>
            )}
            {user && (user.type == 'company' || user.type == 'individual' )  && (
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