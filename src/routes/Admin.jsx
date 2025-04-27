import { Route, Routes } from "react-router-dom";
import AdminMain from "../pages/Admin/AdminMain";
import AdminReview from "../pages/Admin/Review/AdminReview";
import AdminQuiz from "../pages/Admin/Quiz/AdminQuiz";
import AdminAssignmentMain from "../pages/Admin/Assignment/AdminAssignmentMain";
import AddAssignment from "../pages/Admin/Assignment/AddAssignment";

const Admin = () => {
  return (
    <Routes>
      <Route path="/main" element={<AdminMain />} />
      <Route path="/adminReview" element={<AdminReview />} />
      <Route path="/adminQuiz" element={<AdminQuiz />} />
      <Route path="/admin-assignment" element={<AdminAssignmentMain />} />
      <Route path="/add-assignment" element={<AddAssignment />} />
    </Routes>
  );
};

export default Admin;
