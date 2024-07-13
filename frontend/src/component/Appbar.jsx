import React from "react";
import { useNavigate } from "react-router-dom";

const Appbar = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.navbarBrand} onClick={handleHome}>
          Bike Service App
        </div>
        <div style={styles.navbarCollapse}>
          <div style={styles.nav}>
            <button style={styles.btnOutlineLight} onClick={handleHome}>
              Home
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: "#343a40", // Dark background
    color: "white",
    padding: "1rem",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  navbarBrand: {
    cursor: "pointer",
    fontSize: "1.25rem",
    fontWeight: "bold",
  },
  navbarCollapse: {
    display: "flex",
  },
  nav: {
    display: "flex",
    alignItems: "center",
  },
  btnOutlineLight: {
    background: "transparent",
    border: "1px solid white",
    color: "white",
    padding: "0.5rem 1rem",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
};

styles.btnOutlineLightHover = {
  ...styles.btnOutlineLight,
  backgroundColor: "white",
  color: "#343a40",
};

export default Appbar;
