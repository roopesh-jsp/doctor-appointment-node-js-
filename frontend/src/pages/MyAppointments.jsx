import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Cross, Trash, X } from "lucide-react";

function MyAppointments() {
  const { doctors } = useContext(AppContext);
  const [showModal, setShowModal] = useState(false);
  return (
    <div className="m-4">
      {showModal && (
        <div className="absolute top-[50%] right-[50%] transform translate-x-1/2 -translate-y-1/2 h-full w-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-4 rounded-md">
            <h1 className="uppercase font-bold text-stale-500 text-2xl  mb-4 text-center ">
              confirm to cancel
            </h1>
            <p className="capitalize text-lg my-4">
              appointment with the following doctor ****{" "}
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 flex gap-2 text-white p-2 rounded-md"
              >
                <Trash />
                delete
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-green-500 flex items-center justify-center gap-2 text-white p-2 rounded-md"
              >
                <X />
                cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <h1 className="uppercase font-bold text-blue-500 text-2xl  my-2 text-center">
        my Appointments
      </h1>
      <div className="flex flex-wrap gap-4">
        {doctors.slice(0, 2).map((doctor) => (
          <div
            key={doctor.id}
            className="flex flex-col md:flex-row items-center border my-4 rounded-md shadow-md  "
          >
            <img className="md:w-1/3 h-full" src={doctor.img} alt="" />
            <div className="flex flex-col gap-2 justify-center items-center h-full md:bg-green-100 md:w-1/3 text-2xl py-2 ">
              <h1 className="capitalize">name:{doctor.name}</h1>
              <p className="capitalize">{doctor.type}</p>
              {/* <p>{doctor.fees}</p> */}
              <p className="capitalize">fees : 500/-</p>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center h-full md:w-1/3 py-4 ">
              <span>Time Left- 00:00:00</span>
              <button
                className="capitalize border border-red-500 p-2 bg-red-100 font-semibold rounded-md h-fit "
                onClick={() => setShowModal(true)}
              >
                cancel Appointment
              </button>
            </div>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
}

export default MyAppointments;
