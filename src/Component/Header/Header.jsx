import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import logo from "../../assets/images/travel.png";
import { selectCurrentUser, selectIsLoggedIn, logoutUser } from '../../Redux/Slice/authSlice';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectCurrentUser);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleTourPackageClick = () => {
    if (!isLoggedIn) {
      Swal.fire({
        title: 'Please sign in!',
        html: 'To explore more, please <a href="/sign-in">sign in</a>/<a href="/register">Register</a>.',
        icon: 'warning',
        confirmButtonText: 'OK',
      });
    }
  };

  const handleLogout = () => {
    // Dispatch the logoutUser action
    dispatch(logoutUser());

    // Redirect to the register page
    navigate('/register');
  };

  return (
    <div className="nav">
      <input type="checkbox" id="nav-check" />
      <div className="nav-header">
        <div className="nav-title">
          <img className='img-style' src={logo} alt="logo"/>
        </div>
      </div>
      <div className="nav-btn">
        <label htmlFor="nav-check">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to={isLoggedIn ? "/tour-packages" : null} onClick={handleTourPackageClick}>Tour Package Listing</Link>

        {isLoggedIn ? (
          <>
            <span className="user-info">{`Welcome, ${currentUser.username}!`}</span>
            <Link to="/" onClick={handleLogout}>Logout</Link>
          </>
        ) : (
          <>
            <Link to="/sign-in">Sign In</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>

      {/* Modal for sign-in */}
      {showSignInModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setShowSignInModal(false)}>&times;</span>
            <p>Please sign in to access Tour Package Listing.</p>
            {/* Add sign-in form or link here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
