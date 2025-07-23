import { Route, Routes } from "react-router-dom";
import Review from "../pages/User/Review/Review";
import Quiz from "../pages/User/Quiz/Quiz";
import Main from "../pages/User/Main/Main";
import Project from "../pages/User/Project/Project";
import TeamPage from "../pages/User/Team/TeamPage";

const User = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />

      <Route path="/project" element={<Project />} />
      <Route path="/team" element={<TeamPage />} />
    </Routes>
  );
};

export default User;
