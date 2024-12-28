import React, { useContext, useState } from "react";
import me from "../assets/me.jpg";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";
export default function Profile() {
  // const [userData, setUserData] = useState({
  //   name: "roopesh kumar",
  //   img: me,
  //   email: "rupzkumar5@gmail.com",
  //   gender: "male",
  //   age: 22,
  //   phoneNo: "123456789",
  // });
  const { userData, setUserData, token, backendUrl, loadUserData } =
    useContext(AppContext);
  const [isEdit, setIsEdit] = useState(false);
  const [img, setImg] = useState();

  async function handleUpdate(e) {
    e.preventDefault();
    if (!isEdit) {
      setIsEdit(true);
      return;
    }
    try {
      const formData = new FormData(e.currentTarget);
      console.log(Object.fromEntries(formData));
      console.log(token);

      const { data } = await axios.post(
        backendUrl + "/user/update-profile",
        formData,
        {
          headers: { token },
        }
      );
      console.log(data);

      if (data.success) {
        toast.success(data.message);
        await loadUserData();
        setIsEdit(false);
        setImg(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }
  return (
    userData && (
      <form onSubmit={handleUpdate} className="m-2 flex flex-col gap-2 ">
        <div>
          {isEdit ? (
            <label htmlFor="image">
              <div>
                <img
                  src={img ? URL.createObjectURL(img) : userData.img}
                  alt=""
                  className="w-2/5 aspect-square"
                />
              </div>
              <input
                type="file"
                id="image"
                name="img"
                hidden
                onChange={(e) => setImg(e.target.files[0])}
              />
            </label>
          ) : (
            <img
              src={userData.img}
              className="w-2/5 aspect-square"
              alt="profile pic"
            />
          )}
        </div>
        <div className=" flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <p className="uppercase">name :</p>
            {isEdit ? (
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="border border-gray-300 p-2 rounded-md"
              />
            ) : (
              <p className="capitalize">{userData.name}</p>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <p className="uppercase">email :</p>
            {isEdit ? (
              <input
                type="text"
                name="email"
                value={userData.email}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, email: e.target.value }))
                }
                className="border border-gray-300 p-2 rounded-md"
              />
            ) : (
              <p className="">{userData.email}</p>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <p className="uppercase">gender :</p>
            {isEdit ? (
              <select
                value={userData.gender}
                name="gender"
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, gender: e.target.value }))
                }
                className="border border-gray-300 p-2 rounded-md"
              >
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            ) : (
              <p className="capitalize">{userData.gender}</p>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <p className="uppercase">age :</p>
            {isEdit ? (
              <input
                type="text"
                name="age"
                value={userData.age}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, age: e.target.value }))
                }
                className="border border-gray-300 p-2 rounded-md"
              />
            ) : (
              <p className="capitalize">{userData.age}</p>
            )}
          </div>
          <div className="flex gap-2 items-center">
            <p className="uppercase">phoneNo :</p>
            {isEdit ? (
              <input
                type="number"
                name="phoneNo"
                value={userData.phoneNo}
                onChange={(e) =>
                  setUserData((prev) => ({ ...prev, phoneNo: e.target.value }))
                }
                className="border border-gray-300 p-2 rounded-md"
              />
            ) : (
              <p className="capitalize">{userData.phoneNo}</p>
            )}
          </div>
        </div>
        <div>
          {isEdit ? (
            <button className="bg-blue-400 px-4 py-2 text-stone-100 capitalize font-semibold rounded-md w-fit">
              save
            </button>
          ) : (
            <button className="bg-blue-400 px-4 py-2 text-stone-100 capitalize font-semibold rounded-md w-fit">
              edit
            </button>
          )}
        </div>
      </form>
    )
  );
}
