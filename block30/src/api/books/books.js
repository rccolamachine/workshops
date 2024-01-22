async function getAllBooks() {
  try {
    const response = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books",
      {
        headers: { "Content-type": "application/json" },
      }
    );
    const result = await response.json();
    return result.books;
  } catch (error) {
    alert(error);
  }
}

async function getBookById(id) {
  try {
    const res = await fetch(
      `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`
    );
    const json = await res.json();
    return json.book;
  } catch (err) {
    throw err;
  }
}

async function updateBookAvailability(token, id, available) {
  try {
    const res = await fetch(
      `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ available }),
      }
    );
    const json = await res.json();
    console.log(json);
    return json;
  } catch (err) {
    console.log(err);
  }
}

export { getAllBooks, getBookById, updateBookAvailability };
