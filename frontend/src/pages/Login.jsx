import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Appbar from "../component/Appbar";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://bike-service-app-ahz1.onrender.com/api/users/login",
        {
          email,
          password,
        }
      );
      setUser(response.data);
      setError(null);
      console.log("Login successful:", response.data);
      navigate("/user", { state: { userId: response.data.id } });
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      console.error("Login error:", err);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleAdminLogin = () => {
    navigate("/adminLogin");
  };

  return (
    <>
    <Appbar></Appbar>
      <button type="button" onClick={handleAdminLogin}>
        ADMIN LOGIN
      </button>
      <h1>USER</h1>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        New User?
        <button type="button" onClick={handleRegisterClick}>
          Register
        </button>
      </p>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {user && (
        <div>
          <h2>Welcome, {user.username}</h2>
          <p>Email: {user.email}</p>
          <p>Mobile: {user.mobile}</p>
        </div>
      )}
    </>
  );
};

export default Login;
