import { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";

const CartTotal = () => {
    const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
    
    // Kiểm tra giá trị getCartAmount
    const subtotal = getCartAmount();
    if (isNaN(subtotal)) {
        console.error("Subtotal calculation failed.");
        return null;
    }
  
    return (
        <div className="w-full">
            <div className="text-2xl">
                <Title text1={"CART "} text2={"TOTAL"} />
            </div>
            <div className="flex flex-col gap-2 mt-2 text-sm">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>{currency}{subtotal.toFixed(2)}</p>
                </div>
                <hr />
                <div className="flex justify-between">
                    <p>Delivery Fee</p>
                    <p>{currency}{delivery_fee.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                    <b>Total</b>
                    <b>{currency}{(subtotal + delivery_fee).toFixed(2)}</b>
                </div>
            </div>
        </div>
    );
  };

export default CartTotal;