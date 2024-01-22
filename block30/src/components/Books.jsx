import { getAllBooks } from "../api/books/books";
import React, { useEffect, useState } from "react";
import BookCard from "./BookCard/BookCard";

export default function Books({ setBooks, books, token }) {
  const [allBooksList, setAllBooks] = useState([]);
  const [mySavedList, setAllSavedBooks] = useState([]);
  const [searchText, setSearchText] = useState("");

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
    const searchResults = allBooksList.filter((book) =>
      book.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setAllBooks(searchResults);
  }
  function clearSearch() {
    setAllBooks(mySavedList);
    setSearchText("");
  }

  return (
    <>
      <h1>All the Books!</h1>
      <h2 style={{ textAlign: "center" }}>Search All Books By Title</h2>
      <input
        style={{ width: "35%", margin: "0 auto" }}
        type="text"
        onChange={handleSearch}
        placeholder={searchText}
      />
      <div style={{ display: "flex", flexDirection: "column" }}></div>
      <button onClick={clearSearch}>Clear Search</button>

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
