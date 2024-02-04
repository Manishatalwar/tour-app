import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../Redux/Slice/authSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({});
    setSuccessMessage('');

    const validationErrors = {};
    if (!formData.username.trim()) {
      validationErrors.username = 'Username is required';
    }
    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+/.test(formData.email)) {
      validationErrors.email = 'Enter a valid email address';
    }
    if (!formData.password.trim()) {
      validationErrors.password = 'Password is required';
    } else if (formData.password.trim().length < 4) {
      validationErrors.password = 'Password must be at least 4 characters long';
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        await dispatch(loginUser(formData));
        setSuccessMessage('Login successful! Redirecting...');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } catch (error) {
        setErrors({ general: error.message });
        if (error.message.includes('register first')) {
          Swal.fire({
            title: 'User not found. Please register first!',
            html: 'Click Here For <a href="/register">Registration</a>.',
            icon: 'warning',
            confirmButtonText: 'OK',
          });
        }
      }
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <>
      <div className="login-heading-container">
        <div className="main">
          <h1 className="simple-text">Tour Explorer</h1>
          <h4 className="login-subheading">Sign in to plan your next adventure!</h4>
        </div>
      </div>
      <div className="login-form-container">
        <form onSubmit={handleSubmit}>
          {errors.general && <p className="error-message">{errors.general}</p>}
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
          />
          {!formData.username && errors.username && <p className="error-message">{errors.username}</p>}

          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
          {!formData.email && errors.email && <p className="error-message">{errors.email}</p>}
          {formData.email && !/\S+@\S+/.test(formData.email) && <p className="error-message">Enter a valid email</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
          {formData.password && formData.password.trim().length < 4 && (
            <p className="error-message">Password must be at least 4 characters long</p>
          )}

          <button type="submit">Login</button>
          {successMessage && <p className="success-message" style={{ color: 'green' }}>{successMessage}</p>}
        </form>
      </div>
    </>
  );
};

export default Login;
