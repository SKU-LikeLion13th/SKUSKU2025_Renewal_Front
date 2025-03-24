import { Route, Routes } from "react-router-dom";
import Review from "../pages/User/Review/Review";

const User = () => {
  return (
    <Routes>
      <Route path="review" element={<Review />} />
    </Routes>
  );
};

export default User;
