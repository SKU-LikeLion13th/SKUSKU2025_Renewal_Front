import { Routes, Route } from "react-router-dom";
import AdminMain from "../pages/Admin/AdminMain";

export default function Admin() {
  return (
    <div>
      <Routes>
        <Route path="/main" element={<AdminMain />} />
      </Routes>
    </div>
  );
}
