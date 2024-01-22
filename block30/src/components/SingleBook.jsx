import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookById } from "../api/books/books";

import BookCard from "./BookCard/BookCard";
// import { deletePlayer } from "../API";

export default function SingleBook({ token }) {
  const [singleBook, setSingleBook] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getBookData() {
      try {
        const bookObj = await getBookById(id);
        console.log(bookObj);
        if (bookObj.data === null) {
          navigate("/");
        } else {
          setSingleBook(bookObj);
        }
        return;
      } catch (err) {
        throw err;
      }
    }
    getBookData();
  }, [navigate]);

  async function handleDelete() {
    try {
      const result = await deletePlayer(id);
      if (result.success) {
        alert(`Puppy with id: ${id} successfully removed from roster.`);
        navigate("./");
      }
    } catch (err) {
      console.log(err);
    }
  }
  console.log(singleBook);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BookCard book={singleBook} component={"detail"} token={token} />
    </div>
  );
}
