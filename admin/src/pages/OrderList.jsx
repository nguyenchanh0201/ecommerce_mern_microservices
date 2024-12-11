import React, { useState, useEffect } from "react";
import axios from "axios";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3003/orders");
        const ordersWithProductNames = await Promise.all(
          response.data.map(async (order) => {
            const productNames = await Promise.all(
              order.products.map(async (productId) => {
                const productResponse = await axios.get(
                  `http://localhost:3003/products/${productId}`
                );
                return productResponse.data.data.productName; // Assuming the API returns the product name
              })
            );
            return { ...order, productNames }; // Include product names in the order
          })
        );
        setOrders(ordersWithProductNames);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Handle delete order
  const handleDeleteOrder = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3003/orders/${id}`);
      if (response.data.success) {
        setOrders(orders.filter((order) => order._id !== id));
      } else {
        setError("Failed to delete order");
      }
    } catch (err) {
      setError("Error deleting order");
    }
  };

  // Handle status change
  const handleChangeStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:3003/orders/${id}`, {
        status: newStatus,
      });
      setOrders(
        orders.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
    } catch (err) {
      setError("Error updating order status");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Manage Orders</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Customer ID</th>
            <th>Products</th>
            <th>Total Price ($)</th>
            <th>Created At</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={order._id}>
              <td>{index + 1}</td>
              <td>{order.userId}</td>
              <td>{order.productNames.join(", ")}</td> {/* Show product names */}
              <td>{order.totalPrice}</td>
              <td>{new Date(order.createdAt).toLocaleString()}</td>
              <td>
                <select
                  className="form-select form-select-sm"
                  value={order.status}
                  onChange={(e) => handleChangeStatus(order._id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="delivered">Delivered</option>
                  <option value="canceled">Canceled</option>
                </select>
              </td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteOrder(order._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrdersList;
