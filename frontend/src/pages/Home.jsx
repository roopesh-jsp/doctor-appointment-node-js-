import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  return (
    <div className="w-full">
      <div className=" mx-auto py-10">
        <div className="text-center bg-blue-300 rounded-md p-4 capitalize font-semibold h-80 flex items-center flex-col py-20">
          <h1 className="text-5xl">amrutha pharmaceuticals</h1>
          <h3 className="pt-10">Welcome to the HealthCare System</h3>
          <p className="font-normal text-sm">
            This is a simple healthcare system that allows patients to book
            appointments with doctors.
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <button
          className="bg-blue-600 text-white text-xl px-3 py-2 uppercase rounded-md font-bold hover:bg-blue-700 hover:text-slate-100 transition-all"
          onClick={() => navigate("/doctors")}
        >
          book Appointment
        </button>
      </div>
    </div>
  );
}

export default Home;
