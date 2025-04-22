import { Routes, Route } from "react-router-dom";
import CCLecture from "../pages/User/CyberCampus/CCLecture";
import LectureDetail from "../pages/User/CyberCampus/LectureDetail";

export default function CyberCampus() {
  return (
    <div>
      <Routes>
        <Route path="/lecture" element={<CCLecture />} />
        <Route path="/lecture-detail/:id" element={<LectureDetail />} />
      </Routes>
    </div>
  );
}
