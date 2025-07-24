import { Route, Routes } from "react-router-dom";
import AdminMain from "../pages/Admin/Intro/AdminRealMain";
import AdminReview from "../pages/Admin/Review/AdminReview";
import AdminReviewUpdate from "../pages/Admin/Review/AdminReviewUpdate";
import AdminQuiz from "../pages/Admin/Quiz/AdminQuiz";
import AssignmentManagement from "../pages/Admin/Assignment/AssignmentManagement";
import AddAssignment from "../pages/Admin/Assignment/AddAssignment";
import AdminCCLecture from "../pages/Admin/LectureManagement/AdminCCLecture";
import AdminCCLectureUpload from "../pages/Admin/LectureManagement/AdminCCLectureUpload";
import AdminCCLectureEdit from "../pages/Admin/LectureManagement/AdminCCLectureEdit";
import AdminProject from "../pages/Admin/Project/AdminProject";
import AddProject from "../pages/Admin/Project/AddProject";
import AssignmentCheck from "../pages/Admin/Assignment/AssignmentCheck";
import CheckLions from "../pages/Admin/Assignment/CheckLions";
import CheckDetails from "../pages/Admin/Assignment/CheckDetails";

const Admin = () => {
  return (
    <Routes>
      <Route path="/" element={<AdminMain />} />
      <Route path="/assignment/:track" element={<AssignmentManagement />} />
      <Route path="/assignment/add/:track" element={<AddAssignment />} />
      <Route path="/assignment/check/:track" element={<AssignmentCheck />} />
      <Route path="/assignment/check/:id/:track" element={<CheckLions />} />
      <Route
        path="/assignment/check/:id/:submitId/:track"
        element={<CheckDetails />}
      />
      <Route path="/reviewQuiz/:trackType" element={<AdminReview />} />
      <Route path="/adminQuiz/:trackType" element={<AdminQuiz />} />
      <Route
        path="/reviewUpdate/:trackType/:reviewWeekId"
        element={<AdminReviewUpdate />}
      />
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
