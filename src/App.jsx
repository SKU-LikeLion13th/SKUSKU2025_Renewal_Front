import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import User from "./routes/User";
import Admin from "./routes/Admin";
import "./css/App.css";
import Header from "./components/Header";
import HeaderMobile from "./components/HeaderMobile";
import Footer from "./components/Footer";
import CyberCampus from "./routes/CyberCampus";
// import AuthProvider from "./utils/AuthContext";

function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };

    window.addEventListener("resize", handleResize);

    // 초기 체크 + cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    // <AuthProvider>
    <Router>
      <div className="App">
        {isMobile ? <HeaderMobile /> : <Header />}
        <Routes>
          <Route path="/*" element={<User />} />
          <Route path="/CyberCampus/*" element={<CyberCampus />} />
          <Route path="/Admin/*" element={<Admin />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
    // </AuthProvider>
  );
}

export default App;
