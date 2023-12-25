import React, { useState } from "react";
import { AiOutlineCamera, AiOutlineSave } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { failUpdate, startUpdate, successUpdate } from "../redux/features/userslice";
import { baseUrl, handleUpdateUser } from "../services/userService";

const UpdateProfile = () => {
  const { user, loading } = useSelector((state) => state.user);
  const [inputs, setInputs] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    image: user?.image,
  });
  const [selectedImage, setSelectedImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0] || inputs.image;
    setSelectedImage(URL.createObjectURL(file));
    setInputs({ ...inputs, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(startUpdate());

      const formData = new FormData();
      formData.append("firstName", inputs.firstName);
      formData.append("lastName", inputs.lastName);
      formData.append("image", inputs.image);

      const response = await handleUpdateUser(formData, user._id);
      toast("☑️ " + response.message);
      dispatch(successUpdate(response.payload));
      navigate("/profile");
      console.log(response);
    } catch (error) {
      toast("❌ " + error.response.data.message);
      dispatch(failUpdate(error.response.data.message));
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-2xl p-8 bg-[#111821] lg:ml-4 shadow-md rounded-xl h-auto relative">
      {loading && (
        <div className="fixed top-0 left-0 bg-white w-full h-full flex justify-center items-center z-50">
          <div className="border-t-transparent border-solid animate-spin rounded-full border-blue-400 border-8 h-20 w-20" />
        </div>
      )}
      <form className="rounded shadow p-6" onSubmit={handleSubmit}>
        <div className="flex justify-center mb-5 pt-4">
          <label htmlFor="image" className="relative">
            <img
              src={`${ selectedImage ? selectedImage :
                user.image.startsWith("public/images/")
                  ? baseUrl + "/" + user.image
                  : user.image
              }`}
              
              alt="profile"
              className="rounded-full group w-32 h-32 cursor-pointer hover:opacity-40 transition-all"
            />

            <div className="absolute bottom-2 right-1 bg-black p-2 rounded-full cursor-pointer">
              <AiOutlineCamera size={25} className="text-white" />
            </div>
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            name="image"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
        <div className="pb-6">
          <label htmlFor="firstName" className="text-white block pb-1">
            First Name
          </label>
          <div className="flex">
            <input
              id="firstName"
              className="border-1 text-black rounded-r px-4 py-2 w-full"
              type="text"
              name="firstName"
              onChange={handleChange}
              value={inputs.firstName}
            />
          </div>
        </div>

        <div className="pb-6">
          <label htmlFor="lastName" className="text-white block pb-1">
            Last Name
          </label>
          <div className="flex">
            <input
              id="lastName"
              className="border-1 text-black rounded-r px-4 py-2 w-full"
              type="text"
              name="lastName"
              onChange={handleChange}
              value={inputs.lastName}
            />
          </div>
        </div>
        <div className="pb-4">
          <label htmlFor="about" className="text-white block pb-1">
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
        <button
          type="submit"
          className="absolute top-5 right-5 flex items-center gap-2 cursor-pointer text-white bg-[#20303D] p-2 rounded-md"
        >
          <AiOutlineSave size={25} />
          <p>Save Profile</p>
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
