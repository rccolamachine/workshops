import React from "react";
import { Link } from "react-router-dom";

export default function Navigations({ token }) {
  return (
    <>
      <nav>
        {!token && <Link to="/register">Register</Link>}
        <span> </span>
        <Link to="/">Books</Link>
        <span> </span>
        <Link to="/register">New User</Link>
        <span> </span>
        {token && (
          <Link to="/account" token={token}>
            Account
          </Link>
        )}
        <span> </span>
        {token && <Link to="/logout">Logout</Link>}
      </nav>
    </>
  );
}
