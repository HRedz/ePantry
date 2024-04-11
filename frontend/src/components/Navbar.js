import { Link } from 'react-router-dom'

const Navbar = () => {

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

            </nav1>
         </div>
      </header>
   )
}

export default Navbar