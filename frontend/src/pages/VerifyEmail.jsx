import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App";
import ToastContainer from "../components/ToastContainer";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () => {
  const [email, setVerificationEmail] = useState("");
  const [code, setVerificationCode] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleResend = async () => {
    if (!email) {
      toast.error("Please enter your email first.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(backendUrl + "/auth/send-email", {
        email,
      });

      if (response.data.success) {
        toast.success("Verification email resent successfully!");
      } else {
        toast.error(response.data.message || "Resending failed.");
      }
    } catch (error) {
      console.error("Resend error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(backendUrl + "/auth/send-email", {
        email,
      });

      if (response.data.success) {
        toast.success("Verification email sent successfully!");
        setIsEmailSent(true);
      } else {
        toast.error(response.data.message || "Sending failed.");
      }
    } catch (error) {
      console.error("Sending error:", error);
      toast.error("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(backendUrl + "/auth/verify-email", {
        email,
        code,
      });

      console.log(response.data);

      if (response.data.success) {
        toast.success("Email verified successfully!");
        navigate("/login"); 
      } else {
        toast.error(response.data.message || "Verification failed.");
      }
    } catch (error) {
      console.error("Verification error:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600">
      <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] sm:max-w-[400px]">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
          Verify Your Email
        </h2>
        <p className="text-sm text-gray-600 text-center mb-6">
          Enter the verification code we sent to your email address.
        </p>

        {!isEmailSent ? (
          <form onSubmit={handleSend} className="mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setVerificationEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300"
            >
              Send Verification Email
            </button>
          </form>
        ) : (
          <div className="mb-4">
            <p className="text-center text-sm text-gray-600 mb-2">
              Verification email sent! If you didn’t receive it, you can resend.
            </p>
            <button
              className={`w-full py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleResend}
              disabled={loading}
            >
              {loading ? "Resending..." : "Resend Verification Email"}
            </button>
          </div>
        )}

        {isEmailSent && (
          <form onSubmit={handleVerify}>
            <input
              type="text"
              placeholder="Enter the verification code"
              value={code}
              onChange={(e) => setVerificationCode(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none mb-4"
              required
            />
            <button
              type="submit"
              className="w-full py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition duration-300"
            >
              Verify Email
            </button>
          </form>
        )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default VerifyEmail;
