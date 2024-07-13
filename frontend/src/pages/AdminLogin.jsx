import React, { useState } from "react";
import { ADMIN_CREDENTIALS } from "../constants";
import { Navigate, useNavigate } from "react-router-dom";
import Appbar from "../component/Appbar";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = credentials;

    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      navigate("/admin");
    } else {
      prompt("Invalid Credentials");
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
                <h3 className="card-title text-center">Admin Login</h3>
                <form onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      name="username"
                      value={credentials.username}
                      onChange={handleChange}
                      placeholder="Enter username"
                      required
                    />
                  </div>
                  <div className="form-group mt-3">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      placeholder="Enter password"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary mt-4 w-100">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
