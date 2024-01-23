import React from "react";
import { useNavigate } from "react-router-dom";
import { updateBookAvailability } from "../../api/books/books";
import { returnBook } from "../../api/reservations/reservations";
import "./BookCard.css";

export default function BookCard({ book, component, token, ownership }) {
  const { author, available, coverimage, description, title, id } = book;
  const navigate = useNavigate();

  async function handleBorrow() {
    try {
      const bookToBorrow = await updateBookAvailability(
        token,
        book.id,
        "false"
      );
      console.log(bookToBorrow);
      if (bookToBorrow.book) {
        alert("Book successfully borrowed!");
        window.parent.location = window.parent.location.href;
      }
    } catch (err) {
      alert(`Something went wrong! Please try again. Specific error: ${err}`);
    }
  }

  async function handleReturn() {
    console.log(book);
    try {
      const bookToReturn = await returnBook(token, book.id);
      console.log(bookToReturn.deletedReservation);
      if (bookToReturn.deletedReservation) {
        alert("Book successfully returned!");
        window.parent.location = window.parent.location.href;
      }
    } catch (err) {
      alert(`Something went wrong! Please try again. Specific error: ${err}`);
    }
  }

  return (
    <div className="book-card-container">
      <h2>{title}</h2>
      {author && <h3>{author}</h3>}
      {component == "detail" && (
        <>
          <img
            src={coverimage}
            alt={`A cover image for the book titled ${title}`}
          />
          <div>{description}</div>
        </>
      )}

      {available && <button onClick={handleBorrow}>Borrow Me!</button>}
      {!available && ownership !== "mine" && <div>Unavailable to borrow</div>}

      {component !== "detail" && (
        <button onClick={() => navigate(`/books/${id}`)}>See Details</button>
      )}
      {component == "detail" && (
        <button onClick={() => navigate(`/`)}>Back To All Books</button>
      )}
      {ownership == "mine" && (
        <button onClick={handleReturn}>Return Book</button>
      )}
    </div>
  );
}
