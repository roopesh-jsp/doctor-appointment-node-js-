import React from "react";
import { useDoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";

function DoctorAppointments() {
  const {
    dtoken,
    appointments,
    getAppointments,
    completeAppointment,
    cancleAppointment,
  } = useDoctorContext();

  useEffect(() => {
    console.log(dtoken);

    getAppointments();
  }, []);
  if (appointments.length == 0) {
    return (
      <h1 className="text-4xl text-center mt-20 font-bold uppercase w-fit mx-auto">
        no appointments
      </h1>
    );
  }
  return (
    <div>
      <p className="uppercase font-semibold mx-10 mt-5 text-xl">
        All Appointments
      </p>
      {appointments.map((item, idx) => (
        <div
          key={idx}
          className="bg-white flex flex-wrap   gap-7 rounded-sm shadow-sm m-10 p-4"
        >
          <p className="flex flex-col gap-2 ">
            <span className="font-semibold uppercase">patient</span>
            <div className="flex gap-2">
              <img src={item.userData.img} alt="" className="w-5" />
              <span>{item.userData.name}</span>
            </div>
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

          {item.cancelled || item.isCompleted ? (
            <>
              {item.cancelled ? (
                <span className="bg-red-200 rounded-md px-3 py-1 capitalize font-medium">
                  cancelled
                </span>
              ) : (
                <span className="bg-green-200 rounded-md px-3 py-1 capitalize font-medium">
                  attended
                </span>
              )}
            </>
          ) : (
            <>
              <button
                className="bg-red-400 rounded-md px-3 py-1 capitalize font-medium"
                onClick={() => cancleAppointment(item._id)}
              >
                cancel
              </button>
              <button
                onClick={() => completeAppointment(item._id)}
                className="bg-green-400 rounded-md px-3 py-1 capitalize font-medium"
              >
                mark as start
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}

export default DoctorAppointments;
