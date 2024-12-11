import { useState, useContext } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { ShopContext } from "../context/ShopContext";
import { useNavigate } from "react-router-dom"; 
const ChangePassword = () => {
  const { backendUrl } = useContext(ShopContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const navigate = useNavigate();

  const handleChangePassword = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("You are not logged in.");
      return;
    }

    if (!oldPassword || !newPassword) {
      toast.error("Both old and new passwords are required.");
      return;
    }
    if(oldPassword === newPassword) {
        toast.error("Old and new passwords must be different.");
        return;
    }
    try {
      const response = await axios.put(
        `${backendUrl}/auth/change-password`,
        {
          oldPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      toast.success(response.data.message || "Password changed successfully!");
      setOldPassword("");
      setNewPassword("");

      
      navigate("/");

    } catch (error) {
      
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        toast.error(message || "Failed to change password.");
      } else {
        console.error("Change password error:", error);
      }
    }
  };

  return (
    <div>
      <form
        onSubmit={handleChangePassword}
        className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-md"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Change Password</h2>

        {/* Old Password */}
        <div className="mb-4">
          <label htmlFor="oldPassword" className="block text-gray-700 font-medium mb-1">
            Old Password
          </label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-700 font-medium mb-1">
            New Password
          </label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition-colors"
        >
          Change Password
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ChangePassword;
