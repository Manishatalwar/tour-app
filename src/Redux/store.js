// store.js
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '../Redux/Slice/authSlice';
import bookingReducer from '../Redux/Slice/bookingSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedBookingReducer = persistReducer(persistConfig, bookingReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    booking: persistedBookingReducer,
    // ... other reducers
  },
});

const persistor = persistStore(store);

export { store, persistor };
