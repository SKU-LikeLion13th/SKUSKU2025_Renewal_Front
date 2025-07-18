import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewTitle from "../Review/ReviewTitle";
import ReviewLocation from "../Review/ReviewLocation";
import QuizTitle from "./QuizTitle";
import QuizContent from "./QuizContent";

export default function Quiz() {
  const { reviewWeekId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!reviewWeekId) return;

    setLoading(true);
    setError(null);

    axios
      .get(`/reviewQuiz/${reviewWeekId}`)
      .then((response) => {
        setQuiz({ questions: response.data });
      })
      .catch((err) => {
        setError("퀴즈 데이터 불러오기 실패");
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [reviewWeekId]);

  if (loading) return <div>퀴즈 불러오는 중...</div>;
  if (error) return <div>{error}</div>;

  console.log(quiz);

  return (
    <div className="flex min-h-screen mx-auto">
      <div className="flex flex-col justify-start w-9/12 mx-auto mt-12 lg:w-8/12">
        <ReviewTitle />

        <div className="flex justify-start w-full mt-14">
          <ReviewLocation />
        </div>

        {quiz && (
          <>
            <QuizTitle quiz={quiz} />
            <QuizContent quiz={quiz} />
          </>
        )}
      </div>
    </div>
  );
}
