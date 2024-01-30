import React, { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { updateBookAvailability } from "../../api/books/books";
import { returnBook } from "../../api/reservations/reservations";
import "./BookCard.css";

export default function BookCard({ book, component, token, ownership }) {
  const { author, available, coverimage, description, title, id } = book;
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState("general");
  const [whose, setOwnership] = useState("anonymous");

  async function handleBorrow() {
    try {
      const bookToBorrow = await updateBookAvailability(
        token,
        book.id,
        "false"
      );
      if (bookToBorrow.book) {
        alert("Book successfully borrowed!");
        window.parent.location = window.parent.location.href;
      }
    } catch (err) {
      alert(`Something went wrong! Please try again. Specific error: ${err}`);
    }
  }

  async function handleReturn() {
    try {
      const bookToReturn = await returnBook(token, book.id);
      if (bookToReturn.deletedReservation) {
        alert("Book successfully returned!");
        window.parent.location = window.parent.location.href;
      }
    } catch (err) {
      alert(`Something went wrong! Please try again. Specific error: ${err}`);
    }
  }

  useEffect(() => {
    component && setCurrentView(component);
    ownership && setOwnership(ownership);
  }, []);
  const containerClasses = `book-card-container ${currentView} ${ownership}`;

  return (
    <div className={containerClasses}>
      {!available && token && (
        <div className="borrow">Unavailable to borrow</div>
      )}
      {available && token && (
        <button onClick={handleBorrow} className="borrow">
          Borrow Me!
        </button>
      )}
      {!token && <div className="borrow">Login to borrow</div>}

      <div className="book-title">{title}</div>
      {author && <div className="book-author">{author}</div>}
      {component == "detail" && (
        <>
          <img
            src={coverimage}
            alt={`A cover image for the book titled ${title}`}
          />
          <div className="description">{description}</div>
        </>
      )}
      {component !== "detail" && (
        <button onClick={() => navigate(`/books/${id}`)}>See Details</button>
      )}
      {component == "detail" && ownership !== "mine" && (
        <button onClick={() => navigate(`/`)}>Back To All Books</button>
      )}
      {ownership == "mine" && (
        <button onClick={handleReturn}>Return Book</button>
      )}
    </div>
  );
}
