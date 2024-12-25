import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate, useParams } from "react-router-dom";

export default function Doctors() {
  const { doctors } = useContext(AppContext);

  const navigate = useNavigate();

  return (
    <div>
      <h1 className="text-center text-3xl text-blue-400 font-extrabold my-10">
        Doctors
      </h1>
      <div className=" flex items-center justify-center flex-wrap gap-5">
        {doctors.map((doctor) => {
          return (
            <div
              key={doctor.id}
              className="w-2/5 h-74 bg-blue-100 m-4 cursor-pointer flex flex-col gap-3 pb-5 items-center capitalize rounded-md overflow-hidden"
              onClick={() => navigate(`/doctors/${doctor.id}`)}
            >
              <img src={doctor.img} alt="" />
              <h2>name:{doctor.name}</h2>
              <p>type:{doctor.type}</p>
              <button className="border border-black px-3 py-1 rounded-lg bg-white">
                Book Appointment
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
