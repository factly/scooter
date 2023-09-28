import { StrictMode } from "react";
import * as ReactDOM from "react-dom/client";
import App from "./app/app";

import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
