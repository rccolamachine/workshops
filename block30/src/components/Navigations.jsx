import React from "react";
import { Link } from "react-router-dom";

export default function Navigations({ token }) {
  return (
    <>
      {token && <h1>Logged In</h1>}
      <nav>
        {!token && <Link to="/login">Login</Link>}
        <span>{token} </span>
        {!token && <Link to="/register">Register</Link>}
        <span> </span>
        <Link to="/">Books</Link>
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
