import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Blue from "./components/Blue";
import Red from "./components/Red";

function App() {
  return (
    <div id="container">
      <div id="navbar">
        <Link to="/blue">blue</Link>
        <Link to="/red">red</Link>
      </div>
      <div id="main-section">
        <Routes>
          <Route path="/blue" element={Blue} />
          <Route path="/red" element={Red} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
