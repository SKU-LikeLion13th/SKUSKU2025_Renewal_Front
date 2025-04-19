import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import User from "./routes/User";
import "./css/App.css";
import Header from "./components/Header";
import HeaderMobile from "./components/HeaderMobile";
import Footer from "./components/Footer";
import CyberCampus from "./routes/CyberCampus";

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
    <Router>
      <div className="App">
        {isMobile ? <HeaderMobile /> : <Header />}
        <Routes>
          <Route path="/*" element={<User />} />
          <Route path="/CyberCampus/*" element={<CyberCampus />} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
