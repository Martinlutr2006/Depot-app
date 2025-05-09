import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    userType: 'ADMIN',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3004/api/signup', formData);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center">
      <div className="card w-full max-w-md shadow-2xl bg-base-100">
        <form onSubmit={handleRegister} className="card-body">
          <h2 className="text-2xl font-bold text-center">Register</h2>

          <div className="form-control">
            <label className="label">Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              className="input input-bordered"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              className="input input-bordered"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-control">
            <label className="label">User Type</label>
            <select
              name="userType"
              className="select select-bordered"
              value={formData.userType}
              onChange={handleChange}
              required
            >
              <option value="ADMIN">ADMIN</option>
              <option value="WORKER">WORKER</option>
            </select>
          </div>

          <div className="form-control mt-6">
            <button className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
