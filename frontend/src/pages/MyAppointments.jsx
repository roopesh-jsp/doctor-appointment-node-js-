import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Cross, Trash, X } from "lucide-react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function MyAppointments() {
  const { backendUrl, token, getAllDoctors } = useContext(AppContext);
  const [appointments, setAppointments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [idx, setIdx] = useState();
  const navigate = useNavigate();

  if (!token) {
    toast.warn("login first");
    navigate("/login");
    return;
  }

  async function getAppointments() {
    try {
      if (!token) {
        return;
      }
      const { data } = await axios.get(backendUrl + "/user/my-appointments", {
        headers: { token },
      });

      if (data.success) {
        setAppointments(data.appointments.reverse());
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error(error.message);
    }
  }

  async function cancelAppointment(appointmentId) {
    try {
      const { data } = await axios.post(
        backendUrl + "/user/cancel-appointment",
        { appointmentId },
        { headers: { token } }
      );
      console.log(data);

      if (data.success) {
        toast.success(data.message);
        getAppointments();
        getAllDoctors();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
    setShowModal(false);
  }
  useEffect(() => {
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
                onClick={() => {
                  setShowModal(false);
                  cancelAppointment(idx);
                }}
                className="bg-red-500 flex gap-2 text-white p-2 rounded-md"
              >
                <Trash />
                delete
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  setIdx("");
                }}
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
      <div className="flex flex-wrap items-center justify-center gap-4">
        {appointments?.map((appointment) => (
          <div
            key={appointment._id}
            className="flex flex-col md:flex-row items-center border my-4 rounded-md shadow-md w-[600px] "
          >
            <img
              className="w-[200px] h-[100px]"
              src={appointment.docData.img}
              alt=""
            />
            <div className="flex flex-col gap-2 justify-center items-center h-full md:bg-blue-100 md:w-1/3 text-2xl py-2 ">
              <div>
                <h1 className="capitalize whitespace-nowrap text-lg">
                  {appointment.docData.name}
                </h1>
                <p className="capitalize text-sm text-center">
                  {appointment.docData.type}
                </p>
              </div>
              {/* <p>{appointment.fees}</p> */}
              <p className="capitalize">fees : 500/-</p>
            </div>
            <div className="flex flex-col gap-2 justify-center items-center h-full md:w-1/3 py-4 ">
              <span>day - {appointment.slotDate}</span>
              <span>Time slot - {appointment.slotTime}</span>
              {appointment.cancelled || appointment.isCompleted ? (
                <>
                  {appointment.cancelled ? (
                    <p className="text-lg text-red-400 font-semibold uppercase">
                      cancelled
                    </p>
                  ) : (
                    <p className="text-lg text-green-400 font-semibold uppercase">
                      attented
                    </p>
                  )}
                </>
              ) : (
                <button
                  className="capitalize border border-red-500 p-2 bg-red-100 font-semibold rounded-md h-fit "
                  onClick={() => {
                    setShowModal(true);
                    setIdx(appointment._id);
                  }}
                >
                  cancel Appointment
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
      <div></div>
    </div>
  );
}

export default MyAppointments;
