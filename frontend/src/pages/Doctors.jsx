import React, { useContext, useEffect } from "react";
import { AppContext, useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Doctors() {
  const { doctors, getAllDoctors } = useContext(AppContext);

  useEffect(() => {
    getAllDoctors();
  }, []);

  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-center text-3xl text-blue-400 font-extrabold my-10">
        Doctors
      </h1>
      <div className=" flex items-center justify-center flex-wrap gap-5">
        {doctors?.map((doctor) => {
          return (
            <div
              key={doctor._id}
              className="w-[230px] p-4 h-74 bg-blue-50 shadow-lg m-4 cursor-pointer flex flex-col gap-3 pb-5 items-center capitalize rounded-md overflow-hidden"
              onClick={() => navigate(`/doctors/${doctor._id}`)}
            >
              <img src={doctor.img} alt="" className=" h-36" />
              <h2>
                <span className="font-semibold">name : </span> {doctor.name}
              </h2>
              <p>
                <span className="font-semibold">type : </span>
                {doctor.type}
              </p>
              <button className="border text-white font-semibold  px-3 py-1 rounded-lg bg-blue-400 hover:bg-blue-500">
                Book Appointment
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
