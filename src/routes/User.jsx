import { Route, Routes } from "react-router-dom";
import Review from "../pages/User/Review/Review";
import Quiz from "../pages/User/Quiz/Quiz";

const User = () => {
  return (
    <Routes>
      <Route path="review" element={<Review />} />
      <Route path="/quiz/:quizId" element={<Quiz />} />
    </Routes>
  );
};

export default User;
