import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { SiMediafire } from "react-icons/si";
import { RiNotification2Line } from "react-icons/ri";
import { AuthContext } from "../../AuthProvider/AuthProvider";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const handelLogOut = () => {
    logout()
      .then(() => {})
      .catch((err) => console.error(err));
  };
  const menuBar = (
    <>
      <li className="  text-white">
        <Link to="/home">HOME</Link>
      </li>
      <li className="  text-white">
        <Link to="/media">MEDIA</Link>
      </li>
      <li className="  text-white">
        <Link to="/message">MESSAGE</Link>
      </li>

      <li className="  text-white">
        <Link to="/about">ABOUT</Link>
      </li>
      <li>
        <div>
          <input
            className=" rounded-sm border-blue-700 font-semibold text-black w-32 p-1 border"
            type="search"
            placeholder="search"
            id="search"
            name="search"
          />
        </div>
      </li>
    </>
  );
  return (
    <div
      className="navbar bg-blue-700"
      data-aos="fade-down"
      data-aos-delay="50"
      data-aos-duration="1000"
    >
      <div className="navbar-start">
        <div className="dropdown">
          <label
            tabIndex={0}
            className="btn bg-white text-black sm:mr-2 lg:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-blue-700 text-white font-bold rounded-box  border-2 "
          >
            {menuBar}
          </ul>
        </div>
        <div className="flex items-center justify-center font-extrabold font-mono text-xl md:text-2xl text-white">
          <Link to="/" className=" ">
            <SiMediafire className="text-3xl"></SiMediafire>
          </Link>
          <Link className="hidden sm:block" to="/">
            MINI MEDIA
          </Link>
          <Link className="block sm:hidden text-sm sm:text-lg" to="/">
            M MEDIA
          </Link>
        </div>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal font-bold">{menuBar}</ul>
      </div>
      <div className="navbar-end">
        <button className="flex items-center mr-2">
          <RiNotification2Line className="w-6 h-6 text-white"></RiNotification2Line>
        </button>
        <>
          {user?.email ? (
            <Link
              to="/"
              onClick={handelLogOut}
              className=" py-1 md:py-2 px-2 md:px-3 text-white font-extrabold font-mono rounded-sm border hover:bg-white hover:text-blue-700"
            >
              LOGOUT
            </Link>
          ) : (
            <Link
              to="/login"
              className=" py-1 md:py-2 px-2 md:px-3 text-white font-extrabold font-mono rounded-sm border hover:bg-white hover:text-blue-700"
            >
              LOGIN
            </Link>
          )}
        </>
      </div>
    </div>
  );
};

export default Navbar;
