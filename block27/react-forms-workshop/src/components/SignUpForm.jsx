import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [validPassword, setValidPassword] = useState(false);
  const [validUsername, setValidUsername] = useState(false);
  const [invalidMessage, setInvalidMessage] = useState(
    "please provide a username and password"
  );
  const [isCreated, setIsCreated] = useState(false);

  const validateUserName = async (username) => {
    await setValidUsername(true);
    setIsCreated(false);
    setInvalidMessage(false);
    if (username.length < 1) {
      await setValidUserName(false);
      setInvalidMessage("please provide a username and password");
    }
  };

  const validatePassword = async (password) => {
    await setValidPassword(false);
    setInvalidMessage(false);
    if (password.length <= 8) {
      setInvalidMessage("password must contain at least eight characters");
      await setValidPassword(false);
    } else if (!/\d/.test(password)) {
      setInvalidMessage("password must contain a number");
      await setValidPassword(false);
    } else if (!/[A-Z]/.test(password)) {
      setInvalidMessage("password must contain a capital letter");
      await setIsValid(false);
    } else if (!/[a-z]/.test(password)) {
      setInvalidMessage("password must contain a lowercase letter");
      await setValidPassword(false);
    } else if (!/[-+_!@#$%^&*., ?]/.test(password)) {
      setInvalidMessage(
        "password must contain a special character: -+_!@#$%^&*., ?"
      );
      await setValidPassword(false);
    } else {
      await setValidPassword(true);
      setInvalidMessage(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log(isValid);

    // if (isValid) {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );
      const result = await response.json();
      setToken(result.token);
      setIsCreated(true);
    } catch (error) {
      setError(error.message);
    }
    // }
  };

  return (
    <div className="sign-up">
      <h2>Sign Up!</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              validateUserName(e.target.value);
              setIsCreated(false);
            }}
          />
        </label>
        <label>
          Password:{" "}
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validatePassword(e.target.value);
            }}
          />
        </label>
        {isCreated && <p>Welcome to the team, {username}!</p>}
        {invalidMessage && <p className="error-message">{invalidMessage}</p>}
        {validUsername && validPassword && !isCreated && (
          <button>Create New User</button>
        )}
        {/* {!isValid && <button disabled>Submit</button>} */}
      </form>
    </div>
  );
}
