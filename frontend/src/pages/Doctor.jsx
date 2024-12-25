import React, { useContext } from "react";

import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

function Doctor() {
  const { Did } = useParams();
  const { findDoctor } = useContext(AppContext);
  const doc = findDoctor(Did);

  return (
    <div className="flex flex-col items-center gap-3 mt-10">
      <h1 className="text-2xl">{doc.name}</h1>
      <img className="w-1/2 h-74" src={doc.img} alt="" />
      <p className="uppercase font-bold">{doc.type}</p>
      <button className="border border-black py-2 px-4 rounded-md mt-10">
        Book now
      </button>
    </div>
  );
}

export default Doctor;
