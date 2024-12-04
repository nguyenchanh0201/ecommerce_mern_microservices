import { useState } from 'react';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');

  const onSubmitHandlder = (e) => {
    e.preventDefault();
  }

  const handleFacebookLogin = () => {
    
    console.log('Logging in with Facebook');
  };

  return (
    <form  onSubmit={onSubmitHandlder} className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800">
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>
      {currentState === 'Login' ? (
        ''
      ) : (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
        />
      )}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
      />
      <input
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
          <p onClick={() => setCurrentState('Login')} className="cursor-pointer">
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

export default Login;
