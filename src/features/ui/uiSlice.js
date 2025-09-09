import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false, // Global loading
  error: null,    // Global error
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload; // true or false
    },
    clearLoading: (state) => {
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload; // string message
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { setLoading, clearLoading, setError, clearError } = uiSlice.actions;
export default uiSlice.reducer;
