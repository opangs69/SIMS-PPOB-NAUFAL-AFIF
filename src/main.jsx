import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { StrictMode } from "react";
import "./index.css";
import App from "./App.jsx";
import TanstackProvider from "./providers/tanstackProvider.jsx";
import AuthProvider from "./providers/authProvider.jsx";
import ReduxProvider from "./providers/reduxProvider.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ToastContainer />
      <TanstackProvider>
        <ReduxProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </ReduxProvider>
      </TanstackProvider>
    </BrowserRouter>
  </StrictMode>
);
