import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getPlayerById } from "../API";
import PlayerCard from "./PlayerCard/PlayerCard";
import { deletePlayer } from "../API";

export default function SinglePlayer() {
  const [puppy, setPuppy] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getPlayerData() {
      try {
        const puppyObj = await getPlayerById(id);
        if (puppyObj.data === null) {
          navigate("/");
        } else {
          setPuppy(puppyObj.data.player);
        }
        return;
      } catch (err) {
        throw err;
      }
    }
    getPlayerData();
  }, [navigate]);

  async function handleDelete() {
    try {
      const result = await deletePlayer(id);
      if (result.success) {
        alert(`Puppy with id: ${id} successfully removed from roster.`);
        navigate("./");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <PlayerCard player={puppy} component={"detail"} />
      <button onClick={handleDelete}>Remove Player from Roster</button>
    </div>
  );
}
