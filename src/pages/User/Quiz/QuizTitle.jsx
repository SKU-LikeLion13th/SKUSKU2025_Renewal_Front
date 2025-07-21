import React from "react";

export default function QuizTitle({ quiz, title, currentQuestionIndex }) {
  const totalQuestions = quiz.questions.length;
  const currentQuestionNumber = currentQuestionIndex + 1;
  
  return (
    <div>
      <div className="text-[20px] fontSB mt-9">{title}</div>

      {/* 문제 수 표시 바 */}
      <div className="w-full mx-auto mt-7">
        <div className="flex justify-between w-full gap-1 mb-2">
          {Array.from({ length: totalQuestions }).map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded flex-1 transition-colors duration-300 ${
                index < currentQuestionNumber ? "bg-[#3B79FF]" : "bg-[#D9D9D9]"
              }`}
            />
          ))}
        </div>
        <div className="text-sm text-[#232323]">
          {currentQuestionNumber} / {totalQuestions}
        </div>
      </div>
    </div>
  );
}
