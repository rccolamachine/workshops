import { BrowserRouter, Route, Routes } from "react-router-dom";
// import Books from "./components/Books";
import Navigations from "./components/Navigations";
import Login from "./components/Login";
import User from "./components/User";
import Logout from "./components/Logout";
import Register from "./components/Register";
import Books from "./components/Books";
import SingleBook from "./components/SingleBook";
import Account from "./components/Account";
import { useState, useEffect } from "react";
import bookLogo from "./assets/books.png";

function App() {
  const [token, setToken] = useState(null);
  const [books, setBooks] = useState(undefined);

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      setToken(localToken);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navigations token={token} setToken={setToken} />
        {!token && <Login setToken={setToken} token={token} />}
        {token && <User token={token} />}
        <Routes>
          <Route
            path="/*"
            element={<Books setBooks={setBooks} token={token} />}
          />
          {/* <Route path="/login" element={<Login token={token} />} /> */}
          <Route
            path="/logout"
            element={<Logout token={token} setToken={setToken} />}
          />
          <Route path="/books/:id" element={<SingleBook token={token} />} />
          <Route path="/register" element={<Register token={token} />} />
          <Route
            path="/account"
            element={<Account token={token} setToken={setToken} />}
          />
        </Routes>
        <Navigations token={token} setToken={setToken} />
      </BrowserRouter>
    </>
  );
}

export default App;
