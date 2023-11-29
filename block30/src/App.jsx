import { useState } from "react";
import bookLogo from "./assets/books.png";
import Books from "./components/Books";
import Navigations from "./components/Navigations";
import Login from "./components/Login";
import Account from "./components/Account";
import Register from "./components/Register";
import { Routes, Route } from "react-router-dom";

function App({}) {
  const [token, setToken] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  // console.log(token, isLoggedIn);

  return (
    <>
      {!isLoggedIn && (
        <Login setToken={setToken} setIsLoggedIn={setIsLoggedIn} />
      )}
      {token && <Account token={token} />}
      <Navigations />
      <Books />
      <h1>
        <img id="logo-image" src={bookLogo} />
        Library App
      </h1>
      <p>
        Complete the React components needed to allow users to browse a library
        catalog, check out books, review their account, and return books that
        they've finished reading.
      </p>
      <p>
        You may need to use the `token` in this top-level component in other
        components that need to know if a user has logged in or not.
      </p>
      <p>
        Don't forget to set up React Router to navigate between the different
        views of your single page application!
      </p>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/account" element={<Account />} /> */}
      </Routes>
    </>
  );
}

export default App;
