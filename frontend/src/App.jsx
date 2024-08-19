import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home";
// import { UpdateImages } from "./Components/UpdateImages";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/uploadImages" element={<UpdateImages />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
