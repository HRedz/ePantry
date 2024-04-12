import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserProfile from './pages/UserProfile'

// Pages and Components
import Home from './pages/Home'
import CashDonation from './pages/CashDonation'
import FoodDonation from './pages/FoodDonation'
import DonationSubmit from './pages/DonationSubmit'
import Navbar from './components/Navbar'
import CreateUserAccount from './pages/CreateUserAccount'
import Login from './pages/Login'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
          <Route 
              path="/"
              element={<Home />}
            />
            <Route 
              path="/cashdonation"
              element={<CashDonation />}
            />
            <Route 
              path="/fooddonation"
              element={<FoodDonation />}
            />
            <Route 
              path="/donationSubmit"
              element={<DonationSubmit />}
            />
            <Route
              path="/create-account" 
              element={<CreateUserAccount />} 
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route 
              path="/user-profile" 
              element={<UserProfile />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
