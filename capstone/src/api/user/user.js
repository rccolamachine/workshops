async function getAllUsers() {
  try {
    const response = await fetch("https://fakestoreapi.com/users", {
      headers: { "Content-type": "application/json" },
    });
    const result = await response.json();
    return result;
  } catch (error) {
    alert(error);
  }
}

export { getAllUsers };
