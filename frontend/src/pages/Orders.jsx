import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [productDetails, setProductDetails] = useState({}); // Cache for product details

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          setError('Authorization token is missing.');
          return;
        }

        const response = await axios.get('http://localhost:3003/orders/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Sort orders by date (descending)
        const sortedOrders = response.data.sort((a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
        );

        setOrders(sortedOrders);
        setLoading(false);
      } catch (err) {
        setError('Error fetching orders: ' + err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const fetchProductDetails = async (productId) => {
    try {
      if (productDetails[productId]) {
        return productDetails[productId];
      }

      const response = await axios.get(`http://localhost:3003/products/${productId}`);
      const details = response.data.data;

      setProductDetails((prevState) => ({
        ...prevState,
        [productId]: details,
      }));

      return details;
    } catch (err) {
      console.error('Error fetching product details:', err);
      return { productName: 'Unknown Product', imageUrl: '' };
    }
  };

  const handleCancelOrder = async (orderId) => {
    try {
      const token = localStorage.getItem('token');

      if (!token) {
        setError('Authorization token is missing.');
        return;
      }

      await axios.patch(
        `http://localhost:3003/orders/${orderId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the status immediately after successful cancellation
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId ? { ...order, status: 'cancelled' } : order
        )
      );
    } catch (err) {
      setError('Error canceling order: ' + err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto my-8 px-4">
      <h1 className="text-2xl font-semibold text-center mb-6">User Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Order ID: {order._id} -{' '}
            {new Date(order.createdAt).toLocaleString()}
          </h2>

          <table className="min-w-full table-auto border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-2 text-left">Product Name</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.products.map((productId, index) => {
                const details = productDetails[productId];

                if (!details) {
                  fetchProductDetails(productId); // Fetch product details if not in cache
                  return (
                    <tr key={`${order._id}-${productId}`}>
                      <td className="px-4 py-2">Loading...</td>
                      <td className="px-4 py-2">-</td>
                      <td className="px-4 py-2">-</td>
                    </tr>
                  );
                }
                return (
                  <tr key={`${order._id}-${productId}`}>
                    <td className="px-4 py-2">{details.productName}</td>
                    <td className="px-4 py-2">{order.quantities[index]}</td>
                    <td className="px-4 py-2">${order.totalPrice}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-4 flex justify-between items-center">
            <span>Status: {order.status}</span>
            <span>Total: ${order.totalPrice}</span>
            {/* Show cancel button only if the status is not cancelled or delivered */}
            {order.status !== 'canceled' && order.status !== 'delivered' && (
              <button
                onClick={() => handleCancelOrder(order._id)}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
              >
                Cancel Order
              </button>
            )}
            {order.status === 'cancelled' && (
              <span className="text-gray-500">Cancelled</span>
            )}
            {order.status === 'delivered' && (
              <span className="text-green-500">Delivered</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderPage;
