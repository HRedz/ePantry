import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserProfile from './pages/UserProfile'
import { useAuthContext } from './hooks/AuthContextHook'

// Pages and Components
import Home from './pages/Home'
import CashDonation from './pages/CashDonation'
import FoodDonation from './pages/FoodDonation'
import DonationSubmit from './pages/DonationSubmit'
import Navbar from './components/Navbar'
import CreateUserAccount from './pages/CreateUserAccount'
import Login from './pages/Login'
import Orgs from './pages/Orgs'
import Companies from './pages/Companies'
import Grants from './pages/Grants'
import PendingDonations from './pages/PendingDonations'
import PersonalDonations from './pages/PersonalDonations'
import PendingPermissions from './pages/PendingPermissions'

function App() {
  const { user } = useAuthContext()
  
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
            <Route
              path="/orgs"
              element={<Orgs />}
            />
            <Route
              path="/companies"
              element={<Companies />}
            />
            <Route
              path="/grants"
              element={<Grants />}
            />
            <Route
              path="/apply"
              element={<Grants />}
            />
            <Route
              path="/pendingdonations"
              element={<PendingDonations />}
            />
            <Route 
              path="donationhistory" 
              element={<PersonalDonations />}
            />
            <Route 
              path="permissions" 
              element={<PendingPermissions />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
