async function getUserReservations(token) {
  try {
    const response = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations",
      {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await response.json();
    return result.reservation;
  } catch (error) {
    alert(error);
  }
}

async function returnBook(token, id) {
  try {
    const response = await fetch(
      `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    alert(error);
  }
}

export { getUserReservations, returnBook };
