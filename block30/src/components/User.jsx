import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getUser } from "../api/users/users";

export default function User({ token }) {
  const [authUser, setAuthUser] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    async function currentUser() {
      try {
        const whoAmI = await getUser(token);
        setAuthUser(whoAmI);
      } catch (err) {
        console.log(err);
      }
    }
    currentUser();
  }, [token]);

  return (
    <>
      <h2>Hello, {authUser.firstname}, and Happy Reading!</h2>
      {authUser.books && (
        <h3>
          You are currently borrowing{" "}
          <button onClick={() => navigate(`/account`)}>
            {authUser.books.length}
          </button>{" "}
          books.
        </h3>
      )}
    </>
  );
}
