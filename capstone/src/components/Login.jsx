import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/login/login";
import { getAllUsers } from "../api/user/user";

export default function Login({ setUserId, userId }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    loginUser(username, password);
    const allUsers = await getAllUsers();
    console.log(allUsers);
    for (let user of allUsers) {
      console.log(user.id);
    }
    const myUser = allUsers.filter((user) => user.username === username);
    await setUserId(myUser[0].id);
    localStorage.setItem("userId", myUser[0].id);
  };

  return (
    <div className="sign-in">
      <h2>Sign In!</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Username*:{" "}
          <input
            value={username}
            required
            onChange={(e) => {
              setUsername(e.target.value);
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
      {/* <button onClick={() => navigate("./register")}>Register</button> */}
    </div>
  );
}
