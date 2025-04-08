import { Route, Routes } from "react-router-dom";
import AdminReview from "../pages/Admin/Review/AdminReview";
import AdminQuiz from "../pages/Admin/Quiz/AdminQuiz";

const Admin = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<AdminMain />} /> */}
      <Route path="/adminReview" element={<AdminReview />} />
      <Route path="/adminQuiz" element={<AdminQuiz />} />
    </Routes>
  );
};

export default Admin;
