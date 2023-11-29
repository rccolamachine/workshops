import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setToken, setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [firstName, setFirstName] = useState("");
  //   const [lastName, setLastName] = useState("");
  //   const goToLogin = useNavigate();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

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
        setIsLoggedIn(true);
        navigate("./account");
        alert(`${result.message} You are logged in`);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="sign-up">
      <h2>Sign In!</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Email*:{" "}
          <input
            value={email}
            required
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </label>
        <label>
          Password*:{" "}
          <input
            type="password"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>

        <button>Log in</button>
      </form>
      <button onClick={() => navigate("./register")}>Register</button>
    </div>
  );
}
