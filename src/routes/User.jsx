import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../pages/User/Main/Main";
import Project from "../pages/User/Project/Project";
import TeamPage from "../pages/User/Team/TeamPage";
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeaderMobile from "../components/HeaderMobile";

const User = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 1270);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <div>
      {isMobile ? <HeaderMobile /> : <Header />}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/project" element={<Project />} />
        <Route path="/team" element={<TeamPage />} />
      </Routes>

      {!isMobile && <Footer />}
    </div>
  );
};

export default User;
