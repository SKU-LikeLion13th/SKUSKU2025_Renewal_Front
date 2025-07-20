import { Route, Routes } from "react-router-dom";
import Review from "../pages/User/Review/Review";
import Quiz from "../pages/User/Quiz/Quiz";
import Main from "../pages/User/Main/Main";
import AssignmentMain from "../pages/User/Assignment/AssignmentMain";
import Project from "../pages/User/Project/Project";
import TeamPage from "../pages/User/Team/TeamPage";
import EssayAssignmentSubmit from "../pages/User/Assignment/AssignmentSubmit/EssayAssignmentSubmit";

const User = () => {
  return (
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
  );
};

export default User;
