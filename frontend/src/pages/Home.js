import { Link } from 'react-router-dom';

const Home = () => {
   return (
      <div className="home">
         <titleContainer>
            <secondaryContainer>
            <title1>Where all your nonprofit funding needs are met.</title1> <br /><br />
            <Link className="home-link" to="/create-account">Join us today!</Link>
            </secondaryContainer>
         </titleContainer>
      </div>
   )
}

export default Home