import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";
import axios from "axios";

const Cart = () => {
  const {
    currency,
    cartItems,
    updateQuantity,
    navigate,
    delivery_fee,
    applyCoupon,
    discount,
  } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0); // Added state for total amount
  const backEndURL = useContext(ShopContext);

  useEffect(() => {
    // Check if cartItems exist in localStorage
    const storedCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
  
    if (!storedCartItems || Object.keys(storedCartItems).length === 0) {
      setCartData([]); // Set cart data to empty if cartItems doesn't exist or is empty
      return;
    }
  
    // Fetch product details for each item in the cart
    const fetchCartData = async () => {
      try {
        const productPromises = Object.keys(storedCartItems)
          .filter((productId) => storedCartItems[productId] > 0) // Only include items with quantity > 0
          .map(async (productId) => {
            const response = await axios.get(
              `${backEndURL.backendUrl}/products/${productId}`
            );
            const productData = response.data.data; // Assuming product data is in the 'data' property
            return {
              ...productData,
              quantity: storedCartItems[productId], // Add quantity to product data
            };
          });
  
        const products = await Promise.all(productPromises);
        setCartData(products);
  
        // Calculate the total amount dynamically
        const calculatedTotal = products.reduce((total, product) => {
          return total + product.price * product.quantity; // price * quantity for each item
        }, 0);
  
        setTotalAmount(calculatedTotal); // Update total amount
      } catch (error) {
        console.error("Error fetching product details:", error);
        alert("Failed to load product data. Please try again later.");
      }
    };
  
    fetchCartData();
  }, [cartItems, backEndURL]); // Re-fetch data whenever cartItems or backend URL changes

  useEffect(() => {
    // Save the total amount to localStorage whenever it changes
    const total = totalAmount + delivery_fee - discount;
    localStorage.setItem("total", total.toFixed(2)); // Save total to localStorage
  }, [totalAmount, delivery_fee, discount]); // Update whenever totalAmount, delivery_fee, or discount changes

  
  

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1="YOUR " text2="CART" />
      </div>

      {/* Cart Items */}
      {cartData.length > 0 ? (
        cartData.map((item) => {
          // Check if image is available
          const productImage = `${backEndURL.backendUrl}/products/${item.imageURL}`;

          return (
            <div
              key={item._id}
              className="py-4 border-t border-b text-gray-700 grid grid-cols-[3fr_1fr_1fr] sm:grid-cols-[3fr_1fr_1fr] items-center gap-4"
            >
              <div className="flex items-center gap-4">
                {/* Image Products */}
                {productImage ? (
                  <img
                    className="w-16 sm:w-20"
                    src={productImage}
                    alt={item.productName}
                  />
                ) : (
                  <div className="w-16 sm:w-20 bg-gray-200 flex justify-center items-center">
                    {/* Default fallback image */}
                    <span className="text-gray-400">No Image</span>
                  </div>
                )}
                <div>
                  <p className="text-xs sm:text-lg font-medium">
                    {item.productName}
                  </p>
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
                    localStorage.setItem(
                      "cartItems",
                      JSON.stringify(cartItems)
                    ); // Update localStorage
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
          );
        })
      ) : (
        <p className="text-center text-gray-500 mt-6">Your cart is empty.</p>
      )}

      {/* Cart Total */}
      {cartData.length > 0 && (
        <div className="flex justify-end my-20">
          <div className="w-full sm:w-[450px]">
            <CartTotal
              cartItems={cartItems}
              totalAmount={totalAmount}
              discount={discount}
              currency={currency}
              delivery_fee={delivery_fee}
              applyCoupon={applyCoupon}
            />
            <div className="w-full text-end">
              <button
                onClick={() => {
                  if (totalAmount === 0) {
                    navigate("/collection"); // Navigate to /collection if totalAmount is 0
                  } else {
                    localStorage.setItem("total", totalAmount.toFixed(2)); // Save the total when navigating
                    navigate("/place-order"); // Navigate to /place-order otherwise
                  }
                }}
                className="bg-black text-white text-sm my-8 px-8 py-3"
              >
                {totalAmount === 0 ? "BROWSE COLLECTION" : "CHECKOUT"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

