import { useEffect, useState } from "react";
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
import CCHeader from "../components/CCHeader";
import CCHeaderMobile from "../components/CCHeaderMobile";

export default function CyberCampus() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 1270);
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  return (
    <div>
      {isMobile ? <CCHeaderMobile /> : <CCHeader />}
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
      {!isMobile && <CCFooter />}
    </div>
  );
}
