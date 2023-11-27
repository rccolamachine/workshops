import "./App.css";
import { useState } from "react";
import Autheticate from "./components/Authenticate";
import SignUpForm from "./components/SignUpForm";

function App() {
  const [token, setToken] = useState(null);
  return (
    <>
      <h1>User Administration</h1>
      <SignUpForm setToken={setToken} />
      <Autheticate token={token} />
    </>
  );
}

export default App;
