import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ContentSelectionProvider } from "./Components/ContentContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContentSelectionProvider>
      <App />
    </ContentSelectionProvider>
  </StrictMode>
);
