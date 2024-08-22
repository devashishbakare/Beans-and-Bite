import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { UpdateImages } from "./Components/UpdateImages";
import { Navbar } from "./Components/Navbar";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/uploadImages" element={<UpdateImages />} />
        <Route path="/nav" element={<Navbar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
