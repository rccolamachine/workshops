import React from "react";
import { useEffect, useState } from "react";
import BookCard from "./BookCard/BookCard";

import { getUserReservations } from "../api/reservations/reservations";

export default function Account({ token, setToken }) {
  const [myBooksList, setMyBooks] = useState([]);
  const [mySavedList, setMySavedBooks] = useState([]);
  const [searchText, setSearchText] = useState("");

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
    const searchResults = myBooksList.filter((book) =>
      book.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setMyBooks(searchResults);
  }
  function clearSearch() {
    console.log(mySavedList);
    setMyBooks(mySavedList);
    setSearchText("");
  }
  console.log(myBooksList);
  return (
    <>
      {myBooksList.length !== 0 && (
        <>
          <h1>All your Books!</h1>
          <h2 style={{ textAlign: "center" }}>Search My Books by Title</h2>
          <input
            style={{ width: "35%", margin: "0 auto" }}
            type="text"
            onChange={handleSearch}
            placeholder={searchText}
          />
          <button onClick={clearSearch}>Clear Search</button>
        </>
      )}
      {myBooksList.length === 0 && (
        <h2>Thank you! All your books have been returned.</h2>
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
