import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default role is "user"
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Navigation hook

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await fetch("http://localhost:5001/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Registration failed");
      }

      setMessage("✅ Registration Successful! Redirecting to Login...");

      // Wait 1.5 seconds before redirecting to login page
    setTimeout(() => {
      navigate("/login");
    }, 1500);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <div style={{ width: "100%", maxWidth: "400px" }}>
        <h2 className="text-center">Register</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {message && <p style={{ color: "green" }}>{message}</p>}
        <form onSubmit={handleRegister} className="d-flex flex-column">
            <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mb-3 form-control"
            />
            <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mb-3 form-control"
            />
            <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mb-3 form-control"
            />
            <button type="submit" className="btn btn-primary mb-3">Register</button>
        </form>
        <p>Already have an account? <a href="/login">Login here</a></p>
      </div>
    </div>
  );
};

export default Register;
