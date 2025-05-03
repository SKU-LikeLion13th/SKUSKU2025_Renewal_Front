import { Routes, Route } from "react-router-dom";
import CCLecture from "../pages/User/CyberCampusLecture/CCLecture";
import LectureDetail from "../pages/User/CyberCampusLecture/LectureDetail";
import CyberCampusIntro from "../pages/User/CyberCampus/CyberCampusMain/CyberCampusIntro";

export default function CyberCampus() {
  return (
    <div>
      <Routes>
        <Route path="intro" element={<CyberCampusIntro />} />
        <Route path="lecture" element={<CCLecture />} />
        <Route path="lecture-detail/:id" element={<LectureDetail />} />
      </Routes>
    </div>
  );
}
