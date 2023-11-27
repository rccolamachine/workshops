import { useState } from "react";

export default function Autheticate({ token }) {
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState("");
  const [tokenDate, setTokenDate] = useState("");

  const handleClick = async () => {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },

          //   body: JSON.stringify({ username, password }),
        }
      );
      const result = await response.json();
      //   console.log(result);
      setSuccessMessage(result.success && result.message);
      const formattedDate = `${new Date(result.data.iat * 1000)}`;
      //   console.log(formattedDate);
      setCurrentUser(result.data.username);
      setTokenDate(formattedDate);
      //   console.log("token=", token);
      //   return response.json();
      setError(false);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="authentication">
      <h2>Authenticate</h2>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p>{successMessage}</p>}
      {currentUser && <p>Thanks for stopping by, {currentUser}!</p>}
      {tokenDate && <p>The last time you logged in was {tokenDate}.</p>}

      <button onClick={handleClick}>Authenticate Token!</button>
    </div>
  );
}
