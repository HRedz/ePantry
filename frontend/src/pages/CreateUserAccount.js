import React, { useState } from 'react';
import axios from 'axios';
import { useSignup } from '../hooks/SignUpHook';

const CreateUserAccount = () => {
  const { signup, error, isLoading } = useSignup()
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    email: '',
    passwrd: '',
    phone: '',
    address: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(formData.type, formData.name, formData.email, formData.passwrd, formData.phone, formData.address)
      //const response = await axios.post('/api/auth/signup', formData);
      //console.log(response.data);
      // Redirect or show success message
    } catch (err) {
      console.error(err);
      // Handle errors or show error message
    }
  };


  return (
    <div className="login-container">
      <form className="create-user-form" onSubmit={handleSubmit}>
        <h2>Create User Account</h2>
        <div className="form-group">
          <label>User Type</label>
          <div class="radio-button">
            <input
              type="radio"
              id="organization"
              name="type"
              value="organization"
              onChange={handleChange}
              required
            />
            <label for="organization">Not-For-Profit Organization</label>
          </div>
          <div class="radio-button">
            <input
              type="radio"
              id="company"
              name="type"
              value="company"
              onChange={handleChange}
              required
            />
            <label for="company">Company Donor</label>
          </div>
          <div class="radio-button">
            <input
              type="radio"
              id="individual"
              name="type"
              value="individual"
              onChange={handleChange}
              required
            />
            <label for="individual">Individual Donor</label>
          </div>
        </div>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Password (must be at least 8 characters and include an uppercase letter, a lowercase letter, a number, and a symbol)</label>
          <input
            type="password"
            name="passwrd"
            value={formData.passwrd}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button className="navButton loginButton" type="submit">Create Account</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default CreateUserAccount;
