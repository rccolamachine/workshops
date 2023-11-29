import { Link } from "react-router-dom";

export default function Navigations() {
  return (
    <div id="navbar">
      <Link to="/login" className="login">
        login
      </Link>
      <Link to="/register" className="register">
        register
      </Link>
    </div>
  );
}
