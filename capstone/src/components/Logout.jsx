import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Logout({ userId, setUserId }) {
  const navigate = useNavigate();
  useEffect(() => {
    setUserId(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("cart");
    alert("You have been successfully logged out. Please log in again.");
    navigate("/");
  }, []);
}
