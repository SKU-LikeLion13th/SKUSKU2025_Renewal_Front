import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Main from "../pages/User/Main/Main";
import Project from "../pages/User/Project/Project";
import TeamPage from "../pages/User/Team/TeamPage";
import Footer from "../components/Footer";

const User = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <div>
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
