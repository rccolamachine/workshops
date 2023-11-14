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

const fetchSinglePlayer = async (playerId) => {
  try {
    const response = await fetch(`${APIURL}/players/${playerId}`);
    const player = await response.json();
    return player.data.player;
  } catch (err) {
    console.error(`Oh no, trouble fetching player #${playerId}!`, err);
  }
};

const fetchTeams = async () => {
  try {
    const response = await fetch(`${APIURL}/teams`);
    const teams = await response.json();
    const teamsData = teams.data.teams;
    const teamsArray = [];
    for (team of teamsData) {
      const teamObj = { id: team.id, name: team.name };
      teamsArray.push(teamObj);
    }
    return teamsArray;
  } catch (err) {
    console.error("Uh oh, trouble fetching teams!", err);
  }
};

const addNewPlayer = async (playerObj) => {
  try {
    const res = await fetch(`${APIURL}/players`, {
      method: "POST",
      body: JSON.stringify(playerObj),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
    const json = await res.json();
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

const removeDogCard = (parentName, dogData) => {
  const removeButton = parentName.querySelector(".delete-single-dog");
  removeButton.addEventListener("click", async () => {
    removePlayer(dogData.id);
    parentName.remove();
  });
};

const renderDogCards = (parentName, teamData, dogData) => {
  const singleDogCard = document.createElement("div");
  singleDogCard.className = "single-dog-card";
  singleDogCard.innerHTML = `<h2 class="dog-name">${dogData.name}</h2>
    <img
    class="single-player"
    src="${dogData.imageUrl}"
    alt="${dogData.name}, ${dogData.breed}"
    />
    <div class="button-box">
    <button class="see-single-dog-details">See Details</button>
    <button class="delete-single-dog">Remove Doggo</button>
    </div>`;

  renderMoreDetails(singleDogCard, teamData, dogData);
  removeDogCard(singleDogCard, dogData);
  parentName.appendChild(singleDogCard);
};

const renderMoreDetails = (parentName, teamData, dogData) => {
  const detailsButton = parentName.querySelector(".see-single-dog-details");
  const buttonBox = parentName.querySelector(".button-box");
  detailsButton.addEventListener("click", async () => {
    const dogDetails = await fetchSinglePlayer(dogData.id);
    const breedDetails = document.createElement("div");
    breedDetails.className = "dog-breed";
    breedDetails.innerText = `Breed: ${dogDetails.breed}`;

    const teamDetails = document.createElement("div");
    teamDetails.className = "dog-team";
    const getTeamName = teamData.filter(
      (team) => team.id === dogDetails.teamId
    );
    getTeamName[0]
      ? (dogDetails.teamName = getTeamName[0].name)
      : (dogDetails.teamName = "free agent");
    teamDetails.innerText = `Team: ${dogDetails.teamName}`;

    const positionDetails = document.createElement("div");
    positionDetails.className = "dog-position";
    positionDetails.innerText = `Position: ${dogDetails.status}`;

    buttonBox.parentNode.insertBefore(breedDetails, buttonBox.previousSibling);
    buttonBox.parentNode.insertBefore(teamDetails, buttonBox.previousSibling);
    buttonBox.parentNode.insertBefore(
      positionDetails,
      buttonBox.previousSibling
    );

    detailsButton.remove();
  });
};

function renderFormInputTextField(parentName, elementId, className, labelText) {
  const newLabel = document.createElement("label");
  newLabel.className = `${className}-label`;
  newLabel.innerText = labelText;
  parentName.appendChild(newLabel);

  const newField = document.createElement("input");
  newField.id = elementId;
  newField.className = `${className}-field`;
  parentName.appendChild(newField);
}

function renderFormInputRadioButtons(
  parentName,
  elementId,
  className,
  labelText,
  groupName,
  valuesArray
) {
  const newLabel = document.createElement("p");
  newLabel.className = `${className}-label`;
  newLabel.innerText = labelText;
  parentName.appendChild(newLabel);

  for (let i = 0; i < valuesArray.length; i++) {
    const newField = document.createElement("input");
    newField.type = "radio";
    newField.id = elementId;
    newField.className = `${className}-radio`;
    newField.name = groupName;
    newField.value = valuesArray[i].id;
    if (i === 0) {
      newField.checked = true;
    }
    parentName.appendChild(newField);
    const newLabel = document.createElement("label");
    newLabel.name = groupName;
    newLabel.innerText = valuesArray[i].name;
    newLabel.className = `${className}-radio-label`;
    parentName.appendChild(newLabel);
  }
}

const renderNewDogData = () => {
  const newDogForm = document.querySelector("form");
  const submitButton = document.querySelector("#submit-new-dog");

  submitButton.addEventListener("click", (event) => {
    const dogName = document.getElementById("dog-name").value;
    const breed = document.getElementById("dog-breed").value;
    if (!breed || !dogName) {
      alert("Make sure to tell us doggo's name and breed.");
      event.preventDefault();
    }
  });

  newDogForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const dogName = document.getElementById("dog-name").value;
    const breed = document.getElementById("dog-breed").value;
    const imageUrl = document.getElementById("image-url").value;
    const teamId = document.querySelector('input[name="teams"]:checked').value;
    const status = document.querySelector(
      'input[name="statuses"]:checked'
    ).value;

    const dogToAdd = {
      ...(dogName && { name: dogName }),
      ...(breed && { breed }),
      ...(imageUrl && { imageUrl }),
      ...(teamId && { teamId }),
      ...(status && { status }),
    };
    await addNewPlayer(dogToAdd);
    location.reload();
    return dogToAdd;
  });
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
const renderAllPlayers = (playerList, teamData) => {
  try {
    const allPlayerCards = document.createElement("div");
    allPlayerCards.className = "all-player-cards";
    for (player of playerList) {
      renderDogCards(allPlayerCards, teamData, player);
    }
    playerContainer.appendChild(allPlayerCards);
  } catch (err) {
    console.error("Uh oh, trouble rendering players!", err);
  }
};

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */

const renderNewDogForm = async (teamsArray) => {
  const newSongForm = document.createElement("form");
  newSongForm.className = "new-dog-form";
  const newDogFormHeader = document.createElement("h2");
  newDogFormHeader.className = "new-form-heading";
  newDogFormHeader.innerText = "Throw a New Doggo into the Ring!";
  newSongForm.appendChild(newDogFormHeader);

  const textInputContainer = document.createElement("div");
  textInputContainer.className = "new-dog-text-inputs";
  newSongForm.appendChild(textInputContainer);
  renderFormInputTextField(
    textInputContainer,
    "dog-name",
    "form-input",
    "Doggo's Name:"
  );
  renderFormInputTextField(
    textInputContainer,
    "dog-breed",
    "form-input",
    "Doggo's Breed:"
  );
  renderFormInputTextField(
    textInputContainer,
    "image-url",
    "form-input",
    "URL of Doggo's picture:"
  );

  const buttonInputContainer = document.createElement("div");
  buttonInputContainer.className = "new-dog-button-inputs";
  newSongForm.appendChild(buttonInputContainer);

  const teamButtons = document.createElement("div");
  teamButtons.className = "button-inputs";
  buttonInputContainer.appendChild(teamButtons);
  renderFormInputRadioButtons(
    teamButtons,
    "dog-team",
    "form-input",
    "Team:",
    "teams",
    teamsArray
  );

  const freeAgentButton = document.createElement("input");
  freeAgentButton.type = "radio";
  freeAgentButton.className = "form-input-radio";
  freeAgentButton.name = "teams";
  freeAgentButton.value = null;
  teamButtons.appendChild(freeAgentButton);
  const newLabel = document.createElement("label");
  newLabel.name = "teams";
  newLabel.className = "form-input-radio-label";
  newLabel.innerText = "free agent";
  teamButtons.appendChild(newLabel);

  const positionButtons = document.createElement("div");
  positionButtons.classList = "button-inputs";
  buttonInputContainer.appendChild(positionButtons);

  renderFormInputRadioButtons(
    positionButtons,
    "dog-status",
    "form-input",
    "Position:",
    "statuses",
    [
      { id: "bench", name: "bench" },
      { id: "field", name: "field" },
    ]
  );

  const submitButton = document.createElement("button");
  submitButton.type = "submit";
  submitButton.id = "submit-new-dog";
  submitButton.innerText = "Submit";
  newSongForm.appendChild(submitButton);

  newPlayerFormContainer.appendChild(newSongForm);
  renderNewDogData();
};

const init = async () => {
  const teamsArray = await fetchTeams();
  const players = await fetchAllPlayers();
  renderNewDogForm(teamsArray);
  renderAllPlayers(players, teamsArray);
};

init();
