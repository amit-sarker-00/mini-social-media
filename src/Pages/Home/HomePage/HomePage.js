import React from "react";
import { HiOutlineVideoCamera } from "react-icons/hi";
import { FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <div className="border my-5 w-72 sm:w-96 mx-auto py-5">
      <div className="md:mx-5 mx-2 text-gray-500 font-semibold text-sm">
        <ul className="flex items-center gap-3 md:gap-4 lg:gap-10 justify-center ">
          <li className="flex items-center gap-1">
            <p>
              <HiOutlineVideoCamera className="md:w-5 w-3 h-5"></HiOutlineVideoCamera>
            </p>
            <p>Video</p>
          </li>
          <li className="flex items-center gap-1">
            <p>
              <FaUserFriends className="md:w-5 w-3 h-5"></FaUserFriends>
            </p>
            <p>Tag Friends</p>
          </li>
          <li>
            <button className="py-1 sm:px-3 px-1 bg-blue-700 text-white rounded-sm hover:bg-blue-500">
              <Link to="/newpost">Create Post</Link>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default HomePage;
