import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = ({ cartItems, totalAmount, discount, currency, delivery_fee, applyCoupon, couponCode }) => {
  const [couponInput, setCouponInput] = useState("");

  // Calculate total amount after discount and delivery fee
  const total = totalAmount + delivery_fee - discount;

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART "} text2={"TOTAL"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency}{totalAmount.toFixed(2)}</p>
        </div>
        <hr />
        <div className="flex justify-between">
          <p>Delivery Fee</p>
          <p>{currency}{delivery_fee.toFixed(2)}</p>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-500">
            <p>Discount</p>
            <p>-{currency}{discount.toFixed(2)}</p>
          </div>
        )}
        <div className="flex justify-between">
          <b>Total</b>
          <b>
            {currency}
            {total.toFixed(2)} {/* Correct the total calculation here */}
          </b>
        </div>

        {/* Show Applied Coupon */}
        {couponCode && (
          <div className="flex justify-between mt-4 text-green-500">
            <p>Applied Coupon</p>
            <div className="flex items-center">
              <p>{couponCode}</p>
              <button
                className="ml-2 text-red-500"
                onClick={removeCoupon} // Call the function to remove the coupon
              >
                Remove
              </button>
            </div>
          </div>
        )}

        {/* Coupon Input */}
        {!couponCode && (
          <div className="flex justify-between mt-4">
            <input
              className="border px-2 py-1 w-2/3"
              type="text"
              placeholder="Enter coupon code"
              value={couponInput}
              onChange={(e) => setCouponInput(e.target.value)}
            />
            <button
              className="bg-blue-500 text-white px-4 py-1"
              onClick={() => applyCoupon(couponInput)} // Apply coupon when clicked
            >
              Apply
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartTotal;
