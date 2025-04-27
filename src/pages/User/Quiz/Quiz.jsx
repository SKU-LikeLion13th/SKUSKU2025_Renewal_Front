import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import QuizData from "../../../utils/QuizData.json";
import ReviewTitle from "../Review/ReviewTitle";
import ReviewLocation from "../Review/ReviewLocation";
import QuizTitle from "./QuizTitle";
import QuizContent from "./QuizContent";

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
    <div className="flex min-h-screen mx-auto">
      <div className="flex flex-col justify-start w-9/12 mx-auto mt-50 lg:w-8/12">
        <ReviewTitle />

        <div className="flex justify-start w-full mt-14">
          <ReviewLocation />
        </div>

        {/* QuizTitle */}
        <QuizTitle quiz={quiz} />

        {/* 퀴즈 문제 */}
        <QuizContent quiz={quiz} />
      </div>
    </div>
  );
}
