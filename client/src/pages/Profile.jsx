import React, { useState } from "react";
import { LiaEditSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import UpdateProfile from "../components/UpdateProfile";
import { baseUrl } from "../services/userService";

const Profile = () => {
  const { user } = useSelector((state) => state.user);

  const [open, setOpen] = useState(false);

  return (
    <div className="border-b-2 block md:flex justify-center items-center py-12 px-4">
      {open ? (
        <UpdateProfile />
      ) : (
        <div className="w-full max-w-2xl p-8 bg-[#111821] lg:ml-4 shadow-md rounded-xl h-auto relative">
          <div className="rounded  shadow p-6">
            <div className="flex justify-center mb-5 pt-4">
              <img
                src={`${baseUrl}/${user?.image}`}
                alt="profile"
                className="rounded-full w-32 h-32"
              />
            </div>
            <div className="pb-6">
              <label htmlFor="firstName" className=" text-white block pb-1">
                First Name
              </label>
              <div className="flex">
                <input
                  disabled
                  id="firstName"
                  className="border-1 text-white rounded-r px-4 py-2 w-full"
                  type="text"
                  defaultValue={user?.firstName}
                />
              </div>
            </div>

            <div className="pb-6">
              <label htmlFor="lastName" className=" text-white block pb-1">
                Last Name
              </label>
              <div className="flex">
                <input
                  disabled
                  id="lastName"
                  className="border-1 text-white rounded-r px-4 py-2 w-full"
                  type="text"
                  defaultValue={user?.lastName}
                />
              </div>
            </div>
            <div className="pb-4">
              <label htmlFor="about" className=" text-white block pb-1">
                Email
              </label>
              <input
                disabled
                id="email"
                className="border-1 rounded-r px-4 py-2 w-full text-white"
                type="email"
                defaultValue={user?.email}
              />
            </div>
          </div>

          <div
            className="absolute top-5 right-5 flex items-center gap-2 cursor-pointer text-white bg-[#20303D] p-2 rounded-md"
            onClick={() => setOpen(true)}
          >
            <LiaEditSolid size={25} />
            <p>Edit Profile</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
