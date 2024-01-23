async function loginUser(email, password, setToken) {
  try {
    const response = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/login",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );
    const result = await response.json();
    if (result.name) {
      alert(result.message);
    } else {
      setToken(result.token);
      localStorage.setItem("token", result.token);
      alert(`${result.message} You are logged in`);
    }
  } catch (error) {
    alert(error);
  }
}

async function createUser(email, password, firstName, lastName) {
  try {
    const response = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register",
      {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          firstname: firstName,
          lastname: lastName,
        }),
      }
    );
    const result = await response.json();
    if (result.name) {
      alert(result.message);
    } else {
      alert(`${result.message} Please log in again`);
    }
  } catch (error) {
    console.log(error);
  }
}

async function setAndGetTokenFromLocalStorage(token, setToken) {
  token && localStorage.setItem("token", token);
  localStorage.getItem(token);
  setToken(token);
  return token;
}

export { loginUser, createUser, setAndGetTokenFromLocalStorage };
