import { Route, Routes } from "react-router-dom";
import AdminMain from "../pages/Admin/AdminMain";
import AdminReview from "../pages/Admin/Review/AdminReview";
import AdminQuiz from "../pages/Admin/Quiz/AdminQuiz";
import AdminAssignmentMain from "../pages/Admin/Assignment/AdminAssignmentMain";
import AddAssignment from "../pages/Admin/Assignment/AddAssignment";
import AdminCCLecture from "../pages/Admin/LectureManagement/AdminCCLecture";
import AdminCCLectureUpload from "../pages/Admin/LectureManagement/AdminCCLectureUpload";
import AdminCCLectureEdit from "../pages/Admin/LectureManagement/AdminCCLectureEdit";
import AdminProject from "../pages/Admin/Project/AdminProject";
import AddProject from "../pages/Admin/Project/AddProject";

const Admin = () => {
  return (
    <Routes>
      <Route path="/main" element={<AdminMain />} />
      <Route path="/adminReview" element={<AdminReview />} />
      <Route path="/adminQuiz" element={<AdminQuiz />} />
      <Route path="/assignment/:track" element={<AdminAssignmentMain />} />
      <Route path="/assignment/add" element={<AddAssignment />} />
      <Route path="/LectureManagement/:track" element={<AdminCCLecture />} />
      <Route
        path="/LectureManagement/:track/LectureUpload"
        element={<AdminCCLectureUpload />}
      />
      <Route
        path="/LectureManagement/:track/LectureEdit/:lectureId"
        element={<AdminCCLectureEdit />}
      />
      <Route path="/project" element={<AdminProject />} />
      <Route path="/project/add" element={<AddProject />} />
    </Routes>
  );
};

export default Admin;
