import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
  name: "socket",
  initialState: { socket: null },
  reducers: {
    addSocket: (state, action) => {
      state.socket = action.payload;
    },
    removeSocket: (state, action) => {
      return null;
    },
  },
});

export const { addSocket, removeSocket } = socketSlice.actions;

export default socketSlice.reducer;
