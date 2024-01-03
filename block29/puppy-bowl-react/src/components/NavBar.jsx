import React from "react";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <Link to="/">All Players</Link>
      <span> </span>
      <Link to="/addNew">New Player</Link>
    </nav>
  );
}
