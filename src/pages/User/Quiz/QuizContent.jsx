import React, { useState } from "react";
import Images from "../../../utils/images";

export default function QuizContent({ quiz }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState({});

  if (!quiz || !quiz.questions || quiz.questions.length === 0) {
    return <div>퀴즈를 찾을 수 없습니다.</div>;
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];

  const handleAnswerChange = (questionId, answer) => {
    setSelectedAnswer((prev) => ({
      ...prev,
      [questionId]: answer,
    }));
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="flex w-full min-h-[590px] flex-col">
      {currentQuestion ? (
        <div className="flex flex-col p-3">
          <div className="font-semibold">
            Question {currentQuestion.questionId}.
          </div>

          <div className="flex mt-1 font-bold">{currentQuestion.content}</div>

          {currentQuestion.AnswerChoiceList?.length > 0 &&
          currentQuestion.quizType === "MULTIPLE_CHOICE" ? (
            <div className="flex items-start justify-between mt-2">
              <div className="flex flex-col mt-5">
                {currentQuestion.AnswerChoiceList.map((choice, index) => (
                  <label key={index} className="flex items-center mb-2">
                    <input
                      type="radio"
                      name={`question-${currentQuestion.questionId}`}
                      value={choice}
                      checked={selectedAnswer[currentQuestion.questionId] === choice}
                      onChange={() => handleAnswerChange(currentQuestion.questionId, choice)}
                      className="my-3 mr-2"
                    />
                    {choice}
                  </label>
                ))}
              </div>

              <div className="flex flex-col gap-2 mb-10">
                {Array.isArray(currentQuestion.file) &&
                  currentQuestion.file.map((fileName, index) => (
                    <img
                      key={index}
                      src={Images[fileName]}
                      alt={`question-${currentQuestion.questionId}-image-${index}`}
                      className="flex object-contain w-[100%] max-h-60"
                    />
                  ))}
              </div>
            </div>
          ) : (
            <div className="w-full min-h-[200px] text-[16px] my-6 bg-[#F4F4F4] p-4">
              <textarea
                placeholder="답안을 입력해주세요."
                className="w-full h-full p-4 overflow-hidden resize-none"
                rows="1"
                onInput={(e) => {
                  e.target.style.height = "auto";
                  e.target.style.height = `${e.target.scrollHeight}px`;
                }}
                onChange={(e) =>
                  handleAnswerChange(currentQuestion.questionId, e.target.value)
                }
              />
            </div>
          )}

          <div className="flex w-full">
            {currentQuestionIndex > 0 && (
              <button
                className="flex px-6 py-1.5 my-4 text-[13px] text-[#838383] bg-[#E9E9E9] rounded-[5.95px]"
                onClick={goToPrevQuestion}
              >
                이전
              </button>
            )}

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
