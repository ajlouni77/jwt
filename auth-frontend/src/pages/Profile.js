import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/profile", { withCredentials: true })
      .then((res) => setMessage(res.data.message))
      .catch(() => navigate("/signin"));
  }, [navigate]);

  return (
    <div>
      <h2>Profile Page</h2>
      <p>{message}</p>
    </div>
  );
};

export default Profile;
