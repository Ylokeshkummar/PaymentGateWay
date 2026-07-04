import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const PaymentGateHome = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const payload = { email, password };

      const response = await fetch("http://16.16.185.214:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error("Login failed");

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data));
      console.log(JSON.stringify(data));

      navigate("/PaymentGateWay/Dashboard");
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="home-container">
      <div className="hero-section">
        <h1 className="hero-title">Welcome to My Project</h1>
        <p className="hero-description">
          This project demonstrates modern React features with routing and payment integration.
          Log in to access your personalized dashboard, create a new account, or test payment functionality.
        </p>
      </div>

      <div className="login-card">
        <h2 className="login-title">Login</h2>
        <input
          type="text"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn login-btn" onClick={handleLogin}>Login</button>
        <button className="btn create-btn" onClick={() => navigate("/PaymentGateWayHome/SignUp")}>Create Account</button>
        <button className="btn test-btn" onClick={() => navigate("/PaymentGateWay/PaymentsShakeHandPage")}>Test Payment Functionality</button>
      </div>
    </div>
  );
};

export default PaymentGateHome;
