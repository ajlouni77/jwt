import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await axios.post(
      "http://localhost:5000/logout",
      {},
      { withCredentials: true }
    );
    navigate("/signin");
  };

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/signup">Sign Up</Link>
      <Link to="/signin">Sign In</Link>
      <Link to="/profile">Profile</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default Navbar;
