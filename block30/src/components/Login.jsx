import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/users/users";
import { setAndGetTokenFromLocalStorage } from "../api/users/users";

export default function Login({ setToken, token }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    loginUser(email, password, setToken);
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
