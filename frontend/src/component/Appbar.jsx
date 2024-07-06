import React from "react";
import { useNavigate } from "react-router-dom";

const Appbar = () => {
  const navigate = useNavigate();

  const handleHome = () => {
    navigate("/");
  };
  return (
    <>
      <div>
        <button onClick={handleHome}>Home</button>
      </div>
    </>
  );
};

export default Appbar;
