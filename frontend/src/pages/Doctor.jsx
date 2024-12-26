import React, { useContext, useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { use } from "react";

function Doctor() {
  const { Did } = useParams();
  const { findDoctor } = useContext(AppContext);
  const doc = findDoctor(Did);
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const [docSlots, setDocSlots] = useState([]);
  const [slotIdx, setSlotIdx] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const getAvailableSlots = async () => {
    setDocSlots([]);

    let today = new Date();

    for (let i = 0; i < 7; i++) {
      let currDate = new Date(today);
      currDate.setDate(today.getDate() + i);

      let endTime = new Date();
      endTime.setDate(today.getDate() + i);
      endTime.setHours(21, 0, 0, 0);

      if (today.getDay() === currDate.getDay()) {
        currDate.setHours(
          currDate.getHours() > 10 ? currDate.getHours() + 1 : 10
        );
        currDate.setMinutes(currDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currDate.setHours(10);
        currDate.setMinutes(0);
      }
      let timeSlots = [];
      while (currDate < endTime) {
        let formattedTime = currDate.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        timeSlots.push({
          dateTime: new Date(currDate),
          time: formattedTime,
        });

        currDate.setMinutes(currDate.getMinutes() + 60);
      }
      setDocSlots((prev) => [...prev, timeSlots]);
    }
  };

  useEffect(() => {
    getAvailableSlots();
  }, [doc]);
  // useEffect(() => {
  //   console.log(docSlots);
  // }, [docSlots]);

  return (
    <div className="flex flex-col items-center gap-3 mt-10">
      <h1 className="text-2xl">{doc.name}</h1>
      <img className="w-1/2 h-74" src={doc.img} alt="" />
      <p className="uppercase font-bold">{doc.type}</p>
      <p className="text-xl">book now</p>
      <div className="flex gap-3 mt-5 flex-wrap items-center justify-center">
        {docSlots.length &&
          docSlots.map((day, idx) => {
            {
              console.log(day[0] && days[day[0].dateTime.getDate()]);
            }
            return (
              <div
                key={idx}
                onClick={() => setSlotIdx(idx)}
                className={`cursor-pointer hover:bg-blue-400 flex flex-col items-center gap-0.5 border-2 border-gray-300 p-2 rounded-md w-16  ${
                  slotIdx === idx ? " bg-blue-500 text-white font-semibold" : ""
                }`}
              >
                <p>{day[0] && days[day[0].dateTime.getDay()]}</p>
                <hr className="bg-stone-500 text-stone-600 w-full" />
                <p>{day[0] && day[0].dateTime.getDate()}</p>
              </div>
            );
          })}
      </div>
      <div className="flex gap-3 flex-wrap my-7 items-center justify-center ">
        {docSlots.length &&
          docSlots[slotIdx].map((slot, idx) => {
            return (
              <p
                onClick={() => setSlotTime(slot.time)}
                className={`border  border-slate-500 px-3 py-1 rounded-full  cursor-pointer hover:bg-blue-400 hover:text-white1 ${
                  slotTime === slot.time ? "bg-blue-500 text-white" : ""
                }`}
              >
                {slot.time}
              </p>
            );
          })}
      </div>
      <button className="bg-blue-500 text-white px-3 py-1 rounded-md">
        Book
      </button>
    </div>
  );
}

export default Doctor;
