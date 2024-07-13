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
      <Appbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h1 className="text-center">USER LOGIN</h1>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mt-4 w-100">
                    Login
                  </button>
                </form>
                <p className="mt-3 text-center">
                  New User? 
                  <button
                    type="button"
                    className="btn btn-link"
                    onClick={handleRegisterClick}
                  >
                    Register
                  </button>
                </p>
                <button
                  className="btn btn-secondary w-100 mt-2"
                  type="button"
                  onClick={handleAdminLogin}
                >
                  ADMIN LOGIN
                </button>
                {error && <p className="text-danger mt-3">{error}</p>}
                {user && (
                  <div className="mt-4">
                    <h2>Welcome, {user.username}</h2>
                    <p>Email: {user.email}</p>
                    <p>Mobile: {user.mobile}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
