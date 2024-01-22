import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Logout({ token, setToken }) {
  const navigate = useNavigate();
  useEffect(() => {
    setToken(null);
    localStorage.removeItem("token");
    alert("You have been successfully logged out. Please log in again.");
    navigate("/login");
  }, []);
}
