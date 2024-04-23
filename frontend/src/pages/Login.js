import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/LoginHook';

const Login = () => {
  const [email, setEmail] = useState('');
  const [passwrd, setPasswrd] = useState('');
  const {login, error, isLoading, user} = useLogin()                                      // useLogin hook
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await login(email, passwrd);                                                        // login function from the hook
      // commented out for bug fix --> tried to redirect was user was null causing crash
      // now redirects user to profile page from App.js --> ternary line to determine location
      //navigate('/user-profile', { state: { user } });                                     // navigate to profile
    } catch (err) {
      console.error('Login error:', err);
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
        <button className="navButton loginButton" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;