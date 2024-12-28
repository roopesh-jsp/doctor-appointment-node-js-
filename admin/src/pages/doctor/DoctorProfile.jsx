import React from "react";
import { useDoctorContext } from "../../context/DoctorContext";
import { useEffect } from "react";

function DoctorProfile() {
  const { profileData, getProfileData, backendUrl, dtoken } =
    useDoctorContext();
  useEffect(() => {
    if (dtoken) {
      getProfileData();
    }
  }, [dtoken]);
  return (
    profileData && (
      <div className="flex flex-col gap-2  w-fit mx-auto capitalize text-lg">
        <h1 className="text-2xl text-center uppercase m-4">profile</h1>
        <img src={profileData.img} alt="" className="rounded-full my-3 w-44" />
        <p>
          <span>name :</span>
          <span>{profileData.name}</span>
        </p>
        <p>
          <span>type :</span>
          <span>{profileData.type}</span>
        </p>
        <p>
          <span>fees :</span>
          <span>{profileData.fees}</span>
        </p>
        <p>
          <span>available :</span>
          <span>{profileData.available ? "yes" : "no"}</span>
        </p>
      </div>
    )
  );
}

export default DoctorProfile;
