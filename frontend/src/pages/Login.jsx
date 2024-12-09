import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const { backendUrl, token, setToken, navigate } = useContext(ShopContext);
  const [usernameOrEmail, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Check if the user is already logged in when component is mounted
  useEffect(() => {
    if (token) {
      // Redirect to homepage if user is already logged in
      navigate('/');
    }
  }, [token, navigate]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // Login request
      console.log({
        usernameOrEmail,
        password,
      })
      const response = await axios.post(backendUrl + '/auth/signin', {
        usernameOrEmail,
        password,
      });

      if (response.data.token) {
        setToken(response.data.token);
        localStorage.setItem('token', response.data.token);
      } else {
        toast.error(response.data.message || 'Login failed.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Response data:', error.response.data); // Log thông báo lỗi từ backend
        toast.error(error.response.data.message || 'Login failed.');
      } else {
        console.error('Error:', error.message);
        toast.error('An error occurred. Please try again.');
      }
    }
    
  };

  const handleFacebookLogin = () => {
    
    console.log('Logging in with Facebook');
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
        <p className="cursor-pointer">Forgot your password?</p>
        <p onClick={() => navigate('/signup')} className="cursor-pointer">Do not have an account? Sign Up</p>
      </div>
      <button type="submit" className="w-full py-2 bg-gray-800 text-white">
        Sign In
      </button>

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
    </form>
  );
};

export default Login;
