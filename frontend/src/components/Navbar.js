import { Link } from 'react-router-dom'

const Navbar = () => {

   return (
      <header>
         <div className="container">
            <nav1>
            <Link to="/">
               <title1><h1>ePantry</h1></title1>
            </Link>

            <a href="/">Log In</a>
            <a href="/">Sign Up</a>
            </nav1>
         </div>
      </header>
   )
}

export default Navbar