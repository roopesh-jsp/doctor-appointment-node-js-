import { User } from "lucide-react";
import React, { useRef, useState } from "react";
import { useAdminContext } from "../../context/adminContext";
import axios from "axios";
import { toast } from "react-toastify";

function AddDoctor() {
  const { backendUrl, adminToken } = useAdminContext();
  const formRef = useRef();
  const [docImg, setDocImg] = useState(false);
  const [loading, setLoading] = useState(false);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData(e.currentTarget);

      formData.append("img", docImg);

      const { data } = await axios.post(
        backendUrl + "/admin/add-doctor",
        formData,
        {
          headers: { adminToken: adminToken },
        }
      );
      console.log(data);

      if (data.success) {
        toast.success(data.message);
        formRef.current.reset();
      } else {
        console.log(data.message);

        toast.error(data.message);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  }
  return (
    <div className="my-5 mx-3">
      <h1 className="text-3xl font-bold my-4 text-center text-blue-500 uppercase">
        add doctor
      </h1>
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-xl p-5 mx-20 my-10"
      >
        <div className="flex gap-3 items-center capitalize">
          <label htmlFor="img" className="cursor-pointer p-4">
            {docImg ? (
              <img
                className="w-24 h-24 rounded-full p-2"
                src={URL.createObjectURL(docImg)}
                alt=""
              />
            ) : (
              <User className="w-24 h-24 hover:text-white rounded-full p-2 hover:bg-slate-400  transition-all" />
            )}
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            type="file"
            hidden
            id="img"
          />
          <p className="text-xl">select doctor image</p>
        </div>
        <div className="grid grid-cols-3 gap-10">
          <input
            type="text"
            name="name"
            placeholder="name"
            className="px-3 py-1 rounded-sm m-2 border text-lg border-stone-500"
          />
          <input
            type="email"
            name="email"
            placeholder="email"
            className="px-3 py-1 rounded-sm m-2 border text-lg  border-stone-500"
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            className="px-3 py-1 rounded-sm m-2 border text-lg  border-stone-500"
          />
          <input
            type="number"
            name="age"
            placeholder="age"
            className="px-3 py-1 rounded-sm m-2 border   border-stone-500"
          />
          <input
            type="number"
            name="fees"
            placeholder="fees"
            className="px-3 py-1 rounded-sm m-2 border   border-stone-500"
          />
          <div>
            <p className="capitalize text-xl font-semibold my-1">speciality</p>
            <select
              name="type"
              id=""
              className="px-3 py-1 rounded-sm m-2 border text-lg  border-stone-500"
            >
              <option value="general physician">general physician</option>
              <option value="gynecologist">gynecologist</option>
              <option value="heart">heart</option>
              <option value="skin">skin</option>
              <option value="dentist">dentist</option>
            </select>
          </div>
        </div>
        <button
          className="px-10 py-2 m-5 uppercase rounded-full bg-blue-500 font-bold text-stone-100"
          disabled={loading}
        >
          {loading ? "adding ... " : "add"}
        </button>
      </form>
    </div>
  );
}

export default AddDoctor;
