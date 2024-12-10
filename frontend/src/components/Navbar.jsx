import { NavLink, Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { ShopContext } from '../context/ShopContext';

const Navbar = () => {
  const [visible, setVisible] = useState(false);
  const { setShowSearch, getCartCount, token, navigate, setToken, setCartItems } = useContext(ShopContext);

  const logout = () => {
    navigate('/login');
    localStorage.removeItem('token');
    setToken('');
    setCartItems({});
  };

  const handleProfileClick = () => {
    
    if (!token) {
      navigate('/login');
      return;
    }
    navigate('/profile');
  };

  return (
    <div className="flex items-center justify-between py-5 font-medium bg-blue-400 text-white">
      <Link to="/">
        <img src={assets.logo} alt="" className="w-36" />
      </Link>
      <ul className="hidden sm:flex gap-5 text-base font-semibold">
        <NavLink to="/" className="flex flex-col items-center gap-1 hover:text-yellow-400">
          <p>HOME</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-yellow-400 hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1 hover:text-yellow-400">
          <p>COLLECTION</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-yellow-400 hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1 hover:text-yellow-400">
          <p>ABOUT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-yellow-400 hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1 hover:text-yellow-400">
          <p>CONTACT</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-yellow-400 hidden" />
        </NavLink>
      </ul>

      <div className="flex items-center gap-6">
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt=""
        />
        <div className="group relative">
          <img
            onClick={handleProfileClick}
            src={assets.profile_icon}
            className="w-5 cursor-pointer"
            alt=""
          />
          {token && ( // Only show dropdown if logged in
            <div className="absolute hidden group-hover:block dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-gray-700 text-white">
                <p
                  className="cursor-pointer hover:text-yellow-400"
                  onClick={() => navigate('/profile')}
                >
                  My Profile
                </p>
                <p
                  className="cursor-pointer hover:text-yellow-400"
                  onClick={() => navigate('/orders')}
                >
                  Orders
                </p>
                <p onClick={logout} className="cursor-pointer hover:text-yellow-400">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5 min-w-5" alt=" " />
          <div className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-red-600 text-white aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </div>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      {/* Sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 bottom-0 overflow-hidden bg-white transition-all ${
          visible ? 'w-full' : 'w-0'
        }`}
      >
        <div className="flex flex-col text-gray-600 ">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p className="text-lg font-semibold">Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border text-lg font-medium"
            to="/"
          >
            HOME
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border text-lg font-medium"
            to="/collection"
          >
            COLLECTION
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border text-lg font-medium"
            to="/about"
          >
            ABOUT
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border text-lg font-medium"
            to="/contact"
          >
            CONTACT
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
