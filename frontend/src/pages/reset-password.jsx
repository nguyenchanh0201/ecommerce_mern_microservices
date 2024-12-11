import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";
import ToastContainer from "../components/ToastContainer";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSendEmail = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(backendUrl + "/auth/send-reset", { email });

      if (response.data.success) {
        toast.success("Reset password sent successfully!");
        setIsEmailSent(true);
      } else {
        toast.error(response.data.message || "Failed to send reset email.");
      }
    } catch (error) {
        console.error("Error sending reset email:", error);
      toast.error("An email does not exist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!code) {
      toast.error("Please enter the verification code.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(backendUrl + "/auth/verify-reset", { email, code });

      if (response.data.success) {
        toast.success("Code verified successfully! Enter your new password.");
        setIsCodeVerified(true);
      } else {
        toast.error(response.data.message || "Invalid verification code.");
      }
    } catch (error) {
      console.error("Error verifying code:", error);
      toast.error("Invalid verification code.Please try again.");
    } finally {
      setLoading(false);
    }
  };
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (!newPassword) {
      toast.error("Please enter a new password.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(backendUrl + "/auth/reset-password", {
        email,
        code,
        newPassword,
      });

      if (response.data.success) {
        toast.success("Password updated successfully! Redirecting to login...");
        navigate("/login");
      } else {
        toast.error(response.data.message || "Failed to reset password.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] sm:max-w-[400px]">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Reset Your Password
        </h2>

        {!isEmailSent ? (
          <form onSubmit={handleSendEmail} className="mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
              required
            />
            <button
              type="submit"
              className={`w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Reset Email"}
            </button>
          </form>
        ) : !isCodeVerified ? (
          <form onSubmit={handleVerifyCode} className="mb-4">
            <input
              type="text"
              placeholder="Enter the verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
              required
            />
            <button
              type="submit"
              className={`w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify Code"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <input
              type="password"
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
              required
            />
            <button
              type="submit"
              className={`w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-purple-600 transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Updating..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ResetPassword;