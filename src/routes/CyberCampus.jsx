import { Routes, Route } from "react-router-dom";
// import CCLecture from "../pages/User/CyberCampusLecture/CCLecture";
import CCLecture from "../pages/User/CyberCampusLecture/CCLecture";
import LectureDetail from "../pages/User/CyberCampusLecture/LectureDetail";
import CyberCampusIntro from "../pages/User/CyberCampus/CyberCampusMain/CyberCampusIntro";
import Review from "../pages/User/Review/Review";
import Quiz from "../pages/User/Quiz/Quiz";
import AssignmentMain from "../pages/User/Assignment/AssignmentMain";
import AssignmentSubmitPage from "../pages/User/Assignment/AssignmentSubmit/AssignmentSubmitPage";
import CCFooter from "../components/CCFooter";

export default function CyberCampus() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<CyberCampusIntro />} />
        <Route path="lecture/:track" element={<CCLecture />} />
        <Route path="lecture-detail/:id" element={<LectureDetail />} />
        <Route path="/review/:trackType" element={<Review />} />
        <Route path="/quiz/:reviewWeekId" element={<Quiz />} />
        <Route path="/assignment/:track" element={<AssignmentMain />} />
        <Route
          path="/assignment/:assignmentId/:track"
          element={<AssignmentSubmitPage />}
        />
      </Routes>
      <CCFooter />
    </div>
  );
}
