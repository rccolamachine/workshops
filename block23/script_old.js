const playerContainer = document.getElementById("all-players-container");
const newPlayerFormContainer = document.getElementById("new-player-form");

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = "2308-FTB-ET-WEB-PT";
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
  try {
    const response = await fetch(`${APIURL}/players`);
    const players = await response.json();
    return players.data.players;
  } catch (err) {
    console.error("Uh oh, trouble fetching players!", err);
  }
};

const fetchTeammates = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}/players/${playerId}`);
    const player = await response.json();
    return player.data.player.team !== null
      ? player.data.player.team.players
      : [];
  } catch (err) {
    console.error(
      `Oh no, trouble fetching teammates for player #${playerId}!`,
      err
    );
  }
};

const fetchAllTeams = async () => {
  try {
    const response = await fetch(`${APIURL}/teams`);
    const teams = await response.json();
    return teams.data.teams;
  } catch (err) {
    console.error("Uh oh, trouble fetching teams!", err);
  }
};

const addNewPlayer = async (player) => {
  try {
    const res = await fetch(`${APIURL}/players`, {
      method: "POST",
      body: JSON.stringify(player),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const json = await res.json();
    console.log(json);
  } catch (err) {
    console.error("Oops, something went wrong with adding that player!", err);
  }
};

const removePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}/players/${playerId}`, {
      method: "DELETE",
    });
    const player = await response.json();
    return player;
  } catch (err) {
    console.error(
      `Whoops, trouble removing player #${playerId} from the roster!`,
      err
    );
  }
};

const getTeamNameForAllPlayers = (playerList, teamList) => {
  for (let team of teamList) {
    for (let player of playerList) {
      player.teamId === team.id && (player.teamName = team.name);
    }
  }
  console.log(playerList);
  return playerList;
};

const shortPlayerDetails = (player) => {
  return `
<h3>${player.name}</h3>
<img
class="single-player"
src="${player.imageUrl}"
alt="${player.name}, ${player.breed}"
/>`;
};

const longPlayerDetails = (player) => {
  return `
<h3>${player.name}</h3>
<p class="breed">${player.breed}</p>
<p class="position">Position: ${player.status}</p>
<p class="team">Team: ${player.teamName}</p>
<img
class="single-player"
src="${player.imageUrl}"
alt="${player.name}, ${player.breed}"
/>`;
};

// const hideAllOpenPlayers = () => {
//   const openTeammates = document.querySelectorAll(".teammates-container");
//   for (teammate of openTeammates) {
//     teammate.parentElement.removeChild(teammate);
//   }
//   const openPlayers = document.querySelectorAll(".detailed-single-player");
//   for (openPlayer of openPlayers) {
//     console.log(openPlayer);
//     const child = openPlayer.querySelector(".single-player-details");
//     child.removeChild(child.querySelector(".breed"));
//     child.removeChild(child.querySelector(".position"));
//     child.removeChild(child.querySelector(".team"));
//     console.log(openPlayer);
//     openPlayer.className = "single-player-container";
//     openPlayer.removeChild(openPlayer.querySelector(".hide-details-button"));

//     renderDetailsButton(openPlayer, openPlayer);

//     // openPlayer.appendChild(detailsButton);
//     activateDetailsButton(detailsButton, openPlayer);
//   }
// };

const renderDetailsButton = (player, playerCard) => {
  const detailsButton = document.createElement("button");
  detailsButton.className = "details-button";
  detailsButton.innerText = "See Details";
  playerCard.appendChild(detailsButton);
  return detailsButton, playerCard;
};

const changePlayerCardClass = (playerCard) => {
  playerCard.className = "detailed-single-player";
  return playerCard;
};

const activateDetailsButton = (detailsButton, playerCard, player) => {
  detailsButton.addEventListener("click", async function () {
    const getDetailsButton = playerCard.querySelector(".details-button");
    console.log(getDetailsButton);
    playerCard.removeChild(getDetailsButton);
    // hideAllOpenPlayers();

    await getTeammates(player, playerCard);
    const singlePlayerDetails = playerCard.querySelector(
      ".single-player-details"
    );
    singlePlayerDetails.innerHTML = longPlayerDetails(player);
    changePlayerCardClass(playerCard);

    const hideDetailsButton = document.createElement("button");
    hideDetailsButton.className = "hide-details-button";
    hideDetailsButton.innerText = "Hide Details";
    playerCard.appendChild(hideDetailsButton);
    console.log(detailsButton);

    hideDetailsButton.addEventListener("click", function () {
      const newPlayerCard = document.createElement("div");
      newPlayerCard.className = "single-player-container";
      console.log(newPlayerCard, 11);

      newPlayerCard.removeChild(
        newPlayerCard.querySelector(".hide-details-button")
      );
      const teamMatesContainer = newPlayerCard.querySelector(
        ".teammates-container"
      );
      teamMatesContainer &&
        newPlayerCard.removeChild(
          newPlayerCard.querySelector(".teammates-container")
        );
      playerCard.parentElement.appendChild(newPlayerCard);
      playerCard.parentElement.removeChild(playerCard);
      singlePlayerDetails.innerHTML = shortPlayerDetails(player);
      renderDetailsButton(player, newPlayerCard);
      // playerCard.appendChild(detailsButton);
    });
  });
  return playerCard;
};

