import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App.jsx";
import AuthProvider from "./utils/AuthContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
