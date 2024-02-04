import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    currentUser: null,
    isLoggedIn: false,
    users: [], // Array to store registered users
  },
  reducers: {
    loginUser: (state, action) => {
      const { email, password } = action.payload;

      const existingUser = state.users.find(user => user.email === email);

      if (existingUser) {
        if (existingUser.password === password) {
          state.currentUser = existingUser;
          state.isLoggedIn = true;
        } else {
          throw new Error('Incorrect password');
        }
      } else {
        throw new Error('User not found. Please register first.');
      }
    },
    registerUser: (state, action) => {
      const newUser = action.payload;

      // Check if the email already exists
      const emailExists = state.users.some(user => user.email === newUser.email);

      if (emailExists) {
        throw new Error('This email is already registered. Please go to the login page.');
      }

      state.users.push(newUser);
      state.currentUser = newUser;
      state.isLoggedIn = true;
    },
    logoutUser: (state) => {
      state.currentUser = null;
      state.isLoggedIn = false;
    },
  },
});

export const { loginUser, registerUser, logoutUser } = authSlice.actions;
export const selectCurrentUser = (state) => state.auth.currentUser;
export const selectIsLoggedIn = (state) => state.auth.isLoggedIn;

export default authSlice.reducer;
