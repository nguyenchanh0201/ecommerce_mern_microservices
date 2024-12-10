import React, { useState, useEffect } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users from API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3003/user/");
        if (response.data.success) {
          setUsers(response.data.message);
        } else {
          setError("Failed to fetch users");
        }
        setLoading(false);
      } catch (err) {
        setError("Error fetching users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle Delete User
  const handleDeleteUser = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3003/user/${id}`);
      if (response.data.success) {
        setUsers(users.filter((user) => user.id !== id));
      } else {
        setError("Failed to delete user");
      }
    } catch (err) {
      setError("Error deleting user");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Manage Users</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Phone Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.name || "N/A"}</td>
              <td>{user.email}</td>
              <td>{user.username}</td>
              <td>{user.phoneNumber}</td>
              <td>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteUser(user.id)}
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

export default UsersList;
