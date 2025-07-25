import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "../../../utils/axios";
import ReviewTitle from "../Review/ReviewTitle";
import ReviewLocation from "../Review/ReviewLocation";
import QuizTitle from "./QuizTitle";
import QuizContent from "./QuizContent";
import Breadcrumb from "../../../components/Breadcrumb";

export default function Quiz() {
  const { reviewWeekId } = useParams();
  const location = useLocation();
  const { trackType } = location.state || {};

  const titleFromState = location.state?.title || "제목 정보가 없습니다";

  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // 현재 문제 인덱스 상태를 Quiz 컴포넌트가 관리
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await axios.get(`/reviewQuiz/${reviewWeekId}`);
        const quizData = response.data;
        setQuiz({ questions: quizData });
      } catch (err) {
        console.log(err);
        setError("퀴즈 데이터를 불러오는 중 오류가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    };

    if (reviewWeekId) {
      fetchQuiz();
    }
  }, [reviewWeekId]);

  if (loading) return <div>퀴즈 불러오는 중...</div>;
  if (error) return <div>{error}</div>;
  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <div>퀴즈 데이터를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="flex min-h-screen mx-auto">
      <div className="flex flex-col justify-start w-9/12 mx-auto sm:mt-50 mt-30 lg:w-8/12">

        <ReviewTitle />

        <div className="flex justify-start w-full sm:mt-10 mt-8 pb-3">
          <Breadcrumb />
        </div>

        {/* 진행바 있는 QuizTitle에 currentQuestionIndex 전달 */}
        <QuizTitle quiz={quiz} title={titleFromState} currentQuestionIndex={currentQuestionIndex} />

        {/* QuizContent에 currentQuestionIndex 상태와 setter 전달 */}
        <QuizContent 
          quiz={quiz} 
          reviewWeekId={reviewWeekId}
          currentQuestionIndex={currentQuestionIndex}
          setCurrentQuestionIndex={setCurrentQuestionIndex}
          trackType={trackType}
        />
      </div>
    </div>
  );
}
