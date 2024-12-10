import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    // Transform the cartItems into an array of objects with _id and quantity
    const tempData = Object.entries(cartItems)
      .filter(([, quantity]) => quantity > 0)
      .map(([id, quantity]) => ({ _id: id, quantity }));

    setCartData(tempData);
  }, [cartItems]);

  // Handle quantity change
  const handleQuantityChange = (id, value) => {
    // If value is a valid number and > 0, update cart
    if (value > 0) {
      updateQuantity(id, value);
    } else {
      updateQuantity(id, 0); // If value < 1, remove product from cart
    }
    // Update localStorage after modifying cartItems
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  return (
    <div className="border-t pt-14">
      {/* Title */}
      <div className="text-2xl mb-3">
        <Title text1="YOUR " text2="CART" />
      </div>

      {/* Cart Items */}
      <div>
        {cartData.length > 0 ? (
          cartData.map((item) => {
            const productData = products.find(
              (product) => product._id === item._id
            );

            if (!productData) return null;

            return (
              <div
                key={item._id}
                className="py-4 border-t border-b text-gray-700 grid grid-cols-[3fr_1fr_1fr] sm:grid-cols-[3fr_1fr_1fr] items-center gap-4"
              >
                <div className="flex items-center gap-4">
                  {/* Image Products*/}
                  <img
                    className="w-16 sm:w-20"
                    src={productData.image[0]}
                    alt={productData.name}
                  />
                  <div>
                    <p className="text-xs sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      {currency}
                      {productData.price}
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
                      updateQuantity(item._id, 0);
                      // Update localStorage after removing item
                      localStorage.setItem('cartItems', JSON.stringify(cartItems));
                    }}
                    className="w-4 sm:w-5 cursor-pointer"
                    src={assets.bin_icon}
                    alt="Remove item"
                  />
                </div>

                {/* Price */}
                <div className="text-sm sm:text-lg font-medium text-gray-800 text-center">
                  {currency}
                  {(productData.price * item.quantity).toFixed(2)}
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 mt-6">Your cart is empty.</p>
        )}
      </div>
      {/* Cart Total */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button onClick={() => navigate('/place-order')} className="bg-black text-white text-sm my-8 px-8 py-3">CHECKOUT</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
