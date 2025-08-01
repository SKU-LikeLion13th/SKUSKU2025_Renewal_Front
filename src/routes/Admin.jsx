import { Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminMain from "../pages/Admin/Intro/AdminRealMain";
import AdminReview from "../pages/Admin/Review/AdminReview";
import AdminReviewUpdate from "../pages/Admin/Review/AdminReviewUpdate";
import AdminQuiz from "../pages/Admin/Quiz/AdminQuiz";
import AdminReviewCheck from "../pages/Admin/AdminReviewCheck/AdminReviewCheck";
import AdminReviewCheckContent from "../pages/Admin/AdminReviewCheck/AdminReviewCheckContent";
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
import CCFooter from "../components/CCFooter";
import CCHeader from "../components/CCHeader";
import CCHeaderMobile from "../components/CCHeaderMobile";
import Footer from "../components/Footer";
import AdminRouteGuard from "../components/AdminRouteGuard";

const Admin = () => {
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 1270);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const showAdminFooterPaths = ["/admin/project", "/admin/project/add"];
  const showAdminFooter = showAdminFooterPaths.includes(location.pathname);

  return (
    <AdminRouteGuard>
      <div>
        {isMobile ? <CCHeaderMobile /> : <CCHeader />}
        <Routes>
          <Route path="/" element={<AdminMain />} />
          <Route path="/assignment/:track" element={<AssignmentManagement />} />
          <Route path="/assignment/:track/add" element={<AddAssignment />} />
          <Route path="/assignmentCheck/:track" element={<AssignmentCheck />} />
          <Route
            path="/assignmentCheck/:track/babylions/:id"
            element={<CheckLions />}
          />
          <Route
            path="/assignmentCheck/:track/babylions/:id/:submitId"
            element={<CheckDetails />}
          />

          <Route path="/reviewQuiz/:trackType" element={<AdminReview />} />
          <Route
            path="/reviewQuiz/:trackType/reviewAdd"
            element={<AdminQuiz />}
          />
          <Route
            path="/reviewQuiz/:trackType/reviewCheck/:reviewWeekId"
            element={<AdminReviewCheck />}
          />
          <Route
            path="/reviewQuiz/:trackType/reviewUpdate/:reviewWeekId"
            element={<AdminReviewUpdate />}
          />
          <Route
            path="/LectureManagement/:track"
            element={<AdminCCLecture />}
          />
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
        {!isMobile && (showAdminFooter ? <Footer /> : <CCFooter />)}
      </div>
    </AdminRouteGuard>
  );
};

export default Admin;
