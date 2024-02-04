// bookingSlice.js
import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'booking',
  initialState: {
    formData: {
      name: '',
      email: '',
      phone: '',
      guests: 1,
    },
    bookings: [], // Array to store booked items
  },
  reducers: {
    updateFormData: (state, action) => {
      state.formData = { ...state.formData, ...action.payload };
    },
    resetFormData: (state) => {
      state.formData = {
        name: '',
        email: '',
        phone: '',
        guests: 1,
      };
    },
    addBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
  },
});

export const { updateFormData, resetFormData, addBooking } = bookingSlice.actions;
export const selectFormData = (state) => state.booking.formData;
export const selectBookings = (state) => state.booking.bookings;

export default bookingSlice.reducer;
