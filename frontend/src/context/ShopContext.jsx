import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  const currency = "$";
  const delivery_fee = 10;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(true);
  const [cartItems, setCartItems] = useState({});
  const navigate = useNavigate();
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);
  const [token, setToken] = useState('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
 

  // Load cartItems from localStorage on mount
  useEffect(() => {
    const savedCartItems = localStorage.getItem('cartItems');
    
    if (savedCartItems) {
      setCartItems(JSON.parse(savedCartItems));
    }
    
    if (!token && localStorage.getItem('token')) {
      setToken(localStorage.getItem('token'));
    }
  }, []);

  // Update localStorage whenever cartItems changes
  useEffect(() => {
    if (Object.keys(cartItems).length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } else {
      // If cart is empty, clear cart from localStorage
      localStorage.removeItem('cartItems');
    }
  }, [cartItems]);

  const addToCart = async (itemId) => {
    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }

    setCartItems(cartData); // Update state
  };

  const getCartCount = () => {
    let totalCount = 0;
    if (!cartItems || typeof cartItems !== 'object') {
      console.error('cartItems is not defined or not an object.');
      return totalCount;
    }

    for (const itemId in cartItems) {
      const count = cartItems[itemId];
      if (typeof count === 'number' && count > 0) {
        totalCount += count;
      } else {
        console.warn(`Invalid count for itemId: ${itemId}. Skipping...`);
      }
    }

    return totalCount;
  };

  const updateQuantity = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);

    if (quantity > 0) {
      cartData[itemId] = quantity;
    } else {
      delete cartData[itemId]; // Remove product from cart if quantity is 0
    }

    setCartItems(cartData); // Update state

    // Always update localStorage after cartItems change
    localStorage.setItem('cartItems', JSON.stringify(cartData));
  };

  const getCartAmount = () => {
    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find((product) => product._id === itemId);

      if (!itemInfo) continue;

      totalAmount += itemInfo.price * (cartItems[itemId] || 0);
    }

    return totalAmount || 0;
  };

  const applyCoupon = async (code) => {
    try {
      // Call the API to validate the coupon
      const response = await fetch(`http://localhost:3003/products/coupons/code/${code}`);
      
      if (!response.ok) {
        throw new Error("Invalid coupon code or server error.");
      }
  
      const data = await response.json(); // Parse the response JSON
      const { discount } = data; // Extract the discount value from the response
  
      if (discount) {
        setCouponCode(code);
  
        if (typeof discount === "string" && discount.endsWith("%")) {
          const percent = parseFloat(discount.replace("%", ""));
          const subtotal = getCartAmount();
          setDiscount((subtotal * percent) / 100);
        } else {
          setDiscount(discount); // Apply a flat discount
        }
  
        alert(`Coupon applied! Discount: ${discount}`);
      } else {
        throw new Error("Invalid discount received.");
      }
    } catch (error) {
      setCouponCode("");
      setDiscount(0);
      alert(error.message || "Failed to apply coupon.");
    }
  };


  

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    getCartCount,
    updateQuantity,
    getCartAmount,
    navigate,
    couponCode,
    setCouponCode,
    discount,
    setDiscount,
    applyCoupon,
    token,
    setToken,
    backendUrl,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

ShopContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
