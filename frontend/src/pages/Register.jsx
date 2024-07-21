import React, { useState } from "react";
import axios from "axios";
import Appbar from "../component/Appbar";
import { useNavigate } from "react-router-dom";
import { URL } from "../constants";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${URL}/api/users/register`, {
        username,
        email,
        mobile,
        password,
      });
      setUser(response.data);
      setError(null);
      console.log("Registration successful:", response.data);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
      console.error("Registration error:", err);
    }
  };

  return (
    <>
      <Appbar />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h1 className="card-title text-center">Register</h1>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
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
                    <label htmlFor="mobile">Mobile:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="mobile"
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value)}
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
                    Register
                  </button>
                </form>
                {error && <p className="text-danger mt-3">{error}</p>}
                {user && (
                  <div className="mt-4">
                    <h2>Registration successful!</h2>
                    <p>Username: {user.username}</p>
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

export default Register;
