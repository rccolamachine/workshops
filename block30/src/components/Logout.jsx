import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logout(props) {
  // console.log(history.state);
  // history.pushState("", "", "/account");
  // console.log(history.state);
  const navigate = useNavigate();
  useEffect(() => {
    props.setUser({});
    props.setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  }, []);
  return <></>;
}
