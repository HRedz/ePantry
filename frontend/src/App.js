import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useAuthContext } from './hooks/AuthContextHook'

// Pages and Components
import Home from './pages/Home'
import CashDonation from './pages/CashDonation'
import CashSubmit from './pages/CashSubmit'
import Navbar from './components/Navbar'
import CreateUserAccount from './pages/CreateUserAccount'
import Login from './pages/Login'
import Orgs from './pages/Orgs'
import Companies from './pages/Companies'
import Grants from './pages/Grants'

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
              path="/cashsubmit"
              element={<CashSubmit />}
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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