// const swapDetailsButton = (player, playerCard) => {
//   let detailsButton = document.createElement("button");
//   detailsButton.className = "details-button";
//   detailsButton.innerText = "See Details";
//   playerCard.appendChild(detailsButton);
//   detailsButton.addEventListener("click", function () {
//     const singlePlayerDetails = playerCard.querySelector(
//       ".single-player-details"
//     );
//     singlePlayerDetails.innerHTML = shortPlayerDetails(player);

//     playerCard.removeChild(detailsButton);

//     const hideDetailsButton = document.createElement("button");
//     hideDetailsButton.className = "hide-details-button";
//     hideDetailsButton.innerText = "Hide Details";
//     playerCard.appendChild(hideDetailsButton);

//     hideDetailsButton.addEventListener("click", function () {
//       playerCard.className = "single-player-container";
//       playerCard.removeChild(hideDetailsButton);
//       const teamMatesContainer = playerCard.querySelector(
//         ".teammates-container"
//       );
//       teamMatesContainer &&
//         playerCard.removeChild(
//           playerCard.querySelector(".teammates-container")
//         );
//       singlePlayerDetails.innerHTML = shortPlayerDetails(player);
//       detailsButton = document.createElement("button");
//       detailsButton.className = "details-button";
//       detailsButton.innerText = "See Details";
//       playerCard.appendChild(detailsButton);
//     });
//   });
//   return playerCard;
// };

const getTeammates = async (player, playerCard) => {
  const wholeTeam = await fetchTeammates(player.id);
  const teammates = wholeTeam.filter((teammate) => teammate.id !== player.id);
  player.teamName == undefined && (player.teamName = "Free agent");
  if (teammates.length > 0) {
    const teamMatesDiv = document.createElement("div");
    teamMatesDiv.className = "teammates-container";
    const teamMatesTitle = document.createElement("p");
    teamMatesTitle.className = "teammates-title";
    teamMatesTitle.innerText = "Teammates:";
    teamMatesDiv.appendChild(teamMatesTitle);
    for (teammate of teammates) {
      const singleTeamMateDiv = document.createElement("div");
      singleTeamMateDiv.className = "single-teammate-container";
      singleTeamMateDiv.innerHTML = `
    <p class="single-teammate-name">${teammate.name}</p>
    <img
      class="single-player"
      src="${teammate.imageUrl}"
      alt="${teammate.name}, ${teammate.breed}"
    />`;
      teamMatesDiv.appendChild(singleTeamMateDiv);
    }
    playerCard.appendChild(teamMatesDiv);
  }
  return playerCard;
};

const renderSinglePlayerCards = (playerList) => {
  playerContainer.innerHTML = "";
  for (let player of playerList) {
    const playerCard = document.createElement("div");
    playerCard.className = "single-player-container";
    const singlePlayerDetails = document.createElement("div");
    singlePlayerDetails.className = "single-player-details";

    singlePlayerDetails.innerHTML = shortPlayerDetails(player);
    playerCard.appendChild(singlePlayerDetails);
    const detailsButton = renderDetailsButton(player, playerCard);
    activateDetailsButton(detailsButton, playerCard, player);
    playerContainer.appendChild(playerCard);
  }
};
/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players.
 *
 * Then it takes that larger string of HTML and adds it to the DOM.
 *
 * It also adds event listeners to the buttons in each player card.
 *
 * The event listeners are for the "See details" and "Remove from roster" buttons.
 *
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player.
 *
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster.
 *
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = (playerList) => {
  try {
    //NOTES: USE THIS!

    const detailsButton = playerContainerHTML.querySelector(".details-button");
    detailsButton.addEventListener("click", async () => {
      const player = await fetchSinglePlayer;
    });

    //
  } catch (err) {
    console.error("Uh oh, trouble rendering players!", err);
  }
};

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
  try {
  } catch (err) {
    console.error("Uh oh, trouble rendering the new player form!", err);
  }
};

const init = async () => {
  const players = await fetchAllPlayers();
  // const player = await fetchTeammates();
  const teams = await fetchAllTeams();
  getTeamNameForAllPlayers(players, teams);
  renderSinglePlayerCards(players);
  renderAllPlayers(players);

  renderNewPlayerForm();
};

init();
