import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home";
import { UpdateImages } from "./Components/UpdateImages";
import { ResetPassword } from "./Components/ResetPassword";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/uploadImages" element={<UpdateImages />} />
        <Route
          path="/resetPassword/:resetPasswordToken"
          element={<ResetPassword />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
