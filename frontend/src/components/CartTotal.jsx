import { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount, discount, applyCoupon } =
    useContext(ShopContext);

  const [couponInput, setCouponInput] = useState("");

  return (
    <div className="w-full">
      <div className="text-2xl">
        <Title text1={"CART "} text2={"TOTAL"} />
      </div>
      <div className="flex flex-col gap-2 mt-2 text-sm">
        <div className="flex justify-between">
          <p>Subtotal</p>
          <p>{currency}{getCartAmount().toFixed(2)}</p>
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
            {(getCartAmount() + delivery_fee - discount).toFixed(2)}
          </b>
        </div>

        {/* Coupon Input */}
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
            onClick={() => applyCoupon(couponInput)}
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;
