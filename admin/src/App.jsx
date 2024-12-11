import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from "react-router-dom";

import ProductList from "./pages/ProductList";
import OrdersList from "./pages/OrderList";
import UsersList from "./pages/UserList";
import Login from "./pages/LoginForm";
import Coupon from "./pages/Coupon";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  return (
    <Router>
      <div>
        {/* Navigation */}
        {isAuthenticated && (
          <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100">
            <div className="container">
              <a className="navbar-brand" href="/products">
                Product Management
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to="/products">
                      Products
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/orders">
                      Orders
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/users">
                      Users
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/coupon">
                      Coupon
                    </Link>
                  </li>
                </ul>
                <button
                  className="btn btn-danger ms-auto"
                  onClick={() => {
                    setIsAuthenticated(false);
                  }}
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
        )}

        {/* Routes */}
        <Routes>
          {/* Redirect "/" to "/products" */}
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/products" replace /> : <Navigate to="/login" replace />
            }
          />

          {/* Login Route */}
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />

          {/* Protected Routes */}
          <Route
            path="/products"
            element={
              isAuthenticated ? <ProductList /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/orders"
            element={
              isAuthenticated ? <OrdersList /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/users"
            element={
              isAuthenticated ? <UsersList /> : <Navigate to="/login" replace />
            }
          />
          <Route 
            path="/coupon" 
            element={
              isAuthenticated ? <Coupon/> : <Navigate to="/coupon" replace />
              } 

          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
