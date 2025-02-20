import { useDispatch, useSelector } from "react-redux";
import Header from "../components/Header";
import MessageBox from "../components/MessageBox";
import Sidebar from "../components/Sidebar";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NoChatSelected from "../components/NoChatSelected";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);
  const selectUser = useSelector((store) => store.selectedUser);

  const fetchUser = async () => {
    try {
      const res = await fetch("/user", {
        credentials: "include",
      });
      const data = await res.json();

      dispatch(addUser(data));
    } catch (error) {
      navigate("/login");
      console.error(error);
    }
  };
  useEffect(() => {
    if (!userData) {
      fetchUser();
    }
  }, []);

  return (
    <div className="h-full">
      <Header />
      <div className="flex gap-4 px-4 h-full lg:h-5/6">

        <Sidebar />
        {!selectUser ? <NoChatSelected /> : <MessageBox />}
      </div>
    </div>
  );
};

export default Home;
