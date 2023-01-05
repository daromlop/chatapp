import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    setUser: (state, action) => {
      const googleUser = action.payload;
      state.user = googleUser;
    },
    unsetUser: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, unsetUser } = userSlice.actions;

export default userSlice.reducer;
