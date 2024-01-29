import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUser } from "../api/users/users";

export default function Register({ token }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    createUser(email, password, firstName, lastName);
    !token && navigate("/");
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
