import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import { addSocket } from "../utils/socketSlice";

const useLogin = () => {
  const dispatch = useDispatch();
  const sendUser = useSelector((store) => store.user);
  const userId = sendUser ? sendUser._id : null;


  const connectSocket = () => {
    const socket = io("http://localhost:8000", {
      query: { userId: userId },
      transports: ["websocket", "polling", "flashsocket"],
    });
    if (!socket.connected) {
      socket.connect();
      dispatch(addSocket(socket)); // Ensure this doesn't trigger a loop
    }
  };

  const navigate = useNavigate();
  const login = async (email, password) => {
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      dispatch(addUser(data));
      connectSocket();
      navigate("/home");
    } catch (error) {
      console.error(error.message);
    }
  };
  return { login };
};

export default useLogin;
