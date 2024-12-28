import React from "react";
import { useAdminContext } from "../../context/adminContext";
import { useEffect } from "react";

function Apointments() {
  const { adminToken, appointments, getAllAppointments, cancelAppointment } =
    useAdminContext();

  useEffect(() => {
    if (adminToken) {
      getAllAppointments();
    }
  }, [adminToken]);
  if (appointments.length == 0) {
    return (
      <h1 className="text-4xl text-center mt-20 font-bold uppercase w-fit mx-auto">
        no appointments
      </h1>
    );
  }
  return (
    <div className="w-full max-w-6xl m-5">
      {appointments.map((item, idx) => {
        return (
          <div
            key={idx}
            className="flex gap-7 items-center flex-wrap m-2 py-3 px-5 text-sm bg-blue-200 rounded-md shadow-md"
          >
            <p className="flex flex-col gap-2 ">
              <span className="font-semibold uppercase">patient</span>
              <div className="flex gap-2">
                <img src={item.userData.img} alt="" className="w-5" />
                <span>{item.userData.name}</span>
              </div>
            </p>
            <p className="flex flex-col gap-2">
              <span className="font-semibold uppercase">doctor</span>
              <div>{item.docData.name}</div>
            </p>
            <p className="flex flex-col gap-2">
              <span className="font-semibold uppercase">age</span>
              <div>{item.userData.age}</div>
            </p>
            <p className="flex flex-col gap-2">
              <span className="font-semibold uppercase">date </span>
              <div>{item.slotDate}</div>
            </p>
            <p className="flex flex-col gap-2">
              <span className="font-semibold uppercase"> time</span>
              <div>{item.slotTime}</div>
            </p>
            <p className="flex flex-col gap-2">
              <span className="font-semibold uppercase">fees</span>
              <div>{item.amount}</div>
            </p>
            {item.cancelled ? (
              <span className="bg-red-200 rounded-md px-3 py-1 capitalize font-medium">
                cancelled
              </span>
            ) : (
              <button
                className="bg-red-400 rounded-md px-3 py-1 capitalize font-medium"
                onClick={() => cancelAppointment(item._id)}
              >
                cancel
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Apointments;
