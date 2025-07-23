import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Review from "../pages/User/Review/Review";
import Quiz from "../pages/User/Quiz/Quiz";
import Main from "../pages/User/Main/Main";
import AssignmentMain from "../pages/User/Assignment/AssignmentMain";
import Project from "../pages/User/Project/Project";
import TeamPage from "../pages/User/Team/TeamPage";
import EssayAssignmentSubmit from "../pages/User/Assignment/AssignmentSubmit/EssayAssignmentSubmit";
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
        <Route path="/assignment" element={<AssignmentMain />} />
        <Route
          path="/assignment/essay-assignment"
          element={<EssayAssignmentSubmit />}
        />
        <Route path="/project" element={<Project />} />
        <Route path="/team" element={<TeamPage />} />
      </Routes>

      {!isMobile && <Footer />}
    </div>
  );
};

export default User;
