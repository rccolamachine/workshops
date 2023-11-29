import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register({}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const goToLogin = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
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
        // goToLogin("/login", { replace: true });
        alert(`${result.message}. Please log in again`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="sign-up">
      <h2>Sign Up!</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:{" "}
          <input
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </label>
        <label>
          Last Name:{" "}
          <input
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </label>

        <label>
          Email*:{" "}
          <input
            value={email}
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
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>

        <button>Create New User</button>
      </form>
    </div>
  );
}
