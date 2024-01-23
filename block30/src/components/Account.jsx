import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import BookCard from "./BookCard/BookCard";

import { getUserReservations } from "../api/reservations/reservations";

export default function Account({ token, setToken }) {
  const [myBooksList, setMyBooks] = useState([]);
  const [mySavedList, setMySavedBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      token = localToken;
    }
    async function reservedBooks(token) {
      try {
        const myBooks = await getUserReservations(token);
        setMyBooks(myBooks);
        setMySavedBooks(myBooks);
      } catch (err) {
        console.log(err);
      }
    }
    reservedBooks(token);
  }, []);

  function handleSearch(e) {
    const searchResults = mySavedList.filter((book) =>
      book.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setMyBooks(searchResults);
  }

  return (
    <>
      {mySavedList.length !== 0 && (
        <>
          <h1>All your Books!</h1>
          <h2 style={{ textAlign: "center" }}>Search My Books by Title</h2>
          <input
            style={{ width: "35%", margin: "0 auto" }}
            type="text"
            onChange={handleSearch}
          />
        </>
      )}
      {myBooksList.length === 0 && mySavedList.length !== 0 && (
        <h2>
          This is the end of the search results, but you still have books
          checked out. Return them soon.
        </h2>
      )}
      {mySavedList.length === 0 && (
        <>
          <h2>All of your books have been returned. Thank you so much!</h2>
          <button onClick={() => navigate(`/`)}>Back To All Books</button>
        </>
      )}

      <div style={{ display: "flex", flexDirection: "column" }}></div>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {myBooksList.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            token={token}
            ownership={"mine"}
            component={"detail"}
          />
        ))}
      </div>
    </>
  );
}
