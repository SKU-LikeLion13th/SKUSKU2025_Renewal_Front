import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuizData from "../../../utils/QuizData.json";
import ReviewTitle from "../../../components/Review/ReviewTitle";
import ReviewLocation from "../Review/ReviewLocation";
import QuizTitle from "../../../components/Quiz/QuizTitle";

export default function Quiz() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    // quizId가 숫자 형식으로 되어야 하므로, 이를 변환하여 해당 퀴즈 찾기
    const quizIdNumber = parseInt(quizId, 10);
    const foundQuiz = QuizData.find((quiz) => quiz.Id === quizIdNumber);
    setQuiz(foundQuiz);
  }, [quizId]);

  if (!quiz) {
    return <div>퀴즈 데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex mx-auto min-h-screen">
      <div className="flex flex-col w-9/12 mt-30 mx-auto justify-start lg:w-8/12">
        <ReviewTitle />
        <div className="flex w-full mt-14 justify-start">
          <ReviewLocation />
        </div>
        {/* QuizTitle에 quiz 전달 */}
        <QuizTitle quiz={quiz} />
      </div>
    </div>
  );
}
