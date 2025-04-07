import { Route, Routes } from "react-router-dom";
import AdminReview from "../pages/Admin/Review/AdminReview";

const Admin = () => {
  return (
    <Routes>
      {/* <Route path="/" element={<AdminMain />} /> */}
      <Route path="/adminReview" element={<AdminReview />} />
    </Routes>
  );
};

export default Admin;
