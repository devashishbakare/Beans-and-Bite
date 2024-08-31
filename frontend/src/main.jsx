import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { ContentSelectionProvider } from "./Components/ContentContext.jsx";
import store from "./redux/store.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);

// createRoot(document.getElementById("root")).render(
//   <StrictMode>
//     <ContentSelectionProvider>
//       <App />
//     </ContentSelectionProvider>
//   </StrictMode>
// );
