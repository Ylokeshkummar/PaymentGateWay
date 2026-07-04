import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentHeader = ({ userName = "Guest" }) => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // Redirect to login if no user data
  useEffect(() => {
    if (!user) {
      navigate("/PaymentGateWayHome"); // redirect to login page
    }
  }, [user, navigate]);

  // Logout handler
  const handleLogout = () => {
    localStorage.clear(); // clears all stored user data
    navigate("/PaymentGateWayHome");        // redirect to login page
  };

  return (
    <header className="payment-header">
      {/* Logo Section */}
      <div className="logo" onClick={() => navigate("/")}>
        💳 MyPayApp
      </div>

      {/* Navigation Options */}
      <nav className="nav-links">
        <button onClick={() => navigate("/PaymentGateWay/Transaction")}>Transactions</button>
        <button onClick={() => navigate("/PaymentGateWay/ManageBusiness")}>Manage Business</button>
      </nav>

      {/* User Profile Section */}
      <div className="user-profile">
        <span className="user-name">
          {user?.firstName} {user?.lastName}
        </span>
        <div className="profile-icon">👤</div>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default PaymentHeader;
