import React, { useEffect } from "react";
import { useAdminContext } from "../../context/adminContext";

function DoctorList() {
  const { doctors, getAllDoctors, adminToken, changeAvailability } =
    useAdminContext();

  useEffect(() => {
    getAllDoctors();
  }, [adminToken, changeAvailability]);
  return (
    <div className="m-3">
      <h1 className="text-3xl font-bold my-4 mx-1 text-blue-500 uppercase">
        All doctors
      </h1>
      <div className="flex flex-wrap gap-10">
        {doctors.map((doc, idx) => (
          <div key={doc._id} className=" bg-stone-50 p-4 rounded-sm shadow-md">
            <img src={doc.img} className="w-32 h-32" alt="" />
            <h1>{doc.name}</h1>
            <h3>{doc.type}</h3>
            <div className="flex gap-3 mt-5">
              <input
                type="checkbox"
                name="available"
                onChange={() => changeAvailability(doc._id)}
                id={`doc${idx}`}
                checked={doc.available}
              />
              <label htmlFor={`doc${idx}`}>available</label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoctorList;
