import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../Store/User/userSlice';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';

// Create persist config
const persistConfig = {
  key: 'root',        // key for the persisted data in localStorage
  storage,            // defines the type of storage (localStorage in this case)
  whitelist: ['user'], // only the `user` slice will be persisted
};

// Combine your reducers
const rootReducer = combineReducers({
  user: userReducer,  // Add other reducers here if you have more in the future
});

// Persist the rootReducer using the persistConfig
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store using the persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,  // Disable serializable check due to redux-persist's handling of non-serializable values
    }),
});

// Create the persistor
export const persistor = persistStore(store);

export default store;
