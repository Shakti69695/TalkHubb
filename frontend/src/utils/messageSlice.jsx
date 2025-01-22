import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const sendMessage = createAsyncThunk(
  "data/sendData",
  async ({ text, _id }, { rejectWithValue }) => {
    try {
      const res = await fetch(`http://localhost:8000/sendMessage/${_id}`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (!res) {
        throw new Error("Failed to send data");
      }
      console.log(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const messageSlice = createSlice({
  name: "message",
  initialState: {
    status: "idle", // idle || pending || fullfille || rejected
    messageTrigger: false,
  },
  reducers: {
    toggleMessageTrigger: (state) => {
      state.messageTrigger = !state.messageTrigger;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = "pending";
      })
      .addCase(sendMessage.fulfilled, (state) => {
        state.status = "fullfilled";
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { toggleMessageTrigger } = messageSlice.actions;
export default messageSlice.reducer;
