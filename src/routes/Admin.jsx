import { Route, Routes } from "react-router-dom";
import AdminMain from "../pages/Admin/Intro/AdminRealMain";
import AdminReview from "../pages/Admin/Review/AdminReview";
import AdminReviewUpdate from "../pages/Admin/Review/AdminReviewUpdate";
import AdminQuiz from "../pages/Admin/Quiz/AdminQuiz";
import AdminAssignmentMain from "../pages/Admin/Assignment/AdminAssignmentMain";
import AddAssignment from "../pages/Admin/Assignment/AddAssignment";
import AdminCCLecture from "../pages/Admin/LectureManagement/AdminCCLecture";
import AdminCCLectureUpload from "../pages/Admin/LectureManagement/AdminCCLectureUpload";
import AdminCCLectureEdit from "../pages/Admin/LectureManagement/AdminCCLectureEdit";

const Admin = () => {
  return (
    <Routes>
      <Route path="/main" element={<AdminMain />} />
      <Route path="/reviewQuiz/:trackType" element={<AdminReview />} />
      <Route path="/adminQuiz/:trackType" element={<AdminQuiz />} />
      <Route path="/reviewUpdate/:trackType/:reviewWeekId" element={<AdminReviewUpdate />} />
      <Route path="/admin-assignment" element={<AdminAssignmentMain />} />
      <Route path="/add-assignment" element={<AddAssignment />} />
      <Route path="/LectureManagement/:track" element={<AdminCCLecture />} />
      <Route
        path="/LectureManagement/:track/LectureUpload"
        element={<AdminCCLectureUpload />}
      />
      <Route
        path="/LectureManagement/:track/LectureEdit/:lectureId"
        element={<AdminCCLectureEdit />}
      />
    </Routes>
  );
};

export default Admin;
