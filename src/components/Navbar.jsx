//icons
import {
  IoMdSunny,
  IoMdMoon,
  IoMdSearch,
  IoMdNotifications,
} from "react-icons/io";

import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { NavLinks } from "../components";

//firebase
import { signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../app/userSlice";

function themeLocalStorage() {
  return localStorage.getItem("theme") || "winter";
}

function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const logOut = async () => {
    try {
      await signOut(auth);
      toast.success(`See you soon, ${user.displayName}`);
      dispatch(logout());
    } catch (error) {
      toast.error(error.message);
    }
  };
  const [theme, setTheme] = useState(themeLocalStorage);

  const handleTheme = () => {
    const newTheme = theme == "winter" ? "dracula" : "winter";
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);
  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <NavLinks />
          </ul>
        </div>
      </div>
      <div className="navbar-center">
        <Link to="/" className="btn btn-ghost text-xl">
          Website
        </Link>
      </div>
      <div className="navbar-end">
        <button className="btn btn-ghost btn-circle">
          {/* search icon */}
          <IoMdSearch className="fill-current w-6 h-6" />
        </button>
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <IoMdNotifications className="fill-current w-6 h-6" />
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>
        <button className="btn btn-ghost btn-circle">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              onClick={handleTheme}
              type="checkbox"
              checked={theme == "dracula"}
              readOnly
            />

            {/* sun icon */}
            <IoMdSunny className="swap-on fill-current w-6 h-6" />

            {/* moon icon */}
            <IoMdMoon className="swap-off fill-current w-6 h-6" />
          </label>
        </button>
        <div className="flex items-center gap-4">
          <p className="">{user.displayName}</p>
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  user.photoURL
                    ? user.photoURL
                    : `https://api.dicebar.com/9.x/initials/svg?seed=${user.displayName}`
                }
                alt=""
              />
            </div>
          </div>
          <button onClick={logOut} className="btn btn-primary">
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
