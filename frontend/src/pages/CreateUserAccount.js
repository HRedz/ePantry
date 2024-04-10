import React, { useState } from 'react';
import axios from 'axios';

const CreateUserAccount = () => {
  const [formData, setFormData] = useState({
    type: '',
    name: '',
    email: '',
    passwrd: '', // Ensure this matches your backend field for password
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Adjust the URL according to your environment setup
      const response = await axios.post('/api/auth/signup', formData);
      console.log(response.data);
      // Redirect or show success message
    } catch (error) {
      console.error(error.response.data);
      // Handle errors or show error message
    }
  };
  

  return (
    <form className="create-user-form" onSubmit={handleSubmit}>
      <h2>Create User Account</h2>
      <div className="form-group">
        <label>Type</label>
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleChange}
          required
        />
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
        <label>Password</label>
        <input
          type="password"
          name="passwrd"
          value={formData.passwrd}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Create Account</button>
    </form>
  );
};

export default CreateUserAccount;
