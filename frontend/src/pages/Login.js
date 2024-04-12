import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLogin } from "../hooks/LoginHook"

const Login = () => {
  const [email, setEmail] = useState('');
  const [passwrd, setPasswrd] = useState('');

  const [error, setError] = useState('');
  const navigate = useNavigate();

  //const [error, setError] = useState('');
  const {login, error, isLoading} = useLogin()


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, passwrd)
      /*const response = await axios.post('/api/auth/login', { email, passwrd });
      console.log('Login successful:', response.data);

      localStorage.setItem('user', JSON.stringify(response.data));                        // Save user info in local storage
      navigate('/user-profile', { state: { user: response.data }});                       // Redirect to user profile page

      // Save the received token in local storage
      localStorage.setItem('token', response.data.token);
      // Redirect user to account page*/

    } catch (err) {
      //setError('Failed to login. Please check your credentials.');
      console.error('Login error:', err.response.data);
    }  
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={passwrd}
            onChange={(e) => setPasswrd(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;