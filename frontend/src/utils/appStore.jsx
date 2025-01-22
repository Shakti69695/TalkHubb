import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import messageReducer from "./messageSlice";
import selectedUserReducer from "./selectedUserSlice";
import socketReducer from "./socketSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    message: messageReducer,
    selectedUser: selectedUserReducer,
    socket: socketReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export default appStore;
