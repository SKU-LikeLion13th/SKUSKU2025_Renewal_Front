import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import quizData from "../../../utils/QuizData.json";
import Images from "../../../utils/images";

export default function QuizContent() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  useEffect(() => {
    console.log("URL id:", quizId, typeof quizId);
    const selectedQuiz = quizData.find(q => q.Id === Number(quizId));
    console.log("선택된 퀴즈 데이터:", selectedQuiz);
    setQuiz(selectedQuiz || null);
  }, [quizId]);

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswer((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const goToNextQuestion = () => {
    setCurrentQuestionIndex((prev) => prev + 1);
  };
  
  const goToPrevQuestion = () => {
    setCurrentQuestionIndex((prev) => prev - 1);
  };

  const handleDivClick = (e) => {
    e.target.querySelector("input")?.focus();
  };

  if (!quiz) {
    return <div>퀴즈를 찾을 수 없습니다.</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  return (
    <div className="flex w-full min-h-[590px] flex-col">
      {currentQuestion ? (
        <div className="flex flex-col p-3">
          <div className="font-semibold">
            Question {currentQuestion.questionId}.
          </div>

          <div className="flex mt-1 font-bold">{currentQuestion.content}</div>

          {currentQuestion.AnswerChoiceList.length > 0 && currentQuestion.quizType === "MULTIPLE_CHOICE" ? (
            <div className="flex items-start justify-between mt-2">
              {/* 선택지 (왼쪽) */}
              <div className="flex flex-col mt-5">
                {currentQuestion.AnswerChoiceList.map((choice, index) => (
                  <label key={index} className="flex items-center mb-2">
                    <input
                      type="radio"
                      name={`question-${currentQuestion.questionId}`}
                      value={choice}
                      checked={selectedAnswer?.[currentQuestion.questionId] === choice}
                      onChange={() => handleAnswerChange(currentQuestion.questionId, choice)}
                      className="my-3 mr-2"
                    />
                    {choice}
                  </label>
                ))}
              </div>

              {/* 이미지 (오른쪽) */}
              <div className="flex flex-col gap-2 mb-10">
                {Array.isArray(currentQuestion.file) && (
                  currentQuestion.file.map((fileName, index) => (
                    <img
                      key={index}
                      src={Images[fileName]}
                      alt={`question-${currentQuestion.questionId}-image-${index}`}
                      className="flex object-contain w-[100%] max-h-60"
                    />
                  ))
                )}
              </div>
            </div>
          ) : (
            <div className="w-full min-h-[200px] text-[16px] my-6 bg-[#F4F4F4] p-4" onClick={handleDivClick}>
              <textarea
                placeholder="답안을 입력해주세요."
                className="w-full h-full p-4 overflow-hidden resize-none"
                rows="1"
                onInput={(e) => {
                  e.target.style.height = "auto"; // 높이를 초기화
                  e.target.style.height = `${e.target.scrollHeight}px`; // 입력된 내용에 맞게 높이 조절
                }}
              />
            </div>
          )}

          <div className="flex w-full">
            {/* 이전 버튼: 첫 번째 문제일 때는 안 보이도록 설정 */}
            {currentQuestionIndex > 0 && (
              <button
                className="flex px-6 py-1.5 my-4 text-[13px] text-[#838383] bg-[#E9E9E9] rounded-[5.95px]"
                onClick={goToPrevQuestion}
              >
                이전
              </button>
            )}

            {/* "다음" 버튼은 오른쪽 끝에 위치 */}
            <button
              className="flex px-6 py-1.5 my-4 text-[13px] text-white bg-[#4881FF] rounded-[5.95px] ml-auto"
              onClick={goToNextQuestion}
              disabled={currentQuestionIndex >= quiz.questions.length - 1}
            >
              다음
            </button>
          </div>
        </div>
      ) : (
        <p>모든 질문을 완료했습니다.</p>
      )}
    </div>
  );
}
