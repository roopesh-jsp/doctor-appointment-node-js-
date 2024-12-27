import React from "react";
import { useAdminContext } from "./adminContext";
import { NavLink } from "react-router-dom";
import { File, MedalIcon, Plus } from "lucide-react";

function SideBar() {
  const { adminToken } = useAdminContext();
  return (
    <div className="bg-white min-h-screen min-w-[230px]">
      {adminToken ? (
        <ul className="">
          <div
            className={`flex gap-3 items-center   px-10 py-4 capitalize cursor-pointer hover:bg-stone-300 `}
          >
            <Plus />
            <NavLink
              className={({ isActive }) => `${isActive ? "font-bold" : ""}`}
              to="/addDoc"
            >
              add doctor
            </NavLink>
          </div>
          <div
            className={`flex gap-3 items-center  px-10 py-4 capitalize cursor-pointer hover:bg-stone-300 `}
          >
            <File />
            <NavLink
              className={({ isActive }) => `${isActive ? "font-bold" : ""}`}
              to="/Appointments"
            >
              Appointments
            </NavLink>
          </div>
          <div
            className={`flex gap-3 items-center  px-10 py-4 capitalize cursor-pointer hover:bg-stone-300 `}
          >
            <MedalIcon />
            <NavLink
              className={({ isActive }) => `${isActive ? "font-bold" : ""}`}
              to="/doctors"
            >
              doctors
            </NavLink>
          </div>
        </ul>
      ) : (
        <></>
      )}
    </div>
  );
}

export default SideBar;
