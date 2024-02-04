import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrentUser,
  selectIsLoggedIn,
  logoutUser,
} from '../../Redux/Slice/authSlice';
import "./Dashboard.css";
import { selectBookings } from '../../Redux/Slice/bookingSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const bookings = useSelector(selectBookings);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div>
      <>
        <h2>Welcome, {currentUser?.username}!</h2>
        <h3>Your Bookings:</h3>
        {bookings.map((booking, index) => (
          <div key={index} className="booking-container">
            <div className="image-container">
              <img src={booking.item.photo} alt={booking.item.title} className="image" />
            </div>
            <div className="booking-details">
              <h4>{booking.item.title}</h4>
              <p>City: {booking.item.city}</p>
              <p>Description: {booking.item.desc}</p>
              <p>Address: {booking.item.address}</p>
              <div className="booking-related-details">
                <p>Name: {booking.name}</p>
                <p>Email: {booking.email}</p>
                <p>Phone: {booking.phone}</p>
              </div>
            </div>
          </div>
        ))}
      </>
    </div>
  );
};

export default Dashboard;
