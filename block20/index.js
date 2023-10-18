const users = [
  { name: "John", age: 25, occupation: "gardener" },
  { name: "Lenny", age: 51, occupation: "programmer" },
  { name: "Andrew", age: 43, occupation: "teacher" },
  { name: "Peter", age: 81, occupation: "teacher" },
  { name: "Anna", age: 43, occupation: "teacher" },
  { name: "Albert", age: 76, occupation: "programmer" },
  { name: "Adam", age: 47, occupation: "teacher" },
  { name: "Robert", age: 72, occupation: "driver" },
];

function main() {
  const rootElement = document.querySelector("#root");
  const mainHeading = document.createElement("h1");
  mainHeading.innerText = "FREELANCERS";
  mainHeading.style.color = "red";
  mainHeading.style.fontSize = "20px";
  rootElement.appendChild(mainHeading);
  const namesList = document.createElement("ul");
  for (let i = 0; i < users.length; i++) {
    const userName = document.createElement("li");
    userName.innerText = `${users[i].name}: A ${users[i].age}-year-old ${users[i].occupation}`;
    namesList.appendChild(userName);
    userName.classList.add("big-blue-bullets");
  }
  rootElement.appendChild(namesList);
}

//call the main function
main();
