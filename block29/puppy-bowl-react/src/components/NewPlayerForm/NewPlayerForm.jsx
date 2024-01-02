import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPlayer } from "../../api/index.js";
import "./NewPlayerForm.css";

export default function NewPlayerForm() {
  const navigate = useNavigate();
  const [puppyName, setPuppyName] = useState("");
  const [breed, setBreed] = useState("");
  const [playerStatus, setPlayerStatus] = useState("bench");
  const [imageUrl, setImageUrl] = useState(
    "https://learndotresources.s3.amazonaws.com/workshop/60ad725bbe74cd0004a6cba0/puppybowl-default-dog.png"
  );

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const player = await createPlayer({
        name: puppyName,
        breed,
        status: playerStatus,
        imageUrl,
      });
      if (player.success) {
        alert("Puppy successfully added!");
        navigate("/");
      } else {
        alert(
          `Something went wrong! Please try again. Specific error: ${player.error.message}`
        );
      }
    } catch (err) {
      alert(`Something went wrong! Please try again. Specific error: ${err}`);
    }
  }

  return (
    <div
      style={{
        width: "50%",
        margin: "0 auto",
      }}
    >
      <h1>Add a New Player!</h1>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <label>
          Name:
          <input
            type="text"
            required
            onChange={(e) => setPuppyName(e.target.value)}
          />
        </label>
        <label>
          Breed:
          <input
            type="text"
            required
            onChange={(e) => setBreed(e.target.value)}
          />
        </label>
        <label>
          Image URL:
          <input type="text" onChange={(e) => setImageUrl(e.target.value)} />
        </label>
        <label>
          Status:
          <select onChange={(e) => setPlayerStatus(e.target.value)}>
            <option defaultValue value="bench">
              Bench
            </option>
            <option value="field">Field</option>
          </select>
        </label>
        <button style={{ width: "25%", margin: "0 auto" }}>Add Puppy!</button>
      </form>
    </div>
  );
}
