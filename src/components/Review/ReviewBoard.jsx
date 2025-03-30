import React from "react";

const ReviewBoard = ({ quizzes }) => {
  const headers = ["번호", "제목", "제출여부", "나의점수"];
  const flexValues = ["1", "6", "2", "2"];

  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex w-full border-t-[2.5px] border-t-[#232323] border-b border-b-[#9A9A9A] bg-[#F7F7F7] p-2">
        {headers.map((header, index) => (
          <div
            key={index}
            className="flex fontBold justify-center px-1"
            style={{ flex: flexValues[index] }}
          >
            {header}
          </div>
        ))}
      </div>

      <div className="flex w-full min-h-[590px] flex-col">
        {quizzes.map((quiz) => (
          <div key={quiz.Id} className="flex w-full border-b border-b-[#E0E0E0] p-2">
            <div className="flex justify-center px-1 text-[13.5px]" style={{ flex: flexValues[0] }}>
              {quiz.Id}
            </div>
            <div className="flex justify-start px-1 text-[13.5px]" style={{ flex: flexValues[1] }}>
              {quiz.title}
            </div>
            <div className={`flex justify-center px-1 text-[13.5px] ${quiz.IsSubmit === "제출" ? "text-[#3B79FF] font-bold" : ""}`} style={{ flex: flexValues[2] }}>
              {quiz.IsSubmit}
            </div>
            <div className="flex justify-center px-1 text-[13.5px]" style={{ flex: flexValues[3] }}>
              {quiz.score} / {quiz.total}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewBoard;
