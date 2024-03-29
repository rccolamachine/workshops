import { getAllBooks } from "../api/books/books";
import React, { useEffect, useState } from "react";
import BookCard from "./BookCard/BookCard";

export default function Books({ setBooks, books, token }) {
  const [allBooksList, setAllBooks] = useState([]);
  const [mySavedList, setAllSavedBooks] = useState([]);

  useEffect(() => {
    async function allBooks() {
      try {
        const booksList = await getAllBooks();
        setAllBooks(booksList);
        setAllSavedBooks(booksList);
      } catch (err) {
        console.log(err);
      }
    }
    allBooks();
  }, []);

  function handleSearch(e) {
    const searchResults = mySavedList.filter((book) =>
      book.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setAllBooks(searchResults);
  }

  return (
    <>
      <>
        <h1>All the Books!</h1>
        <div className="search">
          <div>Search All Books by Title:</div>
          <input type="text" onChange={handleSearch} />
        </div>
      </>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {allBooksList.map((book) => (
          <BookCard key={book.id} book={book} token={token} />
        ))}
      </div>
    </>
  );
}
