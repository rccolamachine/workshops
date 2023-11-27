import { Routes, Route } from "react-router-dom";
import Home from "./Home";
import Red from "./Red";
import Orange from "./Orange";
import Yellow from "./Yellow";
import Green from "./Green";
import Blue from "./Blue";

export default function MainSection() {
  return (
    <div id="main-section">
      <Routes>
        <Route path="/red" element={<Red />} />
        <Route path="/orange" element={<Orange />} />
        <Route path="/yellow" element={<Yellow />} />
        <Route path="/green" element={<Green />} />
        <Route path="/blue" element={<Blue />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}
