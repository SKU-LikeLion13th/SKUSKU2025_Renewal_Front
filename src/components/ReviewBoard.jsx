import React, { useState } from "react";

const ReviewBoard = () => {
  const headers = ["번호", "제목", "제출여부", "나의점수"];
  const flexValues = ["1", "6", "2", "2"];

  // 더미 데이터
  const [quizzes] = useState([
    { Id: 1, title: "1주차 복습퀴즈", IsSubmit: "제출", score: 3, total: 5 },
    { Id: 2, title: "2주차 복습퀴즈", IsSubmit: "미제출", score: 0, total: 6 },
    { Id: 3, title: "3주차 복습퀴즈", IsSubmit: "미제출", score: 0, total: 7 },
    { Id: 4, title: "4주차 복습퀴즈", IsSubmit: "제출", score: 5, total: 8 },
  ]);

  return (
    <div className="flex flex-col items-center w-full">
      {/* 헤더 */}
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

      {/* 데이터 렌더링 */}
      {quizzes.map((quiz) => (
        <div
          key={quiz.Id}
          className="flex w-full border-b border-b-[#E0E0E0] p-2"
        >
          <div className="flex justify-center px-1 text-[13.5px]" style={{ flex: flexValues[0] }}>
            {quiz.Id}
          </div>
          <div className="flex justify-start px-1 text-[13.5px]" style={{ flex: flexValues[1] }}>
            {quiz.title}
          </div>
          <div
            className={`flex justify-center px-1 text-[13.5px] ${
              quiz.IsSubmit === "제출" ? "text-[#3B79FF] font-bold" : ""
            }`}
            style={{ flex: flexValues[2] }}
          >
            {quiz.IsSubmit}
          </div>
          <div className="flex justify-center px-1 text-[13.5px]" style={{ flex: flexValues[3] }}>
            {quiz.score} / {quiz.total}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewBoard;
