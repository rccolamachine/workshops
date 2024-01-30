import React from "react";
import { Link } from "react-router-dom";

export default function Navigations({ userId }) {
  return (
    <>
      <nav>
        <span> </span>
        <Link to="/">All Products</Link>
        <span> </span>
        {userId && <Link to="/logout">Logout</Link>}
        <span> </span>
      </nav>
    </>
  );
}
