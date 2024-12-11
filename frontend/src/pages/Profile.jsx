import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";

const ProfileForm = () => {
  const [profileData, setProfileData] = useState({
    name: '',
    username: '',
    email: '',
    phoneNumber: '',
    profilePicture: null,
  });

  const [initialData, setInitialData] = useState(null); // Store initial data for comparison

  // Access backend URL from the ShopContext
  const backendUrl = useContext(ShopContext);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Fetch profile data from API
        const response = await axios.get(`${backendUrl.backendUrl}/account/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        // Set the profile data to state
        const fetchedData = {
          name: response.data.message.name,
          username: response.data.message.username,
          email: response.data.message.email,
          phoneNumber: response.data.message.phoneNumber,
          profilePicture: response.data.message.profilePicture,
        };

        setProfileData(fetchedData);
        setInitialData(fetchedData); // Save fetched data as initial data
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    fetchProfileData();
  }, [backendUrl]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Identify changed fields
    const updatedFields = {};
    for (const key in profileData) {
      if (profileData[key] !== initialData[key]) {
        updatedFields[key] = profileData[key];
      }
    }

    // Avoid sending an empty request
    if (Object.keys(updatedFields).length === 0) {
      toast.info("No changes detected.");
      return;
    }

    try {
      // Update profile data via API
      console.log(updatedFields);
      const response = await axios.put(
        `${backendUrl.backendUrl}/account/profile`,
        updatedFields,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      console.log("Profile updated:", response.data);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("An error occurred while updating the profile.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg"
    >
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Edit Profile</h2>

      {/* Profile Picture */}
      <div className="mb-6 text-center">
        <div className="flex items-center justify-center w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full">
          {profileData.profilePicture ? (
            <img
              src={profileData.profilePicture}
              alt="Profile"
              className="object-cover w-full h-full rounded-full"
            />
          ) : (
            <span className="text-gray-500">User</span>
          )}
        </div>
      </div>

      {/* Name */}
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 font-medium mb-1">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={profileData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
          required
        />
      </div>

      {/* Username */}
      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          value={profileData.username}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
          required
        />
      </div>

      {/* Email */}
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={profileData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
          required
        />
      </div>

      {/* Phone */}
      <div className="mb-4">
        <label htmlFor="phone" className="block text-gray-700 font-medium mb-1">
          Phone
        </label>
        <input
          type="tel"
          id="phone"
          name="phoneNumber"
          value={profileData.phoneNumber}
          onChange={handleChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-indigo-200"
        />
      </div>

      {/* Change Password */}
      <div className="mb-4 text-center">
        <p
          onClick={() => window.location.href = "/change-password"}
          className="text-blue-600 underline cursor-pointer"
        >
          Change your password
        </p>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
      >
        Save Changes
      </button>
    </form>
  );
};

export default ProfileForm;
