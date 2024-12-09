import { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Signup = () => {
  const [currentState, setCurrentState] = useState('Sign Up');
  const {backendUrl,setToken, navigate } = useContext(ShopContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      if (currentState === 'Sign Up') {
        console.log({
          username,
          email,
          password,
          phoneNumber,
        });
        // Sign-up request
        const response = await axios.post(backendUrl+ '/auth/signup', {
          email,
          phoneNumber,
          username,
          password,
          
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message || 'Failed to sign up.');
        }
      } else {
        // Login request
        const response = await axios.post(backendUrl+ '/auth/signin', {
          email,
          password,
        });

        if (response.data.token) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);
        } else {
          toast.error(response.data.message || 'Login failed.');
        }
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
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
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {currentState === 'Sign Up' && (
        <>
          <input
            onChange={(e) => setUserName(e.target.value)}
            value={username}
            type="text"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="User Name"
            required
          />
          <input
            onChange={(e) => setPhoneNumber(e.target.value)}
            value={phoneNumber}
            type="tel"
            className="w-full px-3 py-2 border border-gray-800"
            placeholder="Phone Number"
            required
          />
        </>
      )}

      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
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
        {currentState === 'Login' ? (
          <p onClick={() => setCurrentState('Sign Up')} className="cursor-pointer">
            Create account
          </p>
        ) : (
          <p onClick={() => navigate('/login')} className="cursor-pointer">
            Already have an account?
          </p>
        )}
      </div>
      
      <button className="w-full py-2 bg-gray-800 text-white">
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'}
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

export default Signup;
