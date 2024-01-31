import { useState } from "react";
import { loginUser } from "../api/login/login";
import { getAllUsers } from "../api/user/user";

export default function Login({ setUserId, userId }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    loginUser(username, password);
    const allUsers = await getAllUsers();
    const myUser = allUsers.filter((user) => user.username === username);
    await setUserId(myUser[0].id);
    localStorage.setItem("userId", myUser[0].id);
  };

  return (
    <div className="sign-in">
      <h2>Sign In!</h2>
      <form onSubmit={handleSubmit}>
        <label className="sign-in-label">
          Username*:{" "}
          <input
            value={username}
            required
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="sign-in-input"
          />
        </label>
        <label className="sign-in-label">
          Password*:{" "}
          <input
            type="password"
            value={password}
            required
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="sign-in-input"
          />
        </label>

        <button>Log in</button>
      </form>
    </div>
  );
}
