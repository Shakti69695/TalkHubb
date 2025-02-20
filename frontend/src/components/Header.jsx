import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";
import { removeSocket } from "../utils/socketSlice";

const Header = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useSelector((store) => store.socket.socket);

  const disconnectSocket = () => {
    if (socket && socket.connected) {
      socket.disconnect();
      dispatch(removeSocket());
      console.log("Socket disconnected successfully");
    } else {
      console.log("Socket is not connected or already disconnected");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/logout", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        credentials: "include",
      });
      disconnectSocket();
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("error:" + err.message);
    }
  };
  if (user === null) {
    return <p>Loading...</p>;
  }

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to={"/home"} className="btn btn-ghost text-xl">
          TalkHub
        </Link>
      </div>
      <p className="mx-4">Hi, {user.name}</p>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                className=""
                alt="Tailwind CSS Navbar component"
                src={user.photoUrl}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/profile"} className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <Link onClick={handleLogout}>Logout</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
