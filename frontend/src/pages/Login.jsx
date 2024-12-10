import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";

const Login = () => {
  const { backendUrl, token, setToken, navigate } = useContext(ShopContext);
  const [usernameOrEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setError] = useState("");

  // Check if the user is already logged in when component is mounted
  useEffect(() => {
    if (token) {
      // Redirect to homepage if user is already logged in
      navigate("/");
    }
  }, [token, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // Login request
      console.log({
        usernameOrEmail,
        password,
      });
      const response = await axios.post(backendUrl + "/auth/signin", {
        usernameOrEmail,
        password,
      });
      const { token } = response.data;

      if (token) {
        setToken(token);
        localStorage.setItem("token", token);
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        console.error("Response data:", error.response.data);
        const { message } = error.response.data;

        // Nếu message là "Please verify your account", lưu vào state
        if (message === "Please verify your account") {
          setError(message);
        } else {
          toast.error(message || "Login failed.");
        }
      } else {
        console.error("Error:", error.message);
        toast.error("An error occurred. Please try again.");
      }
    }
  };

  const handleFacebookLogin = () => {
    const width = 600;
    const height = 700;
    const top = (window.innerHeight - height) / 2;
  
    const popup = window.open(
      'http://localhost:3000/auth/facebook',
      'Facebook Login',
      `width=${width},height=${height},top=${top},scrollbars=no,resizable=no`
    );
  
    // Lắng nghe thông điệp từ popup
    const handleMessage = (event) => {
      // Kiểm tra nguồn gửi (bảo mật)
      if (event.origin !== 'http://localhost:3000') return;
  
      // Xử lý thông điệp từ popup
      const { type, token } = event.data;
      if (type === 'FACEBOOK_LOGIN' && token) {
        localStorage.setItem('token', token); // Lưu token vào localStorage
        toast.success('Logged in successfully with Facebook!');
        navigate('/'); // Điều hướng nếu cần
      }
  
      // Xóa sự kiện sau khi xử lý
      window.removeEventListener('message', handleMessage);
    };
  
    // Thêm sự kiện lắng nghe
    window.addEventListener('message', handleMessage);
  
    // Kiểm tra nếu popup bị đóng
    const checkPopupClosed = setInterval(() => {
      if (!popup || popup.closed) {
        clearInterval(checkPopupClosed);
        window.removeEventListener('message', handleMessage);
      }
    }, 500);
  };
  

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">Login</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={usernameOrEmail}
        type="text"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email or username"
        required
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
      />

      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p onClick={() => navigate("/signup")} className="cursor-pointer">
          Do not have an account? Sign Up
        </p>
      </div>
      <button type="submit" className="w-full py-2 bg-gray-800 text-white">
        Login
      </button>
      {errorMessage && (
        <div className="mt-4 text-red-600 text-sm">
          {errorMessage}.{" "}
          <span
            onClick={() => navigate("/verify-email")}
            className="text-blue-600 underline cursor-pointer"
          >
            Verify now
          </span>
        </div>
      )}

      {/* Facebook Login Button */}
      <div className="w-full flex justify-center mt-4">
        <button
          type="button"
          onClick={handleFacebookLogin}
          className="w-full py-2 bg-blue-600 text-white flex justify-center items-center gap-2"
        >
          <i className="fab fa-facebook-f"></i> Log in with Facebook
        </button>
      </div>

      <ToastContainer />
    </form>
  );
};

export default Login;
