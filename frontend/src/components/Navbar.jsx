import { ArrowDown, Droplets, MoveDown, User } from "lucide-react";
import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function Navbar() {
  const navigate = useNavigate();

  const { token, setToken } = useContext(AppContext);
  function handleLogout() {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/login");
  }
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-200">
      <button onClick={() => navigate("/")}>Logo</button>
      <nav>
        <ul className="sm:flex hidden gap-10">
          <li>
            <NavLink to="/doctors">Doctors</NavLink>
          </li>

          <li>
            <NavLink to="/myAppoitments">My Appointments</NavLink>
          </li>
        </ul>
      </nav>
      <div>
        {token ? (
          <div className="flex items-center group relative hover:bg-slate-400 cursor-pointer hover:text-white px-2 py-2 rounded-md">
            <User />
            {/* <ArrowDown className="w-5 relative top-0.5" /> */}
            <div className="absolute min-w-40 flex-col capitalize top-10 right-0 bg-white border border-gray-200 rounded-md  hidden group-hover:flex">
              <NavLink
                to="/doctors"
                className={"text-black px-5 py-3 hover:bg-slate-300 sm:hidden "}
              >
                doctors
              </NavLink>
              <NavLink
                to="/myAppoitments"
                className={
                  "text-black px-5 py-3 hover:bg-slate-300 whitespace-nowrap  sm:hidden"
                }
              >
                my Appointments
              </NavLink>
              <NavLink
                to="/profile"
                className={"text-black px-5 py-3 hover:bg-slate-300 "}
              >
                Profile
              </NavLink>
              <button
                to="/profile"
                className={
                  "text-black px-5 py-3 bg-red-400 hover:bg-slate-300 "
                }
                onClick={handleLogout}
              >
                logout
              </button>
            </div>
          </div>
        ) : (
          <button onClick={() => navigate("/login")}>Login</button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
