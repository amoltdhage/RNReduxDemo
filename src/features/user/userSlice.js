import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,       // Stores user info
  isSignedUp: false, // Tracks if user has signed up
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Sign up or set user data
    signUp: (state, action) => {
      state.user = action.payload;
      state.isSignedUp = true;
    },

    // Update user data (phone & password)
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    // Logout user
    signOut: (state) => {
      state.user = null;
      state.isSignedUp = false;
    },
  },
});

export const { signUp, updateUser, signOut } = userSlice.actions;
export default userSlice.reducer;
