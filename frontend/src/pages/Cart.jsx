import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import axios from "axios";

const Cart = () => {
  const { currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const backEndURL = useContext(ShopContext);

  useEffect(() => {
    // Fetch product details for each item in the cart
    const fetchCartData = async () => {
      try {
        const productPromises = Object.keys(cartItems)
          .filter((productId) => cartItems[productId] > 0) // Only include items with quantity > 0
          .map(async (productId) => {
            const response = await axios.get(`${backEndURL.backendUrl}/products/${productId}`);
            const productData = response.data; // Assuming product data is in the 'data' field
            return {
              ...productData,
              quantity: cartItems[productId], // Add quantity to product data
            };
          });

        const products = await Promise.all(productPromises);
        setCartData(products);
      } catch (error) {
        console.error("Error fetching product details:", error);
        alert("Failed to load product data. Please try again later.");
      }
    };

    fetchCartData();
  }, [cartItems]); // Re-fetch data whenever cartItems change

  const handleQuantityChange = (id, value) => {
    if (value > 0) {
      updateQuantity(id, value);
    } else {
      updateQuantity(id, 0); // If value < 1, remove product from cart
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Update localStorage
  };

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR " text2="CART" />
      </div>

      {/* Cart Items */}
      <div>
        {cartData.length > 0 ? (
          cartData.map((item) => (
            <div
              key={item._id}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[3fr_1fr_1fr] sm:grid-cols-[3fr_1fr_1fr] items-center gap-4"
            >
              <div className="flex items-center gap-4">
                {/* Image Products */}
                <img
                  className="w-16 sm:w-20"
                  src={item.image[0]} // Use the correct image URL here
                  alt={item.name}
                />
                <div>
                  <p className="text-xs sm:text-lg font-medium">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {currency}
                    {item.price}
                  </p>
                </div>
              </div>

              {/* Quantity and Button Delete */}
              <div className="flex items-center gap-2 justify-center">
                <input
                  className="border px-2 py-1 text-center w-12"
                  type="number"
                  min={1}
                  value={item.quantity}
                  onChange={(e) =>
                    handleQuantityChange(item._id, parseInt(e.target.value))
                  }
                />
                <img
                  onClick={() => {
                    updateQuantity(item._id, 0); // Remove item from cart
                    localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Update localStorage
                  }}
                  className="w-4 sm:w-5 cursor-pointer"
                  src={assets.bin_icon}
                  alt="Remove item"
                />
              </div>

              {/* Price */}
              <div className="text-sm sm:text-lg font-medium text-gray-800 text-center">
                {currency}
                {(item.price * item.quantity).toFixed(2)}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-6">Your cart is empty.</p>
        )}
      </div>

      {/* Cart Total */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => navigate("/place-order")}
              className="bg-black text-white text-sm my-8 px-8 py-3"
            >
              CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
