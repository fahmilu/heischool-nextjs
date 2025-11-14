import { configureStore } from '@reduxjs/toolkit';
import locationsReducer from './slices/locationsSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      locations: locationsReducer,
    },
  });
};

