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
      alert(`${result.message}!`);
    }
  } catch (error) {
    console.log(error);
  }
}

async function getUser(token) {
  console.log(token);
  try {
    const response = await fetch(
      "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/me",
      {
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

export { loginUser, createUser, getUser };
