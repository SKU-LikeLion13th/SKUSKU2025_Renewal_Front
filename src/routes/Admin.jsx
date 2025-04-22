import { Route, Routes } from "react-router-dom";
import AdminMain from "../pages/Admin/AdminMain";
import AdminReview from "../pages/Admin/Review/AdminReview";
import AdminQuiz from "../pages/Admin/Quiz/AdminQuiz";

const Admin = () => {
  return (
    <Routes>
      <Route path="/main" element={<AdminMain />} />
      <Route path="/adminReview" element={<AdminReview />} />
      <Route path="/adminQuiz" element={<AdminQuiz />} />
    </Routes>
  );
};

export default Admin;