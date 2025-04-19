import { Routes, Route, Outlet } from "react-router-dom";
import CCLecture from "../pages/User/CyberCampus/CCLecture";

export default function CyberCampus() {
  return (
    <Routes>
      <Route path="lecture" element={<CCLecture />} />
    </Routes>
  );
}
