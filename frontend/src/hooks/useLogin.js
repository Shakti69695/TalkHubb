import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { addSocket } from "../utils/socketSlice";

const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const connectSocket = (userId) => {
    if (userId) {
      const socket = io(`${import.meta.env.VITE_APP_BASE_URL}`, {
        query: { userID: userId },
        transports: ["websocket", "polling", "flashsocket"],
      });
      if (!socket.connected) {
        socket.connect();
        dispatch(addSocket(socket));
      }
    } else {
      console.error("User ID is not defined. Socket connection failed.");
    }
  };

  const login = async (email, password) => {
    try {
      const res = await fetch(`${import.meta.env.VITE_APP_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      dispatch(addUser(data));
      connectSocket(data._id);
      navigate("/home");
    } catch (error) {
      console.error(error.message);
    }
  };
  return { login };
};

export default useLogin;
