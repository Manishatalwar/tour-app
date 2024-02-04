import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
} from '@mui/material';
import {
  updateFormData,
  resetFormData,
  addBooking,
  selectFormData,
} from '../../Redux/Slice/bookingSlice';
import './BookingDetails.css';
import { useNavigate } from 'react-router-dom';

const BookingDetails = ({ open, onClose, item }) => {
  console.log("item----",item);
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    dispatch(updateFormData({ [e.target.name]: e.target.value }));
  };

  const handleBookNow = () => {
    // Validate the form data before booking
    if (!formData.name || !formData.email || !formData.phone) {
      alert('All fields are required.');
      return;
    }
  
    // Dispatch the addBooking action with the form data and item
    dispatch(addBooking({ formData, item }));
  
    // Reset the form data after booking
    dispatch(resetFormData());
  
    // Navigate to the dashboard page
    navigate('/dashboard');
  };
  

  const handleConfirmYes = () => {
    // Dispatch the addBooking action with the combined form data and item
    dispatch(addBooking({ formData, item }));

    // Reset the form data after booking
    dispatch(resetFormData());

    // Navigate to the dashboard page
    navigate('/dashboard');
  };

  const handleConfirmNo = () => {
    // Close the confirmation modal
    setShowConfirmationModal(false);
  };

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle></DialogTitle>
        <DialogContent>
          <DialogTitle style={{ textAlign: 'center', color: '#3482B5', fontSize: "30px" }}>{item?.title}</DialogTitle>
          <Typography variant="h6" sx={{ textAlign: 'center' }}>
            Book Now Tour
          </Typography>
          <Typography sx={{ mt: 1, color: 'text.secondary', textAlign: 'center' }}>
            Secure your spot for an amazing experience!
          </Typography>
          <form>
          <TextField
  label="Name"
  name="name"
  value={formData.name}
  onChange={(e) => handleInputChange(e)}
  fullWidth
  sx={{ mt: 2 }}
/>
<TextField
  label="Email"
  name="email"
  value={formData.email}
  onChange={(e) => handleInputChange(e)}
  fullWidth
  sx={{ mt: 2 }}
/>
<TextField
  label="Phone"
  name="phone"
  value={formData.phone}
  onChange={(e) => handleInputChange(e)}
  fullWidth
  sx={{ mt: 2 }}
/>
<TextField
  label="Number of Guests"
  type="number"
  name="guests"
  value={formData.guests}
  onChange={(e) => handleInputChange(e)}
  fullWidth
  sx={{ mt: 2 }}
/>
   </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Close</Button>
          <Button onClick={handleBookNow}>Book Now</Button>
        </DialogActions>
      </Dialog>

      {/* Confirmation Modal */}
      <Dialog open={showConfirmationModal} onClose={() => setShowConfirmationModal(false)}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <p>Your data has been saved. Move to the dashboard page?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmNo}>No</Button>
          <Button onClick={handleConfirmYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default BookingDetails;
