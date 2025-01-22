import React, { useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Header";

const EnhancedProfileCard = () => {
  const user = useSelector((store) => store.user);

  const [name, setName] = useState("");

  const handleNameChange = () => {
    // if (name.trim() !== "") {
    //   alert(`Name updated to: ${name}`);
    // } else {
    //   alert("Name cannot be empty!");
    // }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col justify-center items-center min-h-screen bg-base-100">
        {/* Profile Card */}
        <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          {/* Top Image */}
          <div className="relative">
            <img
              className="w-full h-48 object-cover"
              src={user.photoUrl}
              alt={`${user.name}'s profile`}
            />
            {/* Overlay for effect */}
            <div className="absolute inset-0 bg-black opacity-40"></div>
          </div>

          {/* User Info */}
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-800 text-center">
              {user.name}
            </h2>
            <p className="text-gray-600 text-center mt-2">{user.email}</p>
            <p className="text-gray-500 text-center mt-2 text-sm">
              Member since: {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Input Field and Update Button */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Change Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-64 p-2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleNameChange}
            className="ml-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Update Name
          </button>
        </div>
      </div>
    </>
  );
};

export default EnhancedProfileCard;
