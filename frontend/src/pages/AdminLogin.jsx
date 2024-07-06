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
      <Appbar></Appbar>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
    </>
  );
};

export default AdminLogin;
