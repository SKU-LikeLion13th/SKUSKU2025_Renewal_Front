import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";

import User from "./routes/User";
import Admin from "./routes/Admin";
import "./css/App.css";
import Header from "./components/Header";
import HeaderMobile from "./components/HeaderMobile";
import Footer from "./components/Footer";
import CyberCampus from "./routes/CyberCampus";
import CCHeader from "./components/CCHeader";

function AppContent() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1000);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const path = location.pathname.toLowerCase();
  const isCyberCampusOrAdmin =
    path.startsWith("/cybercampus") || path.startsWith("/admin");

  return (
    <div className="App">
      {isCyberCampusOrAdmin ? (
        isMobile ? (
          <HeaderMobile />
        ) : (
          <CCHeader />
        )
      ) : isMobile ? (
        <HeaderMobile />
      ) : (
        <Header />
      )}

      <Routes>
        <Route path="/CyberCampus/*" element={<CyberCampus />} />
        <Route path="/Admin/*" element={<Admin />} />
        <Route path="/*" element={<User />} />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
