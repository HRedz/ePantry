import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
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
import GrantSubmit from './pages/GrantSubmit'
import MyGrants from './pages/CompletedGrants'
import DonationHistory from './pages/DonationsHistoryPage'
import PendingPermissions from './pages/PendingPermissions'
import EditAccount from './pages/EditAccount'
import PendingApplications from './pages/PendingApplications'
import GrantStatus from './pages/GrantStatus'
import ReceivedDonations from './pages/ReceivedDonations'
import DonorHistReqViewer from './pages/DonorHistoryReq'

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
              path="/cashdonation/:orgIdParam"
              element={<CashDonation />}
              //element={user ? <CashDonation /> : <Navigate to="/login" />}
            />
            <Route 
              path="/fooddonation/:orgIdParam"
              element={<FoodDonation />}
              //element={user ? <FoodDonation /> : <Navigate to="/login" />}
            />
            <Route 
              path="/donationSubmit"
              element={<DonationSubmit />}
            />
            <Route
              path="/create-account" 
              element={!user ? <CreateUserAccount /> : <Navigate to="/user-profile" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/user-profile" />}
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
              path="/pendingdonations"
              element={<PendingDonations />}
            />
            <Route
              path="/applied"
              element={<GrantSubmit />} 
            />
            <Route 
              path="/completedgrants"
              element={<MyGrants />}
            <Route 
              path="donationhistory" 
              element={<DonationHistory />}
            />
            <Route 
              path="permissions" 
              element={<PendingPermissions />}
            />
            <Route
              path="/editaccount"
              element={<EditAccount />}
            />
            <Route
              path="/pendingapplications"
              element={<PendingApplications />}
            />
            <Route
              path="/grantstatus"
              element={<GrantStatus />}
            />
            <Route
              path="/receiveddonations"
              element={<ReceivedDonations />}
            />
            <Route 
              path="/donorhistoryreq/:donorIdParam"
              element={<DonorHistReqViewer />}
              //element={user ? <CashDonation /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
