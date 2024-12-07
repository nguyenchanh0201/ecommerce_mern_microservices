import { createContext, useState } from "react";
import PropTypes from "prop-types";
import { products } from "../assets/assets";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
const currency = "$";
const delivery_fee = 10;
const [search, setSearch] = useState("");
const [showSearch, setShowSearch] = useState(true);
const [cartItems,setCartItems] = useState([]);
const navigate  = useNavigate();
const [couponCode, setCouponCode] = useState("");
const [discount, setDiscount] = useState(0);


const addToCart = async (itemId) => {

      let cartData = structuredClone(cartItems)

      if(cartData[itemId]){
          if(cartData[itemId]){
          cartData[itemId] += 1
          }
          else{
          cartData[itemId] = 1
          }
      }
      else{
          cartData[itemId] = 1
      }
      setCartItems(cartData)
}
  
const getCartCount = () => {
  let totalCount = 0;

  // Ensure cartItems is an object
  if (!cartItems || typeof cartItems !== 'object') {
    console.error('cartItems is not defined or not an object.');
    return totalCount;
  }

  // Iterate through cartItems keys and sum up the quantities
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
  // Only change if quantity > 0, otherwise remove product from cart
  if (quantity > 0) {
    setCartItems((prevItems) => {
      return { ...prevItems, [itemId]: quantity };
    });
  } else {
    // If quantity is 0, remove product from cart
    setCartItems((prevItems) => {
      const newItems = { ...prevItems };
      delete newItems[itemId]; // Remove products from cartItems
      return newItems;
    });
  }
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

const applyCoupon = (code) => {
  const validCoupons = {
    KIETCHANH: "20%", // Discount 20% 
    KIET20: 20, // OFF 20
    CHANH20: 20, // OFF 20

  };

  if (validCoupons[code]) {
    setCouponCode(code);

    // Check the discount style
    if (typeof validCoupons[code] === "string" && validCoupons[code].endsWith("%")) {
      const percent = parseFloat(validCoupons[code].replace("%", ""));
      const subtotal = getCartAmount();
      setDiscount((subtotal * percent) / 100); // Discount by percentage
    } else {
      setDiscount(validCoupons[code]); // Discount by fixed amount
    }

    alert(`Coupon applied! Discount: ${validCoupons[code]}`);
  } else {
    setCouponCode("");
    setDiscount(0);
    alert("Invalid coupon code!");
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