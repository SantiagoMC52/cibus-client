import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserProvider from "./contexts/userContext";
import { SnackbarProvider } from "notistack";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <SnackbarProvider
      anchorOrigin={{
        horizontal: "right",
        vertical: "top",
      }}
      autoHideDuration={3000}
    >
      <UserProvider>
        <App />
      </UserProvider>
    </SnackbarProvider>
  </React.StrictMode>
);
