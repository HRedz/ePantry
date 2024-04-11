import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Pages and Components
import Home from './pages/Home'
import CashDonation from './pages/CashDonation'
import CashSubmit from './pages/CashSubmit'
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
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
