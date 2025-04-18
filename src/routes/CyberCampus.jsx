import { Routes, Route, Outlet } from "react-router-dom";
import CyberCampusLecture from "../pages/User/CyberCampus/CyberCampusLecture";

export default function CyberCampus() {
  return (
    <Routes>
      <Route path="lecture" element={<CyberCampusLecture />} />
    </Routes>
  );
}
