import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { selectUser } from "../utils/selectedUserSlice";

const Sidebar = () => {
  const [users, setUsers] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const user = async () => {
      const res = await fetch("http://localhost:8000/users", {
        credentials: "include",
      });
      const data = await res.json();
      setUsers(data);
    };
    user();
  }, []);
  const handleMessage = (user) => {
    dispatch(selectUser(user));
  };

  if (users === null) {
    return <p>Loading ...</p>;
  }

  return (
    <div className="w-14 md:w-48 sm:w-52">
      <ul
        className=" bg-base-200 rounded-box w-14 md:w-48 sm:w-52 overflow-y-auto h-screen"
        style={{ height: "525px" }}
      >
        <li className="menu-title">Contacts</li>

        {users.map((user) => (
          <button
            key={user._id}
            onClick={() => {
              handleMessage(user);
            }}
            className="flex items-center flex-row my-3 hover:bg-slate-800 w-40 md:w-48 sm:w-52"
          >
            <div className="chat-image avatar w-10 rounded-full">
              <img
                className="rounded-full"
                alt="Tailwind CSS chat bubble component"
                src={user.photoUrl}
              />
            </div>
            <li className="p-0 m-1 hidden sm:block">{user.name}</li>
          </button>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
