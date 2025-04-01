import React from "react";

export default function QuizTitle({ quiz }) {
  return (
    <div>
      <div className="text-[20px] fontSB mt-10">{quiz.title}</div>

      {/* 문제수 바 */}
      <div>
        <div className="w-full mx-auto mt-8">
          <div className="flex justify-between w-full gap-1 mb-2">
            {Array.from({ length: quiz.total }).map((_, index) => (
              <div 
                key={index} 
                className={`h-2 rounded flex-1 transition-colors duration-300 ${
                  index < quiz.questions.questionId ? 'bg-[#D9D9D9]' : 'bg-[#D9D9D9]'
                }`}
              />
            ))}
          </div>
          <div className="text-sm text-[#232323]">
            {quiz.questions.questionId}/{quiz.total}
          </div>
        </div>
      </div>
    </div>
  );
}