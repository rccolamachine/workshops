import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div id="navbar">
      <Link to="/red" className="red">
        red
      </Link>
      <Link to="/orange" className="orange">
        orange
      </Link>
      <Link to="/yellow" className="yellow">
        yellow
      </Link>
      <Link to="/green" className="green">
        green
      </Link>
      <Link to="/blue" className="blue">
        blue
      </Link>
      <Link to="/" className="home">
        home
      </Link>
    </div>
  );
}
