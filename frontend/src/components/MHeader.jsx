import { useSelector } from "react-redux";

const MHeader = () => {
  const user = useSelector((store) => store.selectedUser);
  if (user === null) return <p>Loading...</p>;

  return (
    <div>
      <div className="navbar bg-base-300 h-5 w-full">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src={user.photoUrl} />
          </div>
        </div>
        <p className="mx-5">{user.name}</p>
      </div>
    </div>
  );
};

export default MHeader;
