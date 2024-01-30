async function loginUser(username, password) {
  try {
    const response = await fetch("https://fakestoreapi.com/auth/login", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    const result = await response.json();
    if (result.name) {
      alert(result.message);
    } else {
      alert(`${result.message} You are logged in`);
    }
  } catch (error) {
    alert(error);
  }
}

export { loginUser };
