import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../Redux/Slice/authSlice';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import '../styles/Login.css';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    age: '',
    phoneNumber: '',
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

    // Clear previous errors
    setErrors({});
    setSuccessMessage('');

    // Perform client-side validation
    const validationErrors = {};
    if (!formData.username.trim()) {
      validationErrors.username = 'Username is required';
    }
    if (!formData.password.trim()) {
      validationErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      validationErrors.password = 'Password must be at least 6 characters';
    }
    if (!formData.email.trim()) {
      validationErrors.email = 'Email is required';
    } else if (!/\S+@\S+/.test(formData.email)) {
      validationErrors.email = 'Enter a valid email address';
    }

    // Age validation
    if (!formData.age.trim()) {
      validationErrors.age = 'Age is required';
    } else if (!/^\d{2}$/.test(formData.age)) {
      validationErrors.age = 'Enter a valid age (10-99)';
    } else if (parseInt(formData.age, 10) <= 18) {
      validationErrors.age = 'Age must be greater than 18';
    }

    // Phone number validation
    if (!formData.phoneNumber.trim()) {
      validationErrors.phoneNumber = 'Phone Number is required';
    } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
      validationErrors.phoneNumber = 'Enter a valid 10-digit phone number';
    }

    if (Object.keys(validationErrors).length === 0) {
      try {
        // Form is valid, dispatch the registerUser action
        await dispatch(registerUser(formData));

        // Display success message
        setSuccessMessage('Registration successful! Redirecting...');

        // Redirect to the home page after a short delay
        setTimeout(() => {
          navigate('/');
        }, 2000); // Delay for 2 seconds (adjust as needed)
      } catch (error) {
        // Handle registration failure, display appropriate error message
        setErrors({ general: error.message });

        // If email already exists, show a SweetAlert
        if (error.message === 'This email is already registered. Please go to the login page.') {
          Swal.fire({
            icon: 'error',
            title: 'Registration Failed',
            html:  'This email is already registered. Please go to the <a href="/sign-in">Login page</a>',
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
          <h4 className="login-subheading">Create an account to unlock exclusive features and plan your dream vacations with Tour Explorer.</h4>
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

          <label htmlFor="password">Password</label>
<input
  type="password"
  name="password"
  id="password"
  value={formData.password}
  onChange={handleChange}
/>
{!formData.password && errors.password && <p className="error-message">{errors.password}</p>}
{formData.password && formData.password.length < 6 && (
  <p className="error-message">Password must be at least 6 characters</p>
)}


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

          {/* Age validation */}
          <label htmlFor="age">Age</label>
          <input
            type="text"
            name="age"
            id="age"
            value={formData.age}
            onChange={handleChange}
          />
          {!formData.age && errors.age && <p className="error-message">{errors.age}</p>}
          {formData.age && !/^\d{2}$/.test(formData.age) && (
            <p className="error-message">Enter a valid age (10-99)</p>
          )}
          {parseInt(formData.age, 10) <= 18 && (
            <p className="error-message">Age must be greater than 18</p>
          )}

          {/* Phone number validation */}
          <label htmlFor="phoneNumber">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {!formData.phoneNumber && errors.phoneNumber && (
            <p className="error-message">{errors.phoneNumber}</p>
          )}
          {formData.phoneNumber && !/^\d{10}$/.test(formData.phoneNumber) && (
            <p className="error-message">Enter a valid 10-digit phone number</p>
          )}

          <button type="submit">Register</button>
          {successMessage && <p className="success-message" style={{ color: 'green' }}>{successMessage}</p>}
        </form>
      </div>
    </>
  );
};

export default Register;
