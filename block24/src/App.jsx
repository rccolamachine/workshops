import "./App.css";
import { puppyList } from "./data.js";
import { useState } from "react";

function App() {
  const [puppies, setPuppies] = useState(puppyList);
  console.log(puppies);
  const [featPupId, setFeatPupId] = useState(null);
  const featuredPup = puppies.find((pup) => pup.id === featPupId);
  console.log(featuredPup);
  return (
    <>
      <div>
        {puppies.map((puppy) => {
          return (
            <p
              onClick={() => {
                setFeatPupId(puppy.id);
              }}
              key={puppy.id}
            >
              {puppy.name}
            </p>
          );
        })}{" "}
      </div>
      {featPupId && (
        <>
          <div class="featured-pup">
            <h3>Look! It's</h3>
            <h2>{featuredPup.name}!</h2>
            <ul>
              <li>Age: {featuredPup.age}</li>
              <li>Email: {featuredPup.email}</li>
              <li>
                {featuredPup.isCute
                  ? "Look at this cutie!"
                  : "This dog is NOT cute."}
              </li>
            </ul>
          </div>

          <div class="copyright">
            &copy;2023 rccolamachine. All rights reserved.
          </div>
        </>
      )}
    </>
  );
}

export default App;
