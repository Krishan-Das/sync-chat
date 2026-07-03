import React, { use, useContext, useEffect, useState } from "react";
import syncChat from "../assets/sync-chat.svg";
import { FiCamera, FiEdit2, FiLogOut, FiSave } from "react-icons/fi";
import api from "../services/axios";
import toast from "react-hot-toast";
import { AuthContext } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

const ProfileSec = ({ isSetting }) => {

  const [loading, setLoading] = useState(false)

  const [isEditing, setIsEditing] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null); // for profile
  const navigate = useNavigate()

  const [profile, setProfile] = useState({
    name: user?.fullName,
    email: user?.email,
    bio: user?.bio || "I am using sync-chat",
    image: user?.profilePicture || syncChat,
  });

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setSelectedImage(file);

    setProfile((prev) => ({
      ...prev,
      image: URL.createObjectURL(file),
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true)
      const formData = new FormData();

      formData.append("fullName", profile.name);
      formData.append("bio", profile.bio);

      if (selectedImage) {
        formData.append("profilePicture", selectedImage);
      }

      const response = await api.patch("/auth/profile", formData);

      toast.success(response.data.message);

      setUser(response.data.user);

      setSelectedImage(null);

      setIsEditing(false);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message || "Something went wrong."
      );
    }finally{
      setLoading(false)
    }
  };

  const logoutHandler = async () => {
    try {
      setLoading(true)
      const response = await api.post("/auth/logout");
      toast.success(response.data?.message);
      setUser(null)
      navigate("/login")
    } catch (error) {
      console.error("Error:", error)
      toast.error(error.response?.data?.message || "Something is wrong!")
    }finally{
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!isSetting) setIsEditing(false)
  }, [isSetting])

  useEffect(() => {
    setProfile({
      name: user?.fullName,
      email: user?.email,
      bio: user?.bio || "I am using sync-chat",
      image: user?.profilePicture || syncChat
    })
  }, [user])

  return (
    <div
      className={`
        absolute top-15 right-0 w-80 rounded-2xl overflow-hidden
        bg-white shadow-2xl border border-gray-200
        transition-all duration-300 ease-out origin-top-right z-[999]
        ${isSetting
          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
        }
      `}
    >
      {/* Header */}
      <div className="h-24 bg-gradient-to-r from-slate-700 via-slate-800 to-slate-900" />

      <div className="relative px-6 pb-6">

        {
          // --- Loading Handle ---
          loading && <Loader/>
        }


        {/* Avatar */}
        <div className="-mt-12 flex justify-center relative">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg ">
            <img
              src={profile.image}
              alt="profile"
              className="w-full h-full object-cover scale-120 hover:scale-180 transition duration-300 ease-out cursor-pointer"
            />
          </div>

          {isEditing && (
            <>
              <label
                htmlFor="profileImage"
                className="absolute bottom-1 right-[86px] bg-slate-800 text-white p-2 rounded-full cursor-pointer hover:bg-slate-900"
              >
                <FiCamera size={15} />
              </label>

              <input
                id="profileImage"
                type="file"
                accept="image/*"
                hidden
                onChange={handleImage}
              />
            </>
          )}
        </div>

        {!isEditing ? (
          <>
            {/* View Profile */}

            <div className="text-center mt-4">
              <h2 className="text-xl font-bold text-gray-800">
                {profile.name}
              </h2>

              <p className="text-sm text-gray-500 mt-1">
                {profile.email}
              </p>

              <p className="text-sm text-gray-600 mt-4 leading-relaxed">
                <span className="font-bold">About:</span> {profile.bio}
              </p>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsEditing(true)}
                className="flex-1 flex justify-center items-center gap-2 bg-slate-800 text-white py-2.5 rounded-xl hover:bg-slate-900 transition"
              >
                <FiEdit2 />
                Edit Profile
              </button>

              <button
                onClick={logoutHandler}
                className="flex-1 flex justify-center items-center gap-2 border border-red-500 text-red-500 py-2.5 rounded-xl hover:bg-red-50 transition">
                <FiLogOut />
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Edit Profile */}

            <div className="mt-4 flex flex-col gap-1.5">
              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Email
                </label>

                <input
                  disabled
                  value={profile.email}
                  className="mt-1 w-full border rounded-lg px-3 py-2 bg-gray-100 cursor-not-allowed"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600">
                  Bio
                </label>

                <textarea
                  rows={4}
                  name="bio"
                  value={profile.bio}
                  onChange={handleChange}
                  className="mt-1 w-full border rounded-lg px-3 py-2 resize-none outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div className="flex gap-3 mt-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 border py-2 rounded-lg hover:bg-gray-100"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSave}
                  className="flex-1 flex justify-center items-center gap-2 bg-slate-800 text-white py-2 rounded-lg hover:bg-slate-900"
                >
                  <FiSave />
                  Save
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileSec;