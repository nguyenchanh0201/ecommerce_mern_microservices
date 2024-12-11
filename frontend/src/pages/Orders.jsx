import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";

const Orders = () => {
  const { currency } = useContext(ShopContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders based on date when component mounts
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No authorization token found");
          return;
        }

        const response = await axios.get("http://localhost:3003/orders/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data.orders); // Assuming the response contains a list of orders
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Failed to fetch orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle cancel order
  const cancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("No authorization token found");
        return;
      }

      const response = await axios.post(
        `http://localhost:3003/orders/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the orders list with the cancelled order
      const updatedOrders = orders.map((order) =>
        order._id === orderId ? { ...order, status: "Cancelled" } : order
      );
      setOrders(updatedOrders);

      alert("Order has been cancelled.");
    } catch (err) {
      console.error("Error cancelling order:", err);
      setError("Failed to cancel the order.");
    }
  };

  if (loading) {
    return <div>Loading orders...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="border-t pt-16">
      <div className="text-2xl">
        <Title text1="MY " text2="ORDERS" />
      </div>

      <div>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div
              key={order._id}
              className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
            >
              <div className="flex items-start gap-6 text-sm">
                <img
                  src={order.items[0]?.image || "/default-image.jpg"}
                  alt={order.items[0]?.name}
                  className="w-16 sm:w-20"
                />
                <div>
                  <p className="sm:text-base font-medium">{order.items[0]?.name}</p>
                  <div className="flex items-center gap-3 mt-2 text-base text-gray-700">
                    <p className="text-lg">{currency}{order.items[0]?.price}</p>
                    <p>Quantity: {order.items[0]?.quantity}</p>
                  </div>
                  <p className="mt-2">
                    Date:{" "}
                    <span className="text-gray-400">{new Date(order.date).toLocaleDateString()}</span>
                  </p>
                </div>
              </div>
              <div className="md:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p
                    className={`min-w-2 h-2 rounded-full ${
                      order.status === "Cancelled" ? "bg-red-500" : "bg-green-500"
                    }`}
                  ></p>
                  <p className="text-sm md:text-base">{order.status}</p>
                </div>
                {order.status !== "Cancelled" && (
                  <button
                    className="border px-4 py-2 text-sm font-medium rounded-sm"
                    onClick={() => cancelOrder(order._id)}
                  >
                    Cancel Order
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
