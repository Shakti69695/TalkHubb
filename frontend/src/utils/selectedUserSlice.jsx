import { createSlice } from "@reduxjs/toolkit";

const selectedUserSlice = createSlice({
  name: "selectedUser",
  initialState: null,
  reducers: {
    selectUser: (state, action) => {
      return action.payload;
    },
  },
});

export const { selectUser } = selectedUserSlice.actions;

export default selectedUserSlice.reducer;
