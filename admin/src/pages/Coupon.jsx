import { useState, useEffect } from "react";
import axios from "axios";

const CouponList = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: "",
    
  });
  const [editingCoupon, setEditingCoupon] = useState(null);

  // Fetch coupons from API
  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get("http://localhost:3003/products/coupons");
        if (response.data) {
          setCoupons(response.data);
        } else {
          setError("Failed to fetch coupons");
        }
        setLoading(false);
      } catch (err) {
        setError("Error fetching coupons");
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  // Handle Add Coupon
  const handleAddCoupon = async (e) => {
    e.preventDefault();

    const couponData = {
      code: newCoupon.code,
      discount: newCoupon.discount,
      
    };

    try {
      const response = await axios.post("http://localhost:3003/products/coupons", couponData);

      if (response.data) {
        setCoupons([...coupons, response.data]);
        resetForm();
        alert("Coupon added successfully!");
      } else {
        setError("Failed to add coupon");
      }
    } catch (err) {
      console.error(err);
      setError("Error adding coupon");
    }
  };

  // Handle Edit Coupon
  const handleEditCoupon = async (e) => {
    e.preventDefault();
    if (!editingCoupon) return;

    const couponData = {
      code: newCoupon.code,
      discount: newCoupon.discount,
     
    };

    try {
      const response = await axios.put(
        `http://localhost:3003/products/coupons/${editingCoupon._id}`,
        couponData
      );

      if (response.data) {
        setCoupons((prevCoupons) =>
          prevCoupons.map((coupon) =>
            coupon._id === editingCoupon._id ? response.data : coupon
          )
        );
        setEditingCoupon(null);
        resetForm();
        alert("Coupon updated successfully!");
      } else {
        setError("Failed to update coupon.");
      }
    } catch (err) {
      console.error(err);
      setError("Error updating coupon.");
    }
  };

  // Handle Delete Coupon
  const handleDeleteCoupon = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3003/products/coupons/${id}`);
      if (response.data) {
        setCoupons(coupons.filter((coupon) => coupon._id !== id));
      } else {
        setError("Failed to delete coupon");
      }
    } catch (err) {
      setError("Error deleting coupon");
    }
  };

  // Reset the form
  const resetForm = () => {
    setEditingCoupon(null);
    setNewCoupon({
      code: "",
      discount: "",
     
    });
  };

  const handleEditClick = (coupon) => {
    setEditingCoupon(coupon);
    setNewCoupon({
      code: coupon.code,
      discount: coupon.discount,
     
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Coupon Management</h1>
      <div className="card p-3">
        <h5>{editingCoupon ? "Edit Coupon" : "Add New Coupon"}</h5>
        <form onSubmit={editingCoupon ? handleEditCoupon : handleAddCoupon} className="mb-3">
          <input
            type="text"
            className="form-control mb-2"
            placeholder="Coupon Code"
            value={newCoupon.code}
            onChange={(e) =>
              setNewCoupon({ ...newCoupon, code: e.target.value })
            }
          />
          <input
            type="number"
            className="form-control mb-2"
            placeholder="Discount Percentage"
            value={newCoupon.discount}
            onChange={(e) =>
              setNewCoupon({ ...newCoupon, discount: e.target.value })
            }
          />
          
          <button type="submit" className="btn btn-primary">
            {editingCoupon ? "Update Coupon" : "Add Coupon"}
          </button>
          {editingCoupon && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </form>
      </div>

      <h5 className="mt-4">Coupon List</h5>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Coupon Code</th>
            <th>Discount (%)</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {coupons.map((coupon, index) => (
            <tr key={coupon._id}>
              <td>{index + 1}</td>
              <td>{coupon.code}</td>
              <td>{coupon.discount}</td>
              
              <td>{new Date(coupon.createdAt).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEditClick(coupon)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteCoupon(coupon._id)}
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

export default CouponList;
