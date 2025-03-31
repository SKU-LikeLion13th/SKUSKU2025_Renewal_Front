import { Route, Routes } from "react-router-dom";
import Review from "../pages/User/Review/Review";
import Main from "../pages/User/Main/Main";

const User = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="review" element={<Review />} />
    </Routes>
  );
};

export default User;
